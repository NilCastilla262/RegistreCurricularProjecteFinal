import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SdaService } from '../../services/sda.service';
import { SdaModel } from '../../models/sda/sda.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-sda',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-sda.component.html',
  styleUrl: './list-sda.component.css'
})

export class ListSdaComponent implements OnInit {
  sdas: SdaModel[] = [];
  errorMessage: string = '';

  constructor(private sdaService: SdaService, private router: Router) {}

  ngOnInit(): void {
    this.loadSdas();
  }

  loadSdas(): void {
    this.sdaService.getAllSdas().subscribe({
      next: (data) => {
        this.sdas = data;
      },
      error: (err) => {
        this.errorMessage = 'Error carregant SDA: ' + (err.error?.message || err.message);
      }
    });
  }

  showSda(uuid: string): void {
    this.router.navigate(['/show-sda', uuid]);
  }
}