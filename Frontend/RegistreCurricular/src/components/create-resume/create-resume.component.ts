import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupModel } from '../../models/groups/group.model';
import { GroupsService } from '../../services/groups.service';
import { SdaService } from '../../services/sda.service';
import { CommonModule } from '@angular/common';
import { CoursesService } from '../../services/courses.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-resume',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  templateUrl: './create-resume.component.html',
  styleUrl: './create-resume.component.css'
})
export class CreateResumeComponent implements OnInit {
  groups: GroupModel[] = [];
  selectedGroupUUID: string = '';
  errorMessage: string = '';
  resum: any;

  constructor(
    private groupsService: GroupsService,
    private sdaService: SdaService,
    private CoursesService: CoursesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadGroups();
  }

  loadGroups(): void {
    this.groupsService.getGroupsFromUser().subscribe({
      next: (groups) => { 
        this.groups = groups; 
      },
      error: (err) => { 
        this.errorMessage = 'Error carregant grups: ' + (err.error?.message || err.message); 
      }
    });
  }

  getResum(): void {
    if (!this.selectedGroupUUID) {
      this.errorMessage = 'Selecciona un grup.';
      return;
    }
    
    this.sdaService.getResum([this.selectedGroupUUID]).subscribe({
        next: (data) => {
        this.resum = data;
        console.log('Resum:', this.resum);
      },
      error: (err) => {
        this.errorMessage = 'Error obtenint el resum: ' + (err.error?.message || err.message);
      }
    });
  }
}