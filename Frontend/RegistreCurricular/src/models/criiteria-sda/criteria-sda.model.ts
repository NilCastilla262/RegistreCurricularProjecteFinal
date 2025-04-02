export class CriteriaSda {
    constructor(
      private _criteriaUUID: string,
      private _criteriaUUIDTPL: string,
      private _criteriaDescription: string,
      private _criteriaMainOrder: number,
      private _criteriaOrder: number,
      private _criteriaWorked: boolean
    ) {}
  
    get criteriaUUID(): string {
      return this._criteriaUUID;
    }
    set criteriaUUID(value: string) {
      this._criteriaUUID = value;
    }
  
    get criteriaUUIDTPL(): string {
      return this._criteriaUUIDTPL;
    }
    set criteriaUUIDTPL(value: string) {
      this._criteriaUUIDTPL = value;
    }
  
    get criteriaDescription(): string {
      return this._criteriaDescription;
    }
    set criteriaDescription(value: string) {
      this._criteriaDescription = value;
    }
  
    get criteriaMainOrder(): number {
      return this._criteriaMainOrder;
    }
    set criteriaMainOrder(value: number) {
      this._criteriaMainOrder = value;
    }
  
    get criteriaOrder(): number {
      return this._criteriaOrder;
    }
    set criteriaOrder(value: number) {
      this._criteriaOrder = value;
    }
  
    get criteriaWorked(): boolean {
      return this._criteriaWorked;
    }
    set criteriaWorked(value: boolean) {
      this._criteriaWorked = value;
    }
  }
  