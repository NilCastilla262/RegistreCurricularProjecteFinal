import { CompetencieSdaModel } from '../competencie-sda/competencie-sda.model';

export class SubjectSdaModel {
  constructor(
    private _subjectUUID: string,
    private _subjectName: string,
    private _subjectTemplate: string,
    private _subjectType: string,
    private _competencies: CompetencieSdaModel[] = [],
    public expanded: boolean = true
  ) {}

  get subjectUUID(): string {
    return this._subjectUUID;
  }
  set subjectUUID(value: string) {
    this._subjectUUID = value;
  }

  get subjectName(): string {
    return this._subjectName;
  }
  set subjectName(value: string) {
    this._subjectName = value;
  }

  get subjectTemplate(): string {
    return this._subjectTemplate;
  }
  set subjectTemplate(value: string) {
    this._subjectTemplate = value;
  }

  get subjectType(): string {
    return this._subjectType;
  }
  set subjectType(value: string) {
    this._subjectType = value;
  }

  get competencies(): CompetencieSdaModel[] {
    return this._competencies;
  }
  set competencies(value: CompetencieSdaModel[]) {
    this._competencies = value;
  }
}
