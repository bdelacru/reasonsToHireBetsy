package com.betsy.reasonstohire.controller;

import com.betsy.reasonstohire.model.Reason;
import com.betsy.reasonstohire.model.ReasonType;
import com.betsy.reasonstohire.service.CloudinaryService;
import com.betsy.reasonstohire.service.ReasonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/reasons")
public class ReasonController {

    @Autowired
    private ReasonService  reasonService;

    @Autowired
    private CloudinaryService cloudinaryService;

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
    @GetMapping("/approved")
    public ResponseEntity<List<Reason>> getApprovedReasons() {
        return ResponseEntity.ok(reasonService.getApprovedReasons());
    }

    @GetMapping("/filter")
    public List<Reason> getReasonsByType(@RequestParam ReasonType type) {
        return reasonService.getReasonsByType(type);
    }

    @PostMapping("/upload")
    public ResponseEntity<Reason> uploadReasonWithImage(
            @RequestPart("reason") Reason reason,
            @RequestPart("file") MultipartFile file) throws IOException {

        String imageUrl = cloudinaryService.uploadImage(file);
        reason.setImageUrl(imageUrl);
        Reason saved = reasonService.saveReason(reason);
        return ResponseEntity.ok(saved);
    }
}
