// subjects.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, map } from 'rxjs';
import { SubjectModel } from '../models/subjects/subject.model';
import { SubjectDTO } from '../models/subjects/subject.dto';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getSubjectsByTemplate(templateName: string): Observable<SubjectModel[]> {
    return this.http
      .get<any[]>(`${this.baseUrl}/subjects?templateName=${templateName}`)
      .pipe(
        map(apiArray => SubjectDTO.fromApiArray(apiArray))
      );
  }
}
