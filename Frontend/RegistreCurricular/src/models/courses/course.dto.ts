import { CourseModel } from './course.model';

export class CourseDTO {
  static fromApi(apiData: any, courseName: string): CourseModel {
    return new CourseModel(
      courseName,
      apiData.templateName
    );
  }

  static fromApiArray(apiArray: any[], courseName: string): CourseModel[] {
    return apiArray.map(item => this.fromApi(item, courseName));
  }

  static toApi(model: CourseModel): any {
    return {
      Name: model.name,
      templateName: model.templateName
    };
  }
}
