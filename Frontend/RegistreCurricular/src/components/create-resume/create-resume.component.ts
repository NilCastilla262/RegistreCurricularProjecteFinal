import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupModel } from '../../models/groups/group.model';
import { GroupsService } from '../../services/groups.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-resume',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-resume.component.html',
  styleUrl: './create-resume.component.css'
})
export class CreateResumeComponent implements OnInit {
  groups: GroupModel[] = [];
  selectedGroupUUID: string = '';
  errorMessage = '';

  constructor(
    private groupsService: GroupsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadGroups();
  }

  private loadGroups(): void {
    this.groupsService.getGroupsFromUser().subscribe({
      next: groups => this.groups = groups,
      error: err => this.errorMessage = 'Error carregant grups: ' + (err.error?.message || err.message)
    });
  }

  goToResume(): void {
    if (!this.selectedGroupUUID) {
      this.errorMessage = 'Selecciona un grup.';
      return;
    }

    const uuids = [ this.selectedGroupUUID ];
    this.router.navigate(
      ['show-resume'],
      { queryParams: { groups: uuids.join(',') } }
    );
  }
}
