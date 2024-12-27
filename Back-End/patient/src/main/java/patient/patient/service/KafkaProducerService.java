package patient.patient.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import patient.patient.model.EmailEvent;
import patient.patient.model.SmsEvent;

@Service
public class KafkaProducerService {

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final ObjectMapper objectMapper;

    public KafkaProducerService(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
        this.objectMapper = new ObjectMapper();
    }

    public void sendEmail(String recipient, String subject, String body) throws JsonProcessingException {
        EmailEvent emailEvent = new EmailEvent(recipient, subject, body);
        String jsonPayload = objectMapper.writeValueAsString(emailEvent); // Convert object to JSON string
        kafkaTemplate.send("email-topic", jsonPayload);
    }

    public void sendSms(String phoneNumber, String message) throws JsonProcessingException {
        SmsEvent smsEvent = new SmsEvent(phoneNumber, message);
        String jsonPayload = objectMapper.writeValueAsString(smsEvent); // Convert object to JSON string
        kafkaTemplate.send("sms-topic", jsonPayload);
    }
}