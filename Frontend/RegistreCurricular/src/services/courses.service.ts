import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, map } from 'rxjs';
import { CourseDTO } from '../models/courses/course.dto';
import { CourseModel } from '../models/courses/course.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getTemplateByCourseName(courseName: string): Observable<CourseModel> {
    return this.http
      .get<{ templateName: string }>(`${this.baseUrl}/courses/${courseName}/template`)
      .pipe(
        map(response => {
          return CourseDTO.fromApi(response, courseName);
        })
      );
  }
}
