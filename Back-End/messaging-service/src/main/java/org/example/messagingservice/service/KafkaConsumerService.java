package org.example.messagingservice.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.messagingservice.model.EmailEvent;
import org.example.messagingservice.model.SmsEvent;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumerService {

    private final EmailService emailService;
    private final SmsService smsService;
    private final ObjectMapper objectMapper;

    public KafkaConsumerService(EmailService emailService, SmsService smsService) {
        this.emailService = emailService;
        this.smsService = smsService;
        this.objectMapper = new ObjectMapper();
    }

    @KafkaListener(topics = "email-topic", groupId = "messagerie-group")
    public void consumeEmail(String jsonPayload) throws JsonProcessingException {
        EmailEvent emailEvent = objectMapper.readValue(jsonPayload, EmailEvent.class);
        System.out.println("Consumed email message to: " + emailEvent.getRecipient());
        emailService.sendEmail(emailEvent.getRecipient(), emailEvent.getSubject(), emailEvent.getBody());
    }

    @KafkaListener(topics = "sms-topic", groupId = "messagerie-group")
    public void consumeSms(String jsonPayload) throws JsonProcessingException {
        SmsEvent smsEvent = objectMapper.readValue(jsonPayload, SmsEvent.class);
        System.out.println("Consumed SMS message to: " + smsEvent.getPhoneNumber());
        smsService.sendSms(smsEvent.getPhoneNumber(), smsEvent.getMessage());
    }
}