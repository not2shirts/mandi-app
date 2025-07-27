package com.rdbac.rdbac;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RdbacApplication {

	public static void main(String[] args) {
		 System.out.println("MONGO_URI: " + System.getenv("SPRING_DATA_MONGODB_URI"));
		SpringApplication.run(RdbacApplication.class, args);
	}

}
