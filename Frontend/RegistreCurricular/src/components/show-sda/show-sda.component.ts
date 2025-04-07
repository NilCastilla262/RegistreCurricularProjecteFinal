// show-sda.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SdaService } from '../../services/sda.service';
import { SdaModel } from '../../models/sda/sda.model';

@Component({
  selector: 'app-show-sda',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-sda.component.html',
  styleUrl: './show-sda.component.css'
})
export class ShowSdaComponent implements OnInit {
  sda!: SdaModel;
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private sdaService: SdaService) {}

  ngOnInit(): void {
    const uuid = this.route.snapshot.paramMap.get('uuid');
    if (uuid) {
      this.sdaService.getSdaByUUID(uuid).subscribe({
        next: (data) => {
          this.sda = data;
        },
        error: (err) => {
          this.errorMessage = 'Error carregant la SDA: ' + (err.error?.message || err.message);
        }
      });
    } else {
      this.errorMessage = 'UUID no especificada.';
    }
  }
  onCriteriaChange(event: Event, crit: any, comp: any): void {
    const input = event.target as HTMLInputElement;
    const newState = input.checked;
    if (this.sda) {
      this.sdaService.markCriteria(this.sda.sdaUUID, crit.criteriaUUID, comp.competencyUUID, newState)
        .subscribe({
          next: (res) => {
            crit.criteriaWorked = newState;
            comp.competencyWorked = res.competencyWorked;
          },
          error: (err) => {
          }
        });
    }
  }  
}