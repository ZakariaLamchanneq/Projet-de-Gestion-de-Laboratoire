import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DossierService } from '../../services/dossierService/dossier.service';
import { PatientService } from '../../services/patientService/patient.service';
import { UtilisateurService } from '../../services/utilisateurService/utilisateur.service';
import { ExaminService } from '../../services/examinService/examin.service';
import { EpreuveService } from '../../services/epreuveService/epreuve.service';
import { AnalyseService } from '../../services/analyseService/analyse.service';
import { jsPDF } from 'jspdf';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Analyse } from '../../models/analyse/analyse.model';
import { Epreuve } from '../../models/epreuve/epreuve.model';
import { TestEpreuve } from '../../models/testEpreuve/test-epreuve.model';
import { TestEpreuveService } from '../../services/testEpreuveService/test-epreuve.service';
import html2canvas from 'html2canvas';
import { Examin } from '../../models/examin/examin.model';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-consult-dossier',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzButtonModule,
  ],
  templateUrl: './consult-dossier.component.html',
  styleUrls: ['./consult-dossier.component.css']
})
export class ConsultDossierComponent implements OnInit {
  @Input() numDossier: number = 0;
  dossierData: any = null;
  errorMessage: string = '';

  constructor(
    private dossierService: DossierService,
    private patientService: PatientService,
    private utilisateurService: UtilisateurService,
    private examinService: ExaminService,
    private epreuveService: EpreuveService,
    private analyseService: AnalyseService,
    private testEpreuveService: TestEpreuveService,
    private message: NzMessageService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    if (this.numDossier) {
      this.onSubmit();
    }
  }

  onSubmit(): void {
    this.dossierService.getDossierById(this.numDossier).subscribe({
      next: dossier => {
        this.patientService.getPatientById(dossier.fkIdPatient).subscribe({
          next: patient => {
            this.utilisateurService.getUtilisateurByEmail(dossier.fkEmailUtilisateur).subscribe({
              next: utilisateur => {
                this.examinService.getExaminsByDossierId(this.numDossier).subscribe({
                  next: examins => {
                    const epreuveIds = examins.map(examin => examin.fkIdEpreuve);
                    const epreuves: Epreuve[] = [];
                    const analyses: Analyse[] = [];
                    const testEpreuves: TestEpreuve[] = [];

                    let epreuvesFetched = 0;
                    epreuveIds.forEach(epreuveId => {
                      this.epreuveService.getEpreuveById(epreuveId).subscribe({
                        next: epreuve => {
                          epreuves.push(epreuve);
                          this.testEpreuveService.getTestEpreuveById(epreuve.fkIdTestEpreuve).subscribe({
                            next: testEpreuve => {
                              testEpreuves.push(testEpreuve);
                              epreuvesFetched++;
                              if (epreuvesFetched === epreuveIds.length) {
                                const analyseIds = [...new Set(epreuves.map(e => e.fkIdAnalyse))];
                                let analysesFetched = 0;
                                analyseIds.forEach(analyseId => {
                                  this.analyseService.getAnalyseById(analyseId).subscribe({
                                    next: analyse => {
                                      analyses.push(analyse);
                                      analysesFetched++;
                                      if (analysesFetched === analyseIds.length) {
                                        this.dossierData = {
                                          dossier,
                                          patient,
                                          utilisateur,
                                          examins,
                                          epreuves,
                                          analyses,
                                          testEpreuves
                                        };
                                      }
                                    },
                                    error: () => {
                                      this.message.error('Error fetching analyses data');
                                    }
                                  });
                                });
                              }
                            },
                            error: () => {
                              this.message.error('Error fetching test epreuves data');
                            }
                          });
                        },
                        error: () => {
                          this.message.error('Error fetching epreuves data');
                        }
                      });
                    });
                  },
                  error: () => {
                    this.message.error('Error fetching examins data');
                  }
                });
              },
              error: () => {
                this.message.error('Error fetching utilisateur data');
              }
            });
          },
          error: () => {
            this.message.error('Error fetching patient data');
          }
        });
      },
      error: () => {
        this.message.error('Error fetching dossier data');
      }
    });
  }

  generatePDF(): void {
    const element = document.getElementById('dossier-details');
    if (element) {
      html2canvas(element, { backgroundColor: '#ffffff', scale: 1.2 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('dossier_n_' + this.numDossier + '.pdf');
      });
    }
  }
  generatePDFAndSendEmail(): void {
    const element = document.getElementById('dossier-details');
    if (element) {
      html2canvas(element, { backgroundColor: '#ffffff', scale: 1.2 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

        // Convert the PDF to a Blob
        const pdfBlob = pdf.output('blob');

        // Create a FormData object to send the PDF and email
        const formData = new FormData();
        formData.append('file', pdfBlob, 'dossier_n_' + this.numDossier + '.pdf');
        formData.append('email', this.dossierData.patient.email); // Assuming you have the patient's email in dossierData

        // Send the PDF to the backend
        this.http.post('http://localhost:8222/api/dossiers/send-email', formData).subscribe({
          next: () => {
            this.message.success('Email sent successfully!');
          },
          error: () => {
            this.message.error('Failed to send email.');
          }
        });
      });
    }
  }

  getTestEpreuve(testEpreuveId: number): TestEpreuve {
    return this.dossierData.testEpreuves.find((te: TestEpreuve) => te.id === testEpreuveId);
  }

  getEpreuvesByAnalyseId(analyseId: number): Epreuve[] {
    return this.dossierData.epreuves.filter((e: Epreuve) => e.fkIdAnalyse === analyseId);
  }

  getResultsByEpreuveId(epreuveId: number): string {
    return this.dossierData.examins
      .filter((ex: Examin) => ex.fkIdEpreuve === epreuveId)
      .map((ex: Examin) => ex.resultat)
      .join(', ');
  }

  calculateAge(dateOfBirth: Date): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}
