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
        List<Reason> reasons = reasonRepository.findByApprovedTrue();
    
        if (reasons.isEmpty()) {
            throw new IllegalStateException("No approved reasons found in the database.");
        }
    
        Random random = new Random();
        int index = random.nextInt(reasons.size());
        return reasons.get(index);
    }
    

    public Reason saveReason(Reason reason) {
        return reasonRepository.save(reason);
    }

    public List<Reason> getApprovedReasons() {
        return reasonRepository.findByApprovedTrue();
    }

    public List<Reason> getReasonsByType(ReasonType reasonType) {
        return reasonRepository.findByReasonTypeAndApprovedTrue(reasonType);
    }
}
