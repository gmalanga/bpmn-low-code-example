const { RESTDataSource } = require('apollo-datasource-rest');

class FlowableAPI extends RESTDataSource {
    constructor() {
      super();
      this.baseURL = 'http://localhost:9999/process-api/';
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

    async getProcessDefinitions() {
        const response = await this.get('repository/process-definitions');

        // transform the raw launches to a more friendly
        return Array.isArray(response.data)? response.data.map(processDefinition => this.processDefinitionReducer(processDefinition)) : [];
    }

    async startProcess({ processDefinitionId }) {
        const input = {"processDefinitionId": "" + processDefinitionId +""};
        const response = await this.post('/runtime/process-instances', JSON.stringify(input),
        {
            headers: {
            'Content-Type': 'application/json',
            },
        });

        return this.processInstanceReducer(response);
    }
}

module.exports = FlowableAPI;