import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  loginWithGoogle(idToken: string): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/auth/google-login`, { idToken });
  }
}
