
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = '';
  private token: any = '';
  constructor(
    private http: HttpClient
  ) { }

  private truncateEndSlash(baseUrl: any) {
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
    let urlString: string;
    let userInfo: any = localStorage.getItem('userInfo');
    if (userInfo) {
      userInfo = JSON.parse(userInfo)
      this.token = userInfo.token;
    }
    if (resource.startsWith('http')) {
      urlString = resource;
    } else {
      urlString = `${this.truncateEndSlash(this.baseUrl)}/${resource}`
    }
    const headers = {
      'Authorization': `Bearer ${this.token}`
    }

    return this.http.get<T>(
      urlString,
      { headers: new HttpHeaders(headers) }
    );
  }

  post<T>(baseUrl: string, resource: string, param: any): Observable<T> {
    this.baseUrl = baseUrl;
    let urlString: string;
    let userInfo: any = localStorage.getItem('userInfo');
    if (userInfo) {
      userInfo = JSON.parse(userInfo)
      this.token = userInfo.token;
    }
    if (resource.startsWith('http')) {
      urlString = resource;
    } else {
      urlString = `${this.truncateEndSlash(this.baseUrl)}/${resource}`
    }
    const headers = {
      'Authorization': `Bearer ${this.token}`
    }

    return this.http.post<T>(
      urlString,
      param,
      { headers: new HttpHeaders(headers) }
    );
  }

  put<T>(baseUrl: string, resource: string, param: any): Observable<T> {
    this.baseUrl = baseUrl;
    let urlString: string;
    let userInfo: any = localStorage.getItem('userInfo');
    if (userInfo) {
      userInfo = JSON.parse(userInfo)
      this.token = userInfo.token;
    }
    if (resource.startsWith('http')) {
      urlString = resource;
    } else {
      urlString = `${this.truncateEndSlash(this.baseUrl)}/${resource}`
    }
    const headers = {
      'Authorization': `Bearer ${this.token}`
    }
    return this.http.put<T>(
      urlString,
      param,
      { headers: new HttpHeaders(headers) }
    );
  }

  delete<T>(baseUrl: string, resource: string): Observable<T> {
    this.baseUrl = baseUrl;
    let urlString: string;
    let userInfo: any = localStorage.getItem('userInfo');
    if (userInfo) {
      userInfo = JSON.parse(userInfo)
      this.token = userInfo.token;
    }
    if (resource.startsWith('http')) {
      urlString = resource;
    } else {
      urlString = `${this.truncateEndSlash(this.baseUrl)}/${resource}`
    }
    const headers = {
      'Authorization': `Bearer ${this.token}`
    }
    return this.http.delete<T>(
      urlString,
      { headers: new HttpHeaders(headers) }
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
