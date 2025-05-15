import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SdaService, PaginatedResponse } from '../../services/sda.service';
import { SdaModel } from '../../models/sda/sda.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-sda',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list-sda.component.html',
  styleUrl: './list-sda.component.css'
})

export class ListSdaComponent implements OnInit {
  sdas: SdaModel[] = [];
  errorMessage = '';

  page = 1;
  limit = 10;
  sortBy: 'title' | 'createdAt' | 'groupName' = 'title';
  sortOrder: 'ASC' | 'DESC' = 'ASC';

  constructor(private sdaService: SdaService, private router: Router) {}

  ngOnInit(): void {
    this.loadSdas();
  }

  loadSdas(): void {
    this.sdaService
      .getSdas(this.page, this.limit, this.sortBy, this.sortOrder)
      .subscribe({
        next: (resp: PaginatedResponse<SdaModel>) => {
          this.sdas = resp.data;
          this.page = resp.page;
          this.limit = resp.limit;
          this.sortBy = resp.sortBy as any;
          this.sortOrder = resp.sortOrder;
        },
        error: err => {
          this.errorMessage = 'Error carregant SDA: '
            + (err.error?.message || err.message);
        }
      });
  }

  showSda(uuid: string): void {
    this.router.navigate(['/show-sda', uuid]);
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadSdas();
    }
  }

  nextPage(): void {
    if (this.sdas.length === this.limit) {
      this.page++;
      this.loadSdas();
    }
  }

  changeLimit(newLimit: number): void {
    this.limit = newLimit;
    this.page = 1;
    this.loadSdas();
  }

  changeSort(by: 'title' | 'createdAt' | 'groupName'): void {
    if (this.sortBy === by) {
      this.sortOrder = this.sortOrder === 'ASC' ? 'DESC' : 'ASC';
    } else {
      this.sortBy = by;
      this.sortOrder = 'ASC';
    }
    this.page = 1;
    this.loadSdas();
  }
}
