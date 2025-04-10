package com.betsy.reasonstohire.controller;

import com.betsy.reasonstohire.model.Reason;
import com.betsy.reasonstohire.model.ReasonType;
import com.betsy.reasonstohire.service.ReasonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reasons")
public class ReasonController {

    @Autowired
    private ReasonService  reasonService;

    @GetMapping("/random")
    public Reason getRandomReason() {
        return reasonService.getRandomReason();
    }

    @GetMapping
    public List<Reason> getAllReasons() {
        return reasonService.getAllReasons();
    }

    // POST: Add a new reason
    @PostMapping
    public ResponseEntity<Reason> addReason(@RequestBody Reason reason) {
        return ResponseEntity.ok(reasonService.saveReason(reason));
    }

    // GET: Fetch all approved reasons
    @GetMapping
    public ResponseEntity<List<Reason>> getApprovedReasons() {
        return ResponseEntity.ok(reasonService.getApprovedReasons());
    }

    @GetMapping("/filter")
    public List<Reason> getReasonsByType(@RequestParam ReasonType type) {
        return reasonService.getReasonsByType(type);
    }
}
