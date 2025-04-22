import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupsService, ResumeRow } from '../../services/groups.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-resume',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-resume.component.html',
  styleUrl: './show-resume.component.css'
})
export class ShowResumeComponent implements OnInit {
  resume: ResumeRow[] = [];
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private groupsService: GroupsService
  ) {}

  ngOnInit(): void {
    const groupsParam = this.route.snapshot.queryParamMap.get('groups');
    if (!groupsParam) {
      this.errorMessage = 'No s’ha proporcionat cap grup.';
      return;
    }

    const groupUUIDs = groupsParam.split(',').map(s => s.trim());
    this.groupsService.getResume(groupUUIDs).subscribe({
      next: data => {
        this.resume = data;
      },
      error: err => {
        this.errorMessage = 'Error obtenint el resum: '
          + (err.error?.message || err.message);
      }
    });
  }
}
