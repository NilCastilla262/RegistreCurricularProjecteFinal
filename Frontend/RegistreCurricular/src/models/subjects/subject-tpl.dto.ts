// subject-tpl.dto.ts
import { SubjectTPLModel } from './subject-tpl.model';

export class SubjectTPLDTO {
  static fromApi(apiData: any): SubjectTPLModel {
    return new SubjectTPLModel(
      apiData.UUID,
      apiData.Name,
      apiData.TemplateName,
      apiData.Type
    );
  }

  static fromApiArray(apiArray: any[]): SubjectTPLModel[] {
    return apiArray.map(item => this.fromApi(item));
  }
}
