package org.example.messagingservice.model;

import lombok.Data;

@Data
public class SmsEvent {
    private String phoneNumber;
    private String message;
}
