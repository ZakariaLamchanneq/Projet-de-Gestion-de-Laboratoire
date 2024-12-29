package patient.patient.model;

import lombok.Data;

import java.io.Serializable;

@Data
public class EmailEvent implements Serializable {
    private String recipient;
    private String subject;
    private String body;

    public EmailEvent(String recipient, String subject, String body) {
        this.recipient = recipient;
        this.subject = subject;
        this.body = body;
    }
}
