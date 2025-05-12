import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

interface CreatePayload {
  UserEmail: string;
  Role: number;
}
interface UpdatePayload {
  UserEmail: string;
  Role: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserCenterRelationService {
  private baseUrl = `${environment.baseUrl}/user-center-relations`;

  constructor(private http: HttpClient) {}

  addUserToCenter(email: string, role: number): Observable<void> {
    const payload: CreatePayload = { UserEmail: email, Role: role };
    return this.http.post<void>(`${this.baseUrl}`, payload);
  }

  updateRole(email: string, role: number): Observable<void> {
    const payload: UpdatePayload = { UserEmail: email, Role: role };
    return this.http.put<void>(`${this.baseUrl}`, payload);
  }

  deleteRelation(email: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${encodeURIComponent(email)}`);
  }
}
