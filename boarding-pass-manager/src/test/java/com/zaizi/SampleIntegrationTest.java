package com.zaizi;

import static org.junit.Assert.assertEquals;

import java.util.HashMap;
import java.util.Map;

import org.flowable.engine.RuntimeService;
import org.flowable.engine.TaskService;
import org.flowable.engine.test.Deployment;
import org.flowable.spring.impl.test.FlowableSpringExtension;
import org.flowable.task.api.Task;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@ExtendWith(FlowableSpringExtension.class)
@SpringBootTest
public class SampleIntegrationTest {
    
	@Autowired
    private RuntimeService runtimeService;
    
	@Autowired
    private TaskService taskService;
    
	@Test
    @Deployment(resources = { "processes/Sample_Process_2.bpmn20.xml" })
    void resolveFailureCancelTest() {
        
    	Map<String, Object> variables = new HashMap<String, Object>();
        
        String processInstanceId = runtimeService.startProcessInstanceByKey("sample-process-2", variables).getProcessInstanceId();
        
        Task task = taskService.createTaskQuery().processInstanceId(processInstanceId).singleResult();
        
        assertEquals("Resolve failure", task.getName());

        variables.put("next_action", "cancel");
  
        taskService.complete(task.getId(), variables);
      
        assertEquals(0, runtimeService.createProcessInstanceQuery().processInstanceId(processInstanceId).count());
    }
	
	@Test
    @Deployment(resources = { "processes/Sample_Process_2.bpmn20.xml" })
    void resolveFailureResumeTest() {
        
    	Map<String, Object> variables = new HashMap<String, Object>();
        
        String processInstanceId = runtimeService.startProcessInstanceByKey("sample-process-2", variables).getProcessInstanceId();
        
        Task task = taskService.createTaskQuery().processInstanceId(processInstanceId).singleResult();
        
        assertEquals("Resolve failure", task.getName());

        variables.put("next_action", "resume");
  
        taskService.complete(task.getId(), variables);
        
        task = taskService.createTaskQuery().processInstanceId(processInstanceId).singleResult();
        
        assertEquals("Check result", task.getName());
        
        taskService.complete(task.getId(), null);
      
        assertEquals(0, runtimeService.createProcessInstanceQuery().processInstanceId(processInstanceId).count());
    }
}
