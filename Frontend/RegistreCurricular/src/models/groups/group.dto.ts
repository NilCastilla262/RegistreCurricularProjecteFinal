// group.dto.ts
import { GroupModel } from './group.model';

export class GroupDTO {
  static fromApi(apiData: any): GroupModel {
    return new GroupModel(
      apiData.UUID,
      apiData.Name,
      apiData.CourseName
    );
  }

  static fromApiArray(apiArray: any[]): GroupModel[] {
    return apiArray.map((g) => this.fromApi(g));
  }
}
