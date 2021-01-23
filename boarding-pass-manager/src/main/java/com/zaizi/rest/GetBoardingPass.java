package com.zaizi.rest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.flowable.engine.HistoryService;
import org.flowable.engine.RuntimeService;
import org.flowable.engine.TaskService;
import org.flowable.task.api.Task;
import org.flowable.variable.api.history.HistoricVariableInstance;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GetBoardingPass {

	private Logger logger = LoggerFactory.getLogger(GetBoardingPass.class);

	@Autowired
	private RuntimeService runtimeService;

	@Autowired
	private HistoryService historyService;

	@Autowired
	private TaskService taskService;

	@GetMapping(path = "/api/v1/getBoardingPass", produces = "application/json")
	public String getBoardingPassV1() {

		Map<String, Object> variables = new HashMap<String, Object>();

		String processInstanceId = runtimeService.startProcessInstanceByKey("get-boardingPass-v1", variables)
				.getProcessInstanceId();

		return getMessage(processInstanceId);

	}

	@GetMapping(path = "/api/v2/getBoardingPass", produces = "application/json")
	public String getBoardingPassV2() {

		Map<String, Object> variables = new HashMap<String, Object>();
		String msg = "{}";

		String processInstanceId = runtimeService.startProcessInstanceByKey("get-boardingPass-v2", variables)
				.getProcessInstanceId();

		Task task = taskService.createTaskQuery().processInstanceId(processInstanceId).singleResult();

		if (task != null && task.getName().equals("Resolve failure")) {
			msg = "{\"status\":\"Error\", \"url\": \"There was an issue retrieving your boarding pass. You can try later.\"}";
		} else {
			msg = getMessage(processInstanceId);
		}

		return msg;

	}

	private String getMessage(String processInstanceId) {
		List<HistoricVariableInstance> vars = historyService.createHistoricVariableInstanceQuery()
				.processInstanceId(processInstanceId).list();

		logger.debug("Response: {}", vars.get(0).getValue().toString());

		return vars.get(0).getValue().toString();
	}
}
