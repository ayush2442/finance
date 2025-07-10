// Integration test script for finance application
const axios = require('axios');

class FinanceAppTester {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.testResults = [];
    }

    async runHealthCheck() {
        try {
            console.log('Running health check...');
            const response = await axios.get(`${this.baseUrl}/health`);

            if (response.status === 200 && response.data.status === 'UP') {
                console.log('✅ Health check passed');
                this.testResults.push({ test: 'health', status: 'PASS' });
                return true;
            } else {
                console.log('❌ Health check failed');
                this.testResults.push({ test: 'health', status: 'FAIL' });
                return false;
            }
        } catch (error) {
            console.log('❌ Health check failed with error:', error.message);
            this.testResults.push({ test: 'health', status: 'FAIL', error: error.message });
            return false;
        }
    }

    async runApiTests() {
        try {
            console.log('Running API tests...');
            const response = await axios.get(`${this.baseUrl}/api/finance/status`);

            if (response.status === 200 && response.data.service === 'Finance Service') {
                console.log('✅ API test passed');
                this.testResults.push({ test: 'api', status: 'PASS' });
                return true;
            } else {
                console.log('❌ API test failed');
                this.testResults.push({ test: 'api', status: 'FAIL' });
                return false;
            }
        } catch (error) {
            console.log('❌ API test failed with error:', error.message);
            this.testResults.push({ test: 'api', status: 'FAIL', error: error.message });
            return false;
        }
    }

    async runLoadTest() {
        console.log('Running load test...');
        const promises = [];

        for (let i = 0; i < 10; i++) {
            promises.push(axios.get(`${this.baseUrl}/health`));
        }

        try {
            const responses = await Promise.all(promises);
            const successCount = responses.filter(r => r.status === 200).length;

            if (successCount === 10) {
                console.log('✅ Load test passed');
                this.testResults.push({ test: 'load', status: 'PASS' });
                return true;
            } else {
                console.log('❌ Load test failed');
                this.testResults.push({ test: 'load', status: 'FAIL' });
                return false;
            }
        } catch (error) {
            console.log('❌ Load test failed with error:', error.message);
            this.testResults.push({ test: 'load', status: 'FAIL', error: error.message });
            return false;
        }
    }

    async runAllTests() {
        console.log('Starting automated tests...');

        const healthResult = await this.runHealthCheck();
        if (!healthResult) {
            console.log('Stopping tests due to health check failure');
            return false;
        }

        await this.runApiTests();
        await this.runLoadTest();

        console.log('\n=== Test Results ===');
        this.testResults.forEach(result => {
            console.log(`${result.test}: ${result.status}`);
        });

        const failedTests = this.testResults.filter(r => r.status === 'FAIL');
        return failedTests.length === 0;
    }
}

// Usage
const baseUrl = process.env.APP_URL || 'http://localhost:8080';
const tester = new FinanceAppTester(baseUrl);

tester.runAllTests().then(success => {
    if (success) {
        console.log('\n🎉 All tests passed!');
        process.exit(0);
    } else {
        console.log('\n💥 Some tests failed!');
        process.exit(1);
    }
}).catch(error => {
    console.error('Test execution failed:', error);
    process.exit(1);
});