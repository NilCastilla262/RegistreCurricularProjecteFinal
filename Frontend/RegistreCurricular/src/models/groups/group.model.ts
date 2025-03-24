// group.model.ts
export class GroupModel {
    constructor(
      private _UUID: string,
      private _name: string,
      private _courseName: string
    ) {}
  
    get UUID(): string {
      return this._UUID;
    }
    get name(): string {
      return this._name;
    }
    get courseName(): string {
      return this._courseName;
    }
  }
  