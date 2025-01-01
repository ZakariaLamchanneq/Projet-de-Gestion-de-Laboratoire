// import { Component, OnInit, AfterViewInit } from '@angular/core';
// import { UtilisateurService } from '../../services/utilisateurService/utilisateur.service';
// import { PatientService } from '../../services/patientService/patient.service';
// import { LaboratoireService } from '../../services/laboratoireService/laboratoire.service';
// import { AuthService } from '../../services/AuthService/auth-service.service';
// import {
//   Chart,
//   PieController,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import {NgIf} from '@angular/common';
//
// @Component({
//   selector: 'app-statistique',
//   standalone: true,
//   imports: [
//     NgIf
//   ],
//   templateUrl: './statistique.component.html',
//   styleUrl: './statistique.component.css',
// })
// export class StatistiqueComponent implements OnInit, AfterViewInit {
//   utilisateursArchives: number = 0;
//   utilisateursNonArchives: number = 0;
//   patientsArchives: number = 0;
//   patientsNonArchives: number = 0;
//   laboratoiresActifs: number = 0;
//   laboratoiresInactifs: number = 0;
//
//   role: string | null = null;
//   laboratoireId: number | null = null;
//
//   constructor(
//     private utilisateurService: UtilisateurService,
//     private patientService: PatientService,
//     private laboratoireService: LaboratoireService,
//     private authService: AuthService
//   ) {}
//
//   ngOnInit(): void {
//     this.role = this.authService.getRole();
//     this.laboratoireId = this.authService.getLaboratoireId();
//
//     this.fetchData();
//
//     // Register Chart.js components
//     Chart.register(PieController, ArcElement, Tooltip, Legend);
//   }
//
//   fetchData(): void {
//     if (this.role === 'ADMINISTRATEUR') {
//       this.fetchAllData();
//     } else if (this.role === 'ADMIN_LABO' && this.laboratoireId) {
//       this.fetchLabSpecificData(this.laboratoireId);
//     }
//   }
//
//   fetchAllData(): void {
//     this.utilisateurService.getUtilisateursArchives().subscribe((data) => {
//       this.utilisateursArchives = data.length;
//     });
//     this.utilisateurService.getUtilisateursNonArchives().subscribe((data) => {
//       this.utilisateursNonArchives = data.length;
//     });
//
//     this.patientService.getArchivedPatients().subscribe((data) => {
//       this.patientsArchives = data.length;
//     });
//     this.patientService.getNonArchivedPatients().subscribe((data) => {
//       this.patientsNonArchives = data.length;
//     });
//
//     this.laboratoireService.getLaboratoires().subscribe((laboratoires) => {
//       this.laboratoiresActifs = laboratoires.filter((labo) => labo.active).length;
//       this.laboratoiresInactifs = laboratoires.filter((labo) => !labo.active).length;
//     });
//   }
//
//   fetchLabSpecificData(laboratoireId: number): void {
//     this.utilisateurService.getUtilisateursByLaboratoire(laboratoireId).subscribe((data) => {
//       this.utilisateursNonArchives = data.filter((user) => !user.isArchived).length;
//       this.utilisateursArchives = data.filter((user) => user.isArchived).length;
//     });
//
//     this.patientService.getNonArchivedPatients().subscribe((data) => {
//       this.patientsNonArchives = data.length;
//     });
//
//     this.patientService.getArchivedPatients().subscribe((data) => {
//       this.patientsArchives = data.length;
//     });
//
//     this.laboratoireService.getLaboratoireById(laboratoireId).subscribe((labo) => {
//       this.laboratoiresActifs = labo.active ? 1 : 0;
//       this.laboratoiresInactifs = labo.active ? 0 : 1;
//     });
//   }
//
//   ngAfterViewInit(): void {
//     this.utilisateurService.getUtilisateursArchives().subscribe(() => {
//       this.createCharts();
//     });
//   }
//
//   createCharts(): void {
//     new Chart('utilisateurChart', {
//       type: 'pie',
//       data: {
//         labels: ['Archives', 'Non Archives'],
//         datasets: [
//           {
//             data: [this.utilisateursArchives, this.utilisateursNonArchives],
//             backgroundColor: ['#FF6384', '#36A2EB'],
//           },
//         ],
//       },
//     });
//
//     new Chart('patientChart', {
//       type: 'pie',
//       data: {
//         labels: ['Archives', 'Non Archives'],
//         datasets: [
//           {
//             data: [this.patientsArchives, this.patientsNonArchives],
//             backgroundColor: ['#FF9F40', '#4BC0C0'],
//           },
//         ],
//       },
//     });
//
//     new Chart('laboratoireChart', {
//       type: 'pie',
//       data: {
//         labels: ['Actifs', 'Inactifs'],
//         datasets: [
//           {
//             data: [this.laboratoiresActifs, this.laboratoiresInactifs],
//             backgroundColor: ['#FFCD56', '#FF6384'],
//           },
//         ],
//       },
//     });
//   }
//
// }





