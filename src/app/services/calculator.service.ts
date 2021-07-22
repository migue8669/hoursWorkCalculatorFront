import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Calculator } from '../model/Calculator.model';
import { Report } from '../model/Report.model';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  baseUrl = 'http://localhost:8080/reportWeekly';

  constructor(private http: HttpClient) { }
  getAll(): Observable<any> {
    return this.http.get(this.baseUrl);
    
  }

  get(id:Calculator,weekNum:any): Observable<any> {
    console.log(id,weekNum)
    return this.http.get(`${this.baseUrl}/${id}`,weekNum);
  }

  create(data:Calculator): Observable<any> {
    console.log(data)
    return this.http.post(this.baseUrl, data);
  }

  update(id:Calculator, data:Calculator): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  delete(id:Calculator): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.baseUrl);
  }}
