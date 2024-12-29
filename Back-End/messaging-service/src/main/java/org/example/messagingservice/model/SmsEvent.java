package org.example.messagingservice.model;

import lombok.Data;

import java.io.Serializable;

@Data
public class SmsEvent implements Serializable {
    private String phoneNumber;
    private String message;
}
