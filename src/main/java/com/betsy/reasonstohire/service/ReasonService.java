package com.betsy.reasonstohire.service;

import com.betsy.reasonstohire.model.Reason;
import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class ReasonService {

    private List<Reason> reasons = new ArrayList<>();

    @PostConstruct
    public void init(){
        reasons.add(new Reason("1", "Strong communicator", "serious", "Explains things clearly to non-tech folks."));
        reasons.add(new Reason("2", "Owns 3 types of highlighters", "silly", "Color-coded problem solver."));
    }

    public Reason getRandomReason(){
        Random rand = new Random();
        return reasons.get(rand.nextInt(reasons.size()));
    }

    public List<Reason> getAllReasons(){
        return reasons;
    }
}
