package com.zaizi.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SimpleRestController {

	@GetMapping(path = "/api/sayHello")
	public String sayHello() {

		return "Hello world from Flowable!";

	}

}
