import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SdaService } from '../../services/sda.service';

@Component({
  selector: 'app-show-resume',
  standalone: true,
  imports: [],
  templateUrl: './show-resume.component.html',
  styleUrl: './show-resume.component.css'
})
export class ShowResumeComponent implements OnInit {
  resume: any;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private sdaService: SdaService
  ) {}

  ngOnInit(): void {
    const groupsParam = this.route.snapshot.queryParamMap.get('groups');
    if (!groupsParam) {
      this.errorMessage = 'No s\'ha proporcionat cap grup.';
      return;
    }

    const groupUUIDs = groupsParam.split(',');
    this.sdaService.getResum(groupUUIDs).subscribe({
      next: data => this.resume = data,
      error: err =>
        this.errorMessage = 'Error obtenint el resum: ' + (err.error?.message || err.message)
    });
  }
}
