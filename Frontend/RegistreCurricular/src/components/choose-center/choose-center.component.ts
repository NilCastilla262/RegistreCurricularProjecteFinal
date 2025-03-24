import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface CenterInfo {
  centerName: string;
  role: number;
}

@Component({
  selector: 'app-choose-center',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './choose-center.component.html',
  styleUrl: './choose-center.component.css'
})


export class ChooseCenterComponent implements OnInit {
  centers: CenterInfo[] = [];
  userUUID: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const tempUUID = localStorage.getItem('tempUserUUID');
    const tempCenters = localStorage.getItem('tempCenters');
    if (!tempUUID || !tempCenters) {
      this.errorMessage = 'No hi ha dades de centres.';
      return;
    }
    this.userUUID = tempUUID;
    this.centers = JSON.parse(tempCenters);
  }

  onSelectCenter(centerName: string) {
    this.authService.chooseCenter(this.userUUID, centerName).subscribe({
      next: (res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          localStorage.removeItem('tempUserUUID');
          localStorage.removeItem('tempCenters');
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Error seleccionant el centre';
      }
    });
  }

  goLogin() {
    localStorage.removeItem('tempUserUUID');
    localStorage.removeItem('tempCenters');
    this.router.navigate(['/login']);
  }
}