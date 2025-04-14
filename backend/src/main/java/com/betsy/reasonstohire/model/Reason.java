package com.betsy.reasonstohire.model;

import jakarta.persistence.*;

import lombok.*;

import java.util.UUID;

import io.swagger.v3.oas.annotations.media.Schema;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Represents a reason to hire Betsy.")
public class Reason {
    @Id
    @Schema(description = "Unique identifier of the reason", example = "1")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    @Schema(description = "The text of the reason", example = "Betsy is a quick learner.")
    private String reason;

    @Schema(description = "The type of reason", example = "SKILL")
    @Enumerated(EnumType.STRING)
    private ReasonType reasonType;
    @Schema(description = "The explanation of the reason", example = "Betsy has a proven track record of learning new skills quickly.")
    private String explanation;
    @Schema(description = "URL of the associated image", example = "https://example.com/image.jpg")
    private String imageUrl;

    @Schema(description = "The name of the person who submitted the reason", example = "John Doe")
    private String submittedBy;
    @Schema(description = "The URL of the submitter's profile", example = "https://example.com/profile/betsy")
    private String submittedByLink;
    @Schema(description = "The relationship of the submitter to Betsy", example = "Friend")
    private String relationship;
    @Schema(description = "The reason for submitting the reason", example = "To help Betsy get hired.")
    private boolean submittedByOthers;
    @Schema(description = "Boolean indicating if the reason is approved", example = "true")
    private boolean approved = false;
}
