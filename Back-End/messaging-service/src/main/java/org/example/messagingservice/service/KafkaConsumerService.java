package org.example.messagingservice.service;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumerService {

    private final EmailService emailService;
    private final SmsService smsService;

    public KafkaConsumerService(EmailService emailService, SmsService smsService) {
        this.emailService = emailService;
        this.smsService = smsService;
    }

    // Listen for email-related messages
    @KafkaListener(topics = "patient-email-topic", groupId = "email-group")
    public void consumeEmail(String message) {
        System.out.println("Consumed email message: " + message);
        emailService.sendEmail(message);
    }

    // Listen for SMS-related messages
    @KafkaListener(topics = "patient-sms-topic", groupId = "sms-group")
    public void consumeSms(String message) {
        System.out.println("Consumed SMS message: " + message);
        smsService.sendSms(message);
    }
}
