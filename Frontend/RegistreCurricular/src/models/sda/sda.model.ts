import { SubjectSda } from '../subject-sda/subject-sda.model';

export class Sda {
  constructor(
    private _sdaUUID: string,
    private _title: string,
    private _description: string,
    private _createdAt: Date,
    private _subjects: SubjectSda[] = []
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

  get subjects(): SubjectSda[] {
    return this._subjects;
  }
  set subjects(value: SubjectSda[]) {
    this._subjects = value;
  }
}
