package com.zaizi.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GetBoardingPass {

	@GetMapping(path = "/api/getBoardingPass", produces = "application/json")
	public String getBoardingPass() {

		return "{\"status\":\"completed\", \"message\": \"Hello from Flowable\"}";

	}
}