import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UtilisateurService } from '../../services/utilisateurService/utilisateur.service';
import { PatientService } from '../../services/patientService/patient.service';
import { LaboratoireService } from '../../services/laboratoireService/laboratoire.service';
import { AuthService } from '../../services/AuthService/auth-service.service';
import {
  Chart,
  PieController,
  ArcElement,
  Tooltip,
  Legend,
  BarController,
  BarElement,
  LinearScale,
  Title,
  LineController,
  LineElement,
  CategoryScale,
  PointElement
} from 'chart.js';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-statistique',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './statistique.component.html',
  styleUrl: './statistique.component.css',
})
export class StatistiqueComponent implements OnInit, AfterViewInit {
  utilisateursArchives: number = 0;
  utilisateursNonArchives: number = 0;
  patientsArchives: number = 0;
  patientsNonArchives: number = 0;
  laboratoiresActifs: number = 0;
  laboratoiresInactifs: number = 0;

  role: string | null = null;
  laboratoireId: number | null = null;

  constructor(
    private utilisateurService: UtilisateurService,
    private patientService: PatientService,
    private laboratoireService: LaboratoireService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.role = this.authService.getRole();
    this.laboratoireId = this.authService.getLaboratoireId();

    this.fetchData();

    // Register Chart.js components
    Chart.register(PieController, ArcElement, Tooltip, Legend, BarController, BarElement, LinearScale, Title, LineController, LineElement ,CategoryScale,PointElement);
  }

  fetchData(): void {
    if (this.role === 'ADMINISTRATEUR') {
      this.fetchAllData();
    } else if (this.role === 'ADMIN_LABO' && this.laboratoireId) {
      this.fetchLabSpecificData(this.laboratoireId);
    }
  }

  fetchAllData(): void {
    this.utilisateurService.getUtilisateursArchives().subscribe((data) => {
      this.utilisateursArchives = data.length;
    });
    this.utilisateurService.getUtilisateursNonArchives().subscribe((data) => {
      this.utilisateursNonArchives = data.length;
    });

    this.patientService.getArchivedPatients().subscribe((data) => {
      this.patientsArchives = data.length;
    });
    this.patientService.getNonArchivedPatients().subscribe((data) => {
      this.patientsNonArchives = data.length;
    });

    this.laboratoireService.getLaboratoires().subscribe((laboratoires) => {
      this.laboratoiresActifs = laboratoires.filter((labo) => labo.active).length;
      this.laboratoiresInactifs = laboratoires.filter((labo) => !labo.active).length;
    });
  }

  fetchLabSpecificData(laboratoireId: number): void {
    this.utilisateurService.getUtilisateursByLaboratoire(laboratoireId).subscribe((data) => {
      this.utilisateursNonArchives = data.filter((user) => !user.isArchived).length;
      this.utilisateursArchives = data.filter((user) => user.isArchived).length;
    });

    this.patientService.getNonArchivedPatients().subscribe((data) => {
      this.patientsNonArchives = data.length;
    });

    this.patientService.getArchivedPatients().subscribe((data) => {
      this.patientsArchives = data.length;
    });

    this.laboratoireService.getLaboratoireById(laboratoireId).subscribe((labo) => {
      this.laboratoiresActifs = labo.active ? 1 : 0;
      this.laboratoiresInactifs = labo.active ? 0 : 1;
    });
  }

  ngAfterViewInit(): void {
    this.utilisateurService.getUtilisateursArchives().subscribe(() => {
      this.createCharts();
    });
  }

  createCharts(): void {
    new Chart('utilisateurChart', {
      type: 'pie',
      data: {
        labels: ['Archives', 'Non Archives'],
        datasets: [
          {
            data: [this.utilisateursArchives, this.utilisateursNonArchives],
            backgroundColor: ['#FF6384', '#36A2EB'],
          },
        ],
      },
    });

    // Graphique à barres pour les patients
    new Chart('patientChart', {
      type: 'bar',
      data: {
        labels: ['Archives', 'Non Archives'],
        datasets: [
          {
            label: 'Patients',
            data: [this.patientsArchives, this.patientsNonArchives],
            backgroundColor: ['#FF9F40', '#4BC0C0'],
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Graphique linéaire pour les laboratoires
    new Chart('laboratoireChart', {
      type: 'line',
      data: {
        labels: ['Actifs', 'Inactifs'],
        datasets: [
          {
            label: 'Laboratoires',
            data: [this.laboratoiresActifs, this.laboratoiresInactifs],
            backgroundColor: '#FFCD56',
            borderColor: '#ff565c',
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

}
