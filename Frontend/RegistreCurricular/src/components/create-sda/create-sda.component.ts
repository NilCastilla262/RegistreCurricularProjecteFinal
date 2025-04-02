import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupModel } from '../../models/groups/group.model';
import { SubjectModel } from '../../models/subjects/subject.model';
import { CoursesService } from '../../services/courses.service';
import { GroupsService } from '../../services/groups.service';
import { SdaService } from '../../services/sda.service';
import { SubjectsService } from '../../services/subjects.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateSdaModel } from '../../models/create-sda/createSda.model';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-create-sda',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-sda.component.html',
  styleUrl: './create-sda.component.css'
})

export class CreateSdaComponent implements OnInit {
  title: string = '';
  description: string = '';
  groups: GroupModel[] = [];
  selectedGroupUUID: string = '';
  subjects: SubjectModel[] = [];
  selectedSubjectUUIDs: string[] = [];
  errorMessage: string = '';

  constructor(
    private groupsService: GroupsService,
    private coursesService: CoursesService,
    private subjectsService: SubjectsService,
    private sdaService: SdaService,
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

  onGroupChange(): void {
    const selectedGroup = this.groups.find(g => g.uuid === this.selectedGroupUUID);
    if (!selectedGroup) {
      this.subjects = [];
      return;
    }

    this.coursesService.getTemplateByCourseName(selectedGroup.courseName).subscribe({
      next: (courseModel) => {
        const templateName = courseModel.templateName;
        this.subjectsService.getSubjectsByTemplate(templateName).subscribe({
          next: (subjects) => {
            this.subjects = subjects;
            this.selectedSubjectUUIDs = [];
          },
          error: (err) => {
            this.errorMessage = 'Error carregant assignatures: ' + (err.error?.message || err.message);
          }
        });
      },
      error: (err) => {
        this.errorMessage = 'Error obtenint template del curs: ' + (err.error?.message || err.message);
      }
    });
  }

  onSubjectCheckboxChange(subjectUUID: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.checked) {
      this.selectedSubjectUUIDs.push(subjectUUID);
    } else {
      this.selectedSubjectUUIDs = this.selectedSubjectUUIDs.filter(uuid => uuid !== subjectUUID);
    }
  }

  onCreateSDA(): void {
    if (!this.title.trim() || !this.description.trim() || !this.selectedGroupUUID) {
      this.errorMessage = 'Falten camps obligatoris (títol, descripció o grup).';
      return;
    }
  
    const sda = new CreateSdaModel(this.title, this.description, this.selectedGroupUUID);
  
    this.sdaService.createSDA(sda).subscribe({
      next: (res) => {
        const sdaUUID = res.uuid;
        if (this.selectedSubjectUUIDs && this.selectedSubjectUUIDs.length > 0) {
          this.sdaService.createCompleteSDA(sdaUUID, this.selectedSubjectUUIDs).subscribe({
            next: () => {
              this.router.navigate(['/dashboard']);
            },
            error: (err) => {
              this.errorMessage = 'Error creant la SDA completa: ' + (err.error?.message || err.message);
            }
          });
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => {
        this.errorMessage = 'Error creant la SDA: ' + (err.error?.message || err.message);
      }
    });
  }
}