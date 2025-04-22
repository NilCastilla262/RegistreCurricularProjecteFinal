import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupsService, ResumeRow } from '../../services/groups.service';
import { CommonModule } from '@angular/common';

interface Criteria {
  name: string;
  mainOrder: number;
  order: number;
  total: number;
}

interface Competency {
  name: string;
  order: number;
  criteria: Criteria[];
  expanded: boolean;
}

interface SubjectGroup {
  name: string;
  competencies: Competency[];
  expanded: boolean;
}

@Component({
  selector: 'app-show-resume',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-resume.component.html',
  styleUrl: './show-resume.component.css'
})
export class ShowResumeComponent implements OnInit {
  resume: ResumeRow[] = [];
  groupedResume: SubjectGroup[] = [];
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
        this.groupedResume = this.buildGrouped(data);
      },
      error: err => {
        this.errorMessage =
          'Error obtenint el resum: ' +
          (err.error?.message || err.message);
      }
    });
  }

  private buildGrouped(rows: ResumeRow[]): SubjectGroup[] {
    rows.sort((a, b) => {
      const subCmp = a.Subject.localeCompare(b.Subject);
      if (subCmp !== 0) return subCmp;
      if (a.OrderByCompetency !== b.OrderByCompetency) {
        return a.OrderByCompetency - b.OrderByCompetency;
      }
      if (a.OrderByMainCriteria !== b.OrderByMainCriteria) {
        return a.OrderByMainCriteria - b.OrderByMainCriteria;
      }
      return a.OrderByCriteria - b.OrderByCriteria;
    });

    const subjectsMap = new Map<string, SubjectGroup>();

    for (const row of rows) {
      if (!subjectsMap.has(row.Subject)) {
        subjectsMap.set(row.Subject, {
          name: row.Subject,
          competencies: [],
          expanded: false
        });
      }
      const subj = subjectsMap.get(row.Subject)!;

      let comp = subj.competencies.find(c => c.name === row.CompetencyDescription);
      if (!comp) {
        comp = {
          name: row.CompetencyDescription,
          order: row.OrderByCompetency,
          criteria: [],
          expanded: true
        };
        subj.competencies.push(comp);
      }

      comp.criteria.push({
        name: row.CriteriaDescription,
        mainOrder: row.OrderByMainCriteria,
        order: row.OrderByCriteria,
        total: row.TotalWorked
      });
    }

    return Array.from(subjectsMap.values()).map(subj => ({
      name: subj.name,
      expanded: subj.expanded,
      competencies: subj.competencies
        .sort((a, b) => a.order - b.order)
        .map(c => ({
          ...c,
          criteria: c.criteria.sort((x, y) =>
            x.mainOrder !== y.mainOrder
              ? x.mainOrder - y.mainOrder
              : x.order - y.order
          )
        }))
    }));
  }
}
