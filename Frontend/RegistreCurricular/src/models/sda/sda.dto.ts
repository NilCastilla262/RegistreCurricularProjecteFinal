// sda.dto.ts
import { Sda } from './sda.model';
import { SubjectSda } from '../subject-sda/subject-sda.model';
import { CompetencieSda } from '../competencie-sda/competencie-sda.model';
import { CriteriaSda } from '../criiteria-sda/criteria-sda.model';

export class SdaDTO {
  static fromApi(apiData: any): Sda {
    return new Sda(
      apiData.sdaUUID,
      apiData.Title,
      apiData.Description,
      new Date(apiData.CreatedAt),
      apiData.subjects 
        ? apiData.subjects.map((subject: any) => this.subjectFromApi(subject))
        : []
    );
  }

  private static subjectFromApi(apiSubject: any): SubjectSda {
    return new SubjectSda(
      apiSubject.subjectUUID,
      apiSubject.subjectName,
      apiSubject.subjectTemplate,
      apiSubject.competencies
        ? apiSubject.competencies.map((comp: any) => this.competencyFromApi(comp))
        : []
    );
  }

  private static competencyFromApi(apiCompetency: any): CompetencieSda {
    return new CompetencieSda(
      apiCompetency.competencyUUID,
      apiCompetency.competencyUUIDTPL,
      apiCompetency.competencyDescription,
      apiCompetency.competencyOrder,
      apiCompetency.competencyWorked,
      apiCompetency.criteria
        ? apiCompetency.criteria.map((crit: any) => this.criteriaFromApi(crit))
        : []
    );
  }

  private static criteriaFromApi(apiCriteria: any): CriteriaSda {
    return new CriteriaSda(
      apiCriteria.criteriaUUID,
      apiCriteria.criteriaUUIDTPL,
      apiCriteria.criteriaDescription,
      apiCriteria.criteriaMainOrder,
      apiCriteria.criteriaOrder,
      apiCriteria.criteriaWorked
    );
  }

  static fromApiArray(apiArray: any[]): Sda[] {
    return apiArray.map(item => this.fromApi(item));
  }

  static toApi(sda: Sda): any {
    return {
      sdaUUID: sda.sdaUUID,
      Title: sda.title,
      Description: sda.description,
      CreatedAt: sda.createdAt,
      subjects: sda.subjects.map(subject => ({
        subjectUUID: subject.subjectUUID,
        subjectName: subject.subjectName,
        subjectTemplate: subject.subjectTemplate,
        competencies: subject.competencies.map(comp => ({
          competencyUUID: comp.competencyUUID,
          competencyUUIDTPL: comp.competencyUUIDTPL,
          competencyDescription: comp.competencyDescription,
          competencyOrder: comp.competencyOrder,
          competencyWorked: comp.competencyWorked,
          criteria: comp.criteria.map(crit => ({
            criteriaUUID: crit.criteriaUUID,
            criteriaUUIDTPL: crit.criteriaUUIDTPL,
            criteriaDescription: crit.criteriaDescription,
            criteriaMainOrder: crit.criteriaMainOrder,
            criteriaOrder: crit.criteriaOrder,
            criteriaWorked: crit.criteriaWorked
          }))
        }))
      }))
    };
  }
}
