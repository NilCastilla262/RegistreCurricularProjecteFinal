import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { UserModel } from '../models/users/user.model';
import { UserDTO } from '../models/users/user.dto';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getUsersByCenter(): Observable<UserModel[]> {
    return this.http
      .get<any[]>(`${this.baseUrl}/users/center`)
      .pipe(
        map(apiArray => UserDTO.fromApiArray(apiArray))
      );
  }

  addUserToCenter(userEmail: string, role: number): Observable<void> {
    return this.http
      .post<void>(`${this.baseUrl}/user-center-relations`, {
        UserEmail: userEmail,
        Role: role
      });
  }
}
