package com.betsy.reasonstohire.controller;

import com.betsy.reasonstohire.model.Reason;
import com.betsy.reasonstohire.model.ReasonType;
import com.betsy.reasonstohire.service.CloudinaryService;
import com.betsy.reasonstohire.service.ReasonService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

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
    private ReasonService reasonService;

    @Autowired
    private CloudinaryService cloudinaryService;

    @Operation(summary = "Get a random reason", description = "Fetches a random reason from the database.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully fetched a random reason"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping("/random")
    public Reason getRandomReason() {
        return reasonService.getRandomReason();
    }

    @Operation(summary = "Get all reasons", description = "Fetches all reasons from the database.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully fetched all reasons"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping
    public List<Reason> getAllReasons() {
        return reasonService.getAllReasons();
    }

    @Operation(summary = "Add a new reason", description = "Adds a new reason to the database.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully added the reason"),
            @ApiResponse(responseCode = "400", description = "Invalid input data"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PostMapping
    public ResponseEntity<Reason> addReason(@RequestBody Reason reason) {
        return ResponseEntity.ok(reasonService.saveReason(reason));
    }

    @Operation(summary = "Upload a reason with an image", description = "Uploads a reason along with an associated image file.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully uploaded the reason with the image"),
            @ApiResponse(responseCode = "400", description = "Invalid input data"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PostMapping("/upload")
    public ResponseEntity<Reason> uploadReasonWithImage(
            @Parameter(description = "Reason object to be uploaded") @RequestPart("reason") Reason reason,
            @Parameter(description = "Image file to be uploaded") @RequestPart("file") MultipartFile file)
            throws IOException {

        String imageUrl = cloudinaryService.uploadImage(file);
        reason.setImageUrl(imageUrl);
        Reason saved = reasonService.saveReason(reason);
        return ResponseEntity.ok(saved);
    }
}