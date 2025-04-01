// sda.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
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

  createSDASubjectRelation(sdaUUID: string, subjectUUIDs: string[]): Observable<any> {
    const payload = {
      uuidSDA: sdaUUID,
      subjectUUIDs: subjectUUIDs
    };
    return this.http.post<any>(`${this.baseUrl}/sda/subject-relation`, payload);
  }
  fillSDA(sdaUUID: string, subjectUUIDs: string[]): Observable<any> {
    const payload = {
      uuidSDA: sdaUUID,
      subjectUUIDs: subjectUUIDs
    };
    return this.http.post<any>(`${this.baseUrl}/sda/fillSDA`, payload);
  }

  createCompleteSDA(sdaUUID: string, subjectUUIDs: string[]): Observable<any> {
    return this.createSDASubjectRelation(sdaUUID, subjectUUIDs).pipe(
      switchMap(() => this.fillSDA(sdaUUID, subjectUUIDs))
    );
  }
}