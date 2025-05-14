// src/app/services/user-group-relation.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

interface RelationPayload {
  UUIDUser: string;
  UUIDGroup: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserGroupRelationService {
  private baseUrl = `${environment.baseUrl}/user-group-relations`;

  constructor(private http: HttpClient) {}

  getGroupsByUser(userUUID: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/user/${encodeURIComponent(userUUID)}`);
  }

  getUsersByGroup(groupUUID: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/group/${encodeURIComponent(groupUUID)}`);
  }

  addUserToGroup(userUUID: string, groupUUID: string): Observable<void> {
    const payload: RelationPayload = { UUIDUser: userUUID, UUIDGroup: groupUUID };
    return this.http.post<void>(`${this.baseUrl}`, payload);
  }

  removeUserFromGroup(userUUID: string, groupUUID: string): Observable<void> {
    return this.http.delete<void>(`
      ${this.baseUrl}/${encodeURIComponent(userUUID)}/${encodeURIComponent(groupUUID)}`.replace(/\s+/g, ''));
  }
}
