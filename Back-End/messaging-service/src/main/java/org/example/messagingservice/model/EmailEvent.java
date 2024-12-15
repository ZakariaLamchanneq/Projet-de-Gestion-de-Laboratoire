package org.example.messagingservice.model;

import lombok.Data;

@Data
public class EmailEvent {
    private String recipient;
    private String subject;
    private String body;
}
