// subject-tpl.model.ts
export class SubjectTPLModel {
constructor(
    private _UUID: string,
    private _name: string,
    private _templateName: string,
    private _type: number
) {}

get UUID(): string {
    return this._UUID;
}
get name(): string {
    return this._name;
}
get templateName(): string {
    return this._templateName;
}
get type(): number {
    return this._type;
}
}
  