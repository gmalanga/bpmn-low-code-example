const { RESTDataSource } = require('apollo-datasource-rest');

class FlowableAPI extends RESTDataSource {
    constructor() {
      super();
      this.baseURL = 'http://localhost:9999/';
    }

    processDefinitionReducer(processDefinition) {
        return { 
            id: processDefinition.id,
            url: processDefinition.url,
            key: processDefinition.key,
            version: processDefinition.version,
            name: processDefinition.name,
        };
    }

    processInstanceReducer(processInstance) {
        return {
            id: processInstance.id,
            url: processInstance.url,
            startTime: processInstance.startTime
        }
    }

    boardingPassReducer(boardingPass) {
        return {
            status: boardingPass.status,
            message: boardingPass.url
        }
    }

    async getProcessDefinitions() {
        const response = await this.get('process-api/repository/process-definitions');

        // transform the raw launches to a more friendly
        return Array.isArray(response.data)? response.data.map(processDefinition => this.processDefinitionReducer(processDefinition)) : [];
    }

    async startProcess({ processDefinitionId }) {
        const input = {"processDefinitionId": "" + processDefinitionId +""};
        const response = await this.post('process-api/runtime/process-instances', JSON.stringify(input),
        {
            headers: {
            'Content-Type': 'application/json',
            },
        });
        console.log(response);
        return this.processInstanceReducer(response);
    }

    async getBoardingPass() {
        const response = await this.get('api/v2/getBoardingPass');
        console.log(response);
        // transform the raw launches to a more friendly
        return this.boardingPassReducer(response);
    }

}

module.exports = FlowableAPI;