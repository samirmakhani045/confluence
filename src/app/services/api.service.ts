
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = '';
  constructor(
    private http: HttpClient
  ) { }

  private truncateEndSlash(baseUrl:any) {
    if (baseUrl.endsWith('/')) {
      baseUrl = baseUrl.slice(0, -1);
    }
    return baseUrl;
  }

  private getBody(param: any): string {
    return JSON.stringify(param);
  }


  get<T>(baseUrl: string, resource: string): Observable<T> {
    this.baseUrl = baseUrl;
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials':'true',
      'Access-Control-Allow-Methods': '*'
    }
   
    return this.http.get<T>(
      `${this.truncateEndSlash(this.baseUrl)}/${resource}`,
      {headers: new HttpHeaders(headers)}
    );
  }

  post<T>(baseUrl: string, resource: string, param: any): Observable<T> {    
    this.baseUrl = baseUrl;
    let urlString : string;
    if(resource.startsWith('http'))
    {
      urlString = resource;
    }
    else{
      urlString = `${this.truncateEndSlash(this.baseUrl)}/${resource}`
    }
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials':'true',
      'Access-Control-Allow-Methods': '*'
    }

    const body = this.getBody(param);
    return this.http.post<T>(
      urlString,
      body,
      { headers: new HttpHeaders(headers) }
    );
  }

  put<T>(baseUrl: string, resource: string, param: any): Observable<T> {
    this.baseUrl = baseUrl;
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials':'true',
      'Access-Control-Allow-Methods': '*'
    }
    const body = this.getBody(param);
    return this.http.put<T>(
      `${this.truncateEndSlash(this.baseUrl)}/${resource}`,
      body,
      { headers: new HttpHeaders(headers) }
    );
  }

  delete<T>(baseUrl: string, resource: string): Observable<T> {
    this.baseUrl = baseUrl;
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials':'true',
      'Access-Control-Allow-Methods': '*'
    }

    const options = {
      headers: headers
    }
    return this.http.delete<T>(
      `${this.truncateEndSlash(this.baseUrl)}/${resource}`, options
    );
  }

  patch<T>(baseUrl: string, resource: string, param: any): Observable<T> {
    this.baseUrl = baseUrl;
    const body = this.getBody(param);
    return this.http.patch<T>(
      `${this.truncateEndSlash(this.baseUrl)}/${resource}`,
      body
    );
  }
}
