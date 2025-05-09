import { UserModel } from './user.model';

export class UserDTO {
  static fromApi(apiData: any): UserModel {
    return new UserModel(
      apiData.UUID,
      apiData.Name ?? null,
      apiData.Email,
      apiData.Role
    );
  }

  static fromApiArray(apiArray: any[]): UserModel[] {
    return apiArray.map(item => this.fromApi(item));
  }

  static toApi(model: UserModel): any {
    return {
      UUID: model.uuid,
      Name: model.name,
      Email: model.email,
      Role: model.role
    };
  }
}
