package com.betsy.reasonstohire.model;

import jakarta.persistence.*;

import lombok.*;

import java.util.UUID;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Reason {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) // auto-generates UUID
    private UUID id;
    private String reason;

    @Enumerated(EnumType.STRING)
    private ReasonType reason_type;
    private String explanation;
    private String imageUrl;

    private String submittedBy;
    private String submittedByLink;
    private String relationship;
    private boolean submittedByOthers;

    private boolean approved = false;
}
