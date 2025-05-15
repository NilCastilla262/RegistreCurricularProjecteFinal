// sda.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, switchMap, tap } from 'rxjs';
import { CreateSdaModel } from '../models/create-sda/createSda.model';
import { CreateSdaDTO } from '../models/create-sda/createSda.dto';
import { environment } from '../environments/environment';
import { SdaModel } from '../models/sda/sda.model';
import { SdaDTO } from '../models/sda/sda.dto';

export interface PaginatedResponse<T> {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'ASC' | 'DESC';
  total: number;
  totalPages: number;
  data: T[];
}

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

  getSdas(
    page: number = 1,
    limit: number = 10,
    sortBy: 'title' | 'createdAt' | 'groupName' = 'title',
    sortOrder: 'ASC' | 'DESC' = 'ASC'
  ): Observable<PaginatedResponse<SdaModel>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('sortBy', sortBy)
      .set('sortOrder', sortOrder);

    return this.http
    .get<PaginatedResponse<any>>(`${this.baseUrl}/sda/`, { params })
    .pipe(map(resp => ({
        page: resp.page,
        limit: resp.limit,
        sortBy: resp.sortBy,
        sortOrder: resp.sortOrder,
        total: resp.total,
        totalPages: resp.totalPages,
        data: SdaDTO.fromApiArray(resp.data)
    })));
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

  markCriteria(sdaUUID: string, criteriaUUID: string, competencyUUID: string, worked: boolean): Observable<any> {
    const payload = { uuidSDA: sdaUUID, uuidCriteria: criteriaUUID, uuidCompetency: competencyUUID, worked };
    return this.http.post<any>(`${this.baseUrl}/sda/markCriteria`, payload);
  }

  fillSDA(sdaUUID: string, subjectUUIDs: string[]): Observable<any> {
    const payload = {
      uuidSDA: sdaUUID,
      subjectUUIDs: subjectUUIDs
    };
    return this.http.post<any>(`${this.baseUrl}/sda/fillSDA`, payload);
  }

  getResum(groupUUIDs: string[]): Observable<any> {
    const groupsParam = groupUUIDs.join(',');
    return this.http.get<any>(`${this.baseUrl}/resum?groups=${groupsParam}`);
  }

  createCompleteSDA(sdaUUID: string, subjectUUIDs: string[]): Observable<CreateSdaModel> {
    return this.createSDASubjectRelation(sdaUUID, subjectUUIDs).pipe(
      switchMap(() => this.fillSDA(sdaUUID, subjectUUIDs)),
    );
  }
}
