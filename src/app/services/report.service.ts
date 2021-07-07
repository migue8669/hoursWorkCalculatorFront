import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Report } from '../model/Report.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  baseUrl = 'http://localhost:3000/report';

  constructor(private http: HttpClient) { }
  getAll(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  get(id:any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  create(data:Report): Observable<any> {
    console.log(data)
    return this.http.post(this.baseUrl, data);
  }

  update(id:any, data:Report): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  delete(id:Report): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.baseUrl);
  }}
