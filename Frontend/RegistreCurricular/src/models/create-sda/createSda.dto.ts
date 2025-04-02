// sda.dto.ts
import { CreateSdaModel } from './createSda.model';

export class CreateSdaDTO {

  static fromApi(apiData: any): CreateSdaModel {
    return new CreateSdaModel(
      apiData.title,
      apiData.description,
      apiData.uuidGroup,
    );
  }

  static fromApiArray(apiArray: any[]): CreateSdaModel[] {
    return apiArray.map((item) => this.fromApi(item));
  }

  static toApi(sda: CreateSdaModel): any {
    return {
      title: sda.title,
      description: sda.description,
      uuidGroup: sda.uuidGroup
    };
  }
}
