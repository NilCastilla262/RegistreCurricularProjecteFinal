import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.baseUrl;
  private tokenKey = 'token';

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
  constructor(private http: HttpClient) {}

  loginWithGoogle(idToken: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/google-login`, { idToken });
  }

  chooseCenter(uuid: string, centerName: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/choose-center`, { uuid, centerName });
  }

  listMyCenters(): Observable<{ centerName: string; role: number }[]> {
    return this.http.get<{ centerName: string; role: number }[]>(
      `${this.baseUrl}/auth/my-centers`
    );
  }

    chooseCenterProtected(centerName: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(
      `${this.baseUrl}/auth/choose-center-protected`,
      { centerName }
    );
  }
}
