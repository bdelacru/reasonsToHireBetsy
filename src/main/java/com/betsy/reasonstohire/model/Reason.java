package com.betsy.reasonstohire.model;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Reason {
    private String id;
    private String title;
    private String type;
    private String explanation;
//    public Reason(String id, String title, String type, String explanation) {
//        this.id = id;
//        this.title = title;
//        this.type = type;
//        this.explanation = explanation;
//    }

}
