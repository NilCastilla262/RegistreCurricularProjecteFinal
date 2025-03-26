export class CourseModel {
    constructor(
      private _name: string,
      private _templateName: string
    ) {}
  
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
}
  