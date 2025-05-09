export class UserModel {
  constructor(
    private _uuid: string,
    private _name: string | null,
    private _email: string,
    private _role: number
  ) {}

  get uuid(): string {
    return this._uuid;
  }
  set uuid(value: string) {
    this._uuid = value;
  }

  get name(): string | null {
    return this._name;
  }
  set name(value: string | null) {
    this._name = value;
  }

  get email(): string {
    return this._email;
  }
  set email(value: string) {
    this._email = value;
  }

  get role(): number {
    return this._role;
  }
  set role(value: number) {
    this._role = value;
  }
}
