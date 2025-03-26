// group.dto.ts
import { GroupModel } from './group.model';

export class GroupDTO {
  static fromApi(apiData: any): GroupModel {
    return new GroupModel(
      apiData.UUID,
      apiData.Name,
      apiData.CenterName,
      apiData.CourseName,
      apiData.Year
    );
  }

  static fromApiArray(apiArray: any[]): GroupModel[] {
    return apiArray.map(item => this.fromApi(item));
  }

  static toApi(model: GroupModel): any {
    return {
      UUID: model.uuid,
      Name: model.name,
      CenterName: model.centerName,
      CourseName: model.courseName,
      Year: model.year
    };
  }
}
