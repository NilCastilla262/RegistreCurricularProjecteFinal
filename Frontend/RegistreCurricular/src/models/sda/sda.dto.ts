// sda.dto.ts
import { SdaModel } from './sda.model';

export class SdaDTO {

  static fromApi(apiData: any): SdaModel {
    return new SdaModel(
      apiData.title,
      apiData.description,
      apiData.groupUUID,
      apiData.subjects || []
    );
  }


  static fromApiArray(apiArray: any[]): SdaModel[] {
    return apiArray.map((item) => this.fromApi(item));
  }


  static toApi(sda: SdaModel): any {
    return {
      title: sda.title,
      description: sda.description,
      groupUUID: sda.groupUUID,
      subjects: sda.subjectUUIDs
    };
  }
}
