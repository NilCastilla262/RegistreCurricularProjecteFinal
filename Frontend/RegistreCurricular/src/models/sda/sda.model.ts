// sda.model.ts
export class SdaModel {
  constructor(
    private _title: string = '',
    private _description: string = '',
    private _uuidGroup: string = ''
  ) {}

  get title(): string {
    return this._title;
  }
  set title(value: string) {
    if (!value.trim()) {
      throw new Error('El títol no pot estar buit');
    }
    this._title = value;
  }

  get description(): string {
    return this._description;
  }
  set description(value: string) {
    this._description = value;
  }

  get uuidGroup(): string {
    return this._uuidGroup;
  }
  set uuidGroup(value: string) {
    this._uuidGroup = value;
  }
}
