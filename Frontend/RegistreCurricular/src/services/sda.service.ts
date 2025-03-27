// sda.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SdaModel } from '../models/sda/sda.model';
import { SdaDTO } from '../models/sda/sda.dto';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SdaService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getSdaByUUID(uuid: string): Observable<SdaModel> {
    return this.http.get<any>(`${this.baseUrl}/sda/${uuid}`).pipe(
      map(apiResponse => SdaDTO.fromApi(apiResponse))
    );
  }

  createSDA(sda: SdaModel): Observable<any> {
    const body = SdaDTO.toApi(sda);
    return this.http.post(`${this.baseUrl}/sda`, body);
  }

  getAllSdas(): Observable<SdaModel[]> {
    return this.http.get<any[]>(`${this.baseUrl}/sda`).pipe(
      map(apiArray => SdaDTO.fromApiArray(apiArray))
    );
  }
}
