package patient.patient.service;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaProducerService {

    private final KafkaTemplate<String, String> kafkaTemplate;

    public KafkaProducerService(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendEmailMessage(String email) {
        kafkaTemplate.send("patient-email-topic", email);
    }

    public void sendSmsMessage(String phoneNumber) {
        kafkaTemplate.send("patient-sms-topic", phoneNumber);
    }
}
