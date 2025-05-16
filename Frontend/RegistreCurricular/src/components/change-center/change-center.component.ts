import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface CenterInfo { centerName: string; role: number; }

@Component({
  selector: 'app-change-center',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './change-center.component.html',
  styleUrl: './change-center.component.css'
})
export class ChangeCenterComponent implements OnInit {
  centers: CenterInfo[] = [];
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.auth.listMyCenters().subscribe({
      next: cs => this.centers = cs,
      error: err => this.errorMessage = err.error?.message || err.message
    });
  }

  onSelectCenter(c: CenterInfo) {
    this.auth.chooseCenterProtected(c.centerName).subscribe({
      next: res => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/dashboard']);
      },
      error: err => this.errorMessage = err.error?.message || err.message
    });
  }
}
