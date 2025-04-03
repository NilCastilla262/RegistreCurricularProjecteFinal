import { SubjectSdaModel } from '../subject-sda/subject-sda.model';

export class SdaModel {
  constructor(
    private _sdaUUID: string,
    private _title: string,
    private _description: string,
    private _createdAt: Date,
    private _uuidGroup: string,
    private _groupName: string,
    private _subjects: SubjectSdaModel[] = []
  ) {}

  get sdaUUID(): string {
    return this._sdaUUID;
  }
  set sdaUUID(value: string) {
    this._sdaUUID = value;
  }

  get title(): string {
    return this._title;
  }
  set title(value: string) {
    this._title = value;
  }

  get description(): string {
    return this._description;
  }
  set description(value: string) {
    this._description = value;
  }

  get createdAt(): Date {
    return this._createdAt;
  }
  set createdAt(value: Date) {
    this._createdAt = value;
  }

  get uuidGroup(): string {
    return this._uuidGroup;
  }
  set uuidGroup(value: string) {
    this._uuidGroup = value;
  }

  get groupName(): string {
    return this._groupName;
  }
  set groupName(value: string) {
    this._groupName = value;
  }

  get subjects(): SubjectSdaModel[] {
    return this._subjects;
  }
  set subjects(value: SubjectSdaModel[]) {
    this._subjects = value;
  }
}
