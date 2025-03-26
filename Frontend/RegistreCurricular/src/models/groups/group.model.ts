// group.model.ts
export class GroupModel {
  constructor(
    private _uuid: string,
    private _name: string,
    private _centerName: string,
    private _courseName: string,
    private _year: string
  ) {}

  get uuid(): string {
    return this._uuid;
  }
  set uuid(value: string) {
    this._uuid = value;
  }

  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }

  get centerName(): string {
    return this._centerName;
  }
  set centerName(value: string) {
    this._centerName = value;
  }

  get courseName(): string {
    return this._courseName;
  }
  set courseName(value: string) {
    this._courseName = value;
  }

  get year(): string {
    return this._year;
  }
  set year(value: string) {
    this._year = value;
  }
}

  