// sda.dto.ts
import { SdaModel } from './sda.model';
import { SubjectSdaModel } from '../subject-sda/subject-sda.model';
import { CompetencieSdaModel } from '../competencie-sda/competencie-sda.model';
import { CriteriaSdaModel } from '../criiteria-sda/criteria-sda.model';

export class SdaDTO {
  static fromApi(apiData: any): SdaModel {
    return new SdaModel(
      apiData.sdaUUID,
      apiData.Title,
      apiData.Description,
      new Date(apiData.CreatedAt),
      apiData.subjects
        ? apiData.subjects.map((subject: any) => this.subjectFromApi(subject))
        : []
    );
  }

  private static subjectFromApi(apiSubject: any): SubjectSdaModel {
    return new SubjectSdaModel(
      apiSubject.subjectUUID,
      apiSubject.subjectName,
      apiSubject.subjectTemplate,
      apiSubject.subjectType,
      apiSubject.competencies
        ? apiSubject.competencies.map((comp: any) => this.competencyFromApi(comp))
        : []
    );
  }

  private static competencyFromApi(apiCompetency: any): CompetencieSdaModel {
    return new CompetencieSdaModel(
      apiCompetency.competencyUUID,
      apiCompetency.competencyUUIDTPL,
      apiCompetency.competencyDescription,
      apiCompetency.competencyOrder,
      apiCompetency.competencyWorked,
      apiCompetency.competencyType,
      apiCompetency.criteria
        ? apiCompetency.criteria.map((crit: any) => this.criteriaFromApi(crit))
        : []
    );
  }

  private static criteriaFromApi(apiCriteria: any): CriteriaSdaModel {
    return new CriteriaSdaModel(
      apiCriteria.criteriaUUID,
      apiCriteria.criteriaUUIDTPL,
      apiCriteria.criteriaDescription,
      apiCriteria.criteriaMainOrder,
      apiCriteria.criteriaOrder,
      apiCriteria.criteriaWorked
    );
  }

  static fromApiArray(apiArray: any[]): SdaModel[] {
    return apiArray.map(item => this.fromApi(item));
  }

  static toApi(sda: SdaModel): any {
    return {
      sdaUUID: sda.sdaUUID,
      Title: sda.title,
      Description: sda.description,
      CreatedAt: sda.createdAt,
      subjects: sda.subjects.map(subject => ({
        subjectUUID: subject.subjectUUID,
        subjectName: subject.subjectName,
        subjectTemplate: subject.subjectTemplate,
        subjectType: subject.subjectType,
        competencies: subject.competencies.map(comp => ({
          competencyUUID: comp.competencyUUID,
          competencyUUIDTPL: comp.competencyUUIDTPL,
          competencyDescription: comp.competencyDescription,
          competencyOrder: comp.competencyOrder,
          competencyWorked: comp.competencyWorked,
          competencyType: comp.competencyType,
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
