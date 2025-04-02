// sda.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap, tap } from 'rxjs';
import { CreateSdaModel } from '../models/create-sda/createSda.model';
import { CreateSdaDTO } from '../models/create-sda/createSda.dto';
import { environment } from '../environments/environment';
import { SdaModel } from '../models/sda/sda.model';
import { SdaDTO } from '../models/sda/sda.dto';

@Injectable({
  providedIn: 'root'
})
export class SdaService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getSdaByUUID(uuid: string): Observable<SdaModel> {
    return this.http.get<any>(`${this.baseUrl}/sda/full/${uuid}`).pipe(
      map(apiResponse => SdaDTO.fromApi(apiResponse))
    );
  }

  getAllSdas(): Observable<SdaModel[]> {
    return this.http.get<any[]>(`${this.baseUrl}/sda`).pipe(
      map(apiArray => SdaDTO.fromApiArray(apiArray))
    );
  }

  createSDA(sda: CreateSdaModel): Observable<any> {
    const body = CreateSdaDTO.toApi(sda);
    return this.http.post(`${this.baseUrl}/sda`, body);
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

  createCompleteSDA(sdaUUID: string, subjectUUIDs: string[]): Observable<CreateSdaModel> {
    return this.createSDASubjectRelation(sdaUUID, subjectUUIDs).pipe(
      switchMap(() => this.fillSDA(sdaUUID, subjectUUIDs)),
    );
  }
}