// subject-tpl.model.ts
export class SubjectModel {
    constructor(
      private _uuid: string,
      private _name: string,
      private _templateName: string,
      private _type: number
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
  
    get templateName(): string {
      return this._templateName;
    }
    set templateName(value: string) {
      this._templateName = value;
    }
  
    get type(): number {
      return this._type;
    }
    set type(value: number) {
      this._type = value;
    }
} 