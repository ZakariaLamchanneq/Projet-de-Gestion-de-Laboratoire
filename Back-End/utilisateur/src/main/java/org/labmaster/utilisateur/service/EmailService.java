package org.labmaster.utilisateur.service;

import org.labmaster.utilisateur.model.Utilisateur;
import org.labmaster.utilisateur.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EmailService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    private final JavaMailSender mailSender;

    @Autowired
    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public Boolean sendResetEmail(String to, String token) {
        String resetUrl = "http://localhost:4200/reset-password?token=" + token;
        Optional<Utilisateur> utilisateur = utilisateurRepository.findByEmail(to);

        if (utilisateur.isPresent()) {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject("Password Reset Request");
            message.setText("Click the link to reset your password: " + resetUrl);
            mailSender.send(message);
            return true;

        }
        return false;
    }
}