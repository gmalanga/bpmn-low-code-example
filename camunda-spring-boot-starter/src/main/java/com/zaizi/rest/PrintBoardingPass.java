package com.zaizi.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PrintBoardingPass {

	@GetMapping(path = "/api/v1/printBoardingPass", produces = "application/json")
	public String greetingsFromCamunda() {
		
		String url = "https://pointmetotheplane.boardingarea.com/wp-content/uploads/2020/08/Send-Your-Name-to-MARS-NASA-Boarding-Pass-1024x394.jpg";

		return "{\"status\":\"completed\", \"url\": \""+ url + "\"}";

	}
}
