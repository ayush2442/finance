package com.finance.app;

import org.springframework.boot.SpringApplication;
import org.testcontainers.utility.TestcontainersConfiguration;

public class TestFinanceApplication {

	public static void main(String[] args) {
		SpringApplication.from(FinanceApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
