package com.betsy.reasonstohire.controller;

import com.betsy.reasonstohire.model.Reason;
import com.betsy.reasonstohire.service.ReasonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
