package com.betsy.reasonstohire.service;

import com.betsy.reasonstohire.model.Reason;
import com.betsy.reasonstohire.model.ReasonType;
import com.betsy.reasonstohire.repository.ReasonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class ReasonService {
    @Autowired
    private ReasonRepository reasonRepository;

    public List<Reason> getAllReasons() {
        return reasonRepository.findAll();
    }

    public Reason getRandomReason() {
        List<Reason> all = reasonRepository.findAll();
        return all.get(new Random().nextInt(all.size()));
    }

    public Reason saveReason(Reason reason) {
        return reasonRepository.save(reason);
    }

    public List<Reason> getApprovedReasons() {
        return reasonRepository.findByApprovedTrue();
    }

    public List<Reason> getReasonsByType(ReasonType type) {
        return reasonRepository.findByTypeAndApprovedTrue(type);
    }
}
