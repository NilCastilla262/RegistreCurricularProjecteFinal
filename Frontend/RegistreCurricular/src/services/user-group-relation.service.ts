// src/app/services/user-group-relation.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../environments/environment';
import { GroupModel } from '../models/groups/group.model';
import { GroupDTO } from '../models/groups/group.dto';
import { UserModel } from '../models/users/user.model';
import { UserDTO } from '../models/users/user.dto';

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

  getGroupsByUser(userUUID: string): Observable<GroupModel[]> {
    return this.http
      .get<any[]>(`${this.baseUrl}/user/${encodeURIComponent(userUUID)}`)
      .pipe(map(arr => GroupDTO.fromApiArray(arr)));
  }

  getUsersByGroup(groupUUID: string): Observable<UserModel[]> {
    return this.http
      .get<any[]>(`${this.baseUrl}/group/${encodeURIComponent(groupUUID)}`)
      .pipe(map(arr => UserDTO.fromApiArray(arr)));
  }

  addUserToGroup(userUUID: string, groupUUID: string): Observable<void> {
    const payload: RelationPayload = { UUIDUser: userUUID, UUIDGroup: groupUUID };
    return this.http.post<void>(`${this.baseUrl}`, payload);
  }

  removeUserFromGroup(userUUID: string, groupUUID: string): Observable<void> {
    const url = `${this.baseUrl}/${encodeURIComponent(userUUID)}/${encodeURIComponent(groupUUID)}`;
    return this.http.delete<void>(url);
  }
}
