package org.labmaster.laboratoire;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients
@SpringBootApplication
public class LaboratoireApplication {

	public static void main(String[] args) {

		SpringApplication.run(LaboratoireApplication.class, args);
	}

}
