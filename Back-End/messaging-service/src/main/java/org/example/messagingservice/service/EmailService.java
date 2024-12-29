package org.example.messagingservice.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.io.IOException;
import java.nio.file.Files;

@Service
public class EmailService {

    private final JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String senderEmail;

    @Value("email-template.html")
    private ClassPathResource emailTemplate;

    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendEmail(String recipientEmail, String subject, String body) {
        try {
            // Load the email template from resources
            String templateContent = loadTemplateContent();

            // Replace the {{body}} placeholder in the template with the actual body
            String content = templateContent.replace("{{body}}", body);

            // Create the email message
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom(senderEmail);
            helper.setTo(recipientEmail);
            helper.setSubject(subject);
            helper.setText(content, true);

            // Send the email
            javaMailSender.send(message);
            System.out.println("Email sent successfully!");
        } catch (MessagingException | IOException e) {
            e.printStackTrace();
            System.err.println("Failed to send email.");
        }
    }

    private String loadTemplateContent() throws IOException {
        // Load the template file from the resources directory
        return new String(Files.readAllBytes(emailTemplate.getFile().toPath()));
    }
}