package com.finance.app.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
public class HealthController {

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("timestamp", LocalDateTime.now());
        response.put("application", "Finance Application");
        response.put("version", "1.0.0");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/api/finance/status")
    public ResponseEntity<Map<String, Object>> financeStat() {
        Map<String, Object> response = new HashMap<>();
        response.put("service", "Finance Service");
        response.put("status", "Running");
        response.put("environment", "Testing");
        response.put("timestamp", LocalDateTime.now());
        return ResponseEntity.ok(response);
    }
}
