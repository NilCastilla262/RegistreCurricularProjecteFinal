// subject-tpl.dto.ts
import { SubjectModel } from './subject.model';

export class SubjectDTO {
  static fromApi(apiData: any): SubjectModel {
    return new SubjectModel(
      apiData.UUID,
      apiData.Name,
      apiData.TemplateName,
      apiData.Type
    );
  }

  static fromApiArray(apiArray: any[]): SubjectModel[] {
    return apiArray.map(item => this.fromApi(item));
  }

  static toApi(model: SubjectModel): any {
    return {
      UUID: model.uuid,
      Name: model.name,
      TemplateName: model.templateName,
      Type: model.type
    };
  }
}
