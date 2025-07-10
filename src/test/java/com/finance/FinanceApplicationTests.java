package com.finance;

import com.finance.app.FinanceApplication;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;

@Import(TestcontainersConfiguration.class)
@SpringBootTest(classes = FinanceApplication.class)
class FinanceApplicationTests {

	@Test
	void contextLoads() {
	}

}
