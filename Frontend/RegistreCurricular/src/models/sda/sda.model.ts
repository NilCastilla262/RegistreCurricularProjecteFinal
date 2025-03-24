// sda.model.ts
export class SdaModel {
    constructor(
      private _title: string = '',
      private _description: string = '',
      private _groupUUID: string = '',
      private _subjectUUIDs: string[] = []
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
  
    get groupUUID(): string {
      return this._groupUUID;
    }
    set groupUUID(value: string) {
      this._groupUUID = value;
    }
  
    get subjectUUIDs(): string[] {
      return this._subjectUUIDs;
    }
    set subjectUUIDs(values: string[]) {
      this._subjectUUIDs = values;
    }
  }
  