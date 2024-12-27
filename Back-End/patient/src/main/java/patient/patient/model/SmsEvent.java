package patient.patient.model;

import lombok.Data;

import java.io.Serializable;

@Data
public class SmsEvent implements Serializable {
    private String phoneNumber;
    private String message;

    public SmsEvent(String phoneNumber, String message) {
        this.phoneNumber = phoneNumber;
        this.message = message;
    }
}
