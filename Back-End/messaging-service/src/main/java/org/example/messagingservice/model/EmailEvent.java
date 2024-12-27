package org.example.messagingservice.model;

import lombok.Data;

import java.io.Serializable;

@Data
public class EmailEvent implements Serializable {
    private String recipient;
    private String subject;
    private String body;
}
