import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private apiSevice: ApiService
  ) { }

  login(data: any) {
    return this.apiSevice.post(environment.api_url, 'Users/Login', data)
  }

  getAllUser() {
    return this.apiSevice.get(environment.api_url, 'Users/All')
  }

  getById(id : string) {
    return this.apiSevice.get(environment.api_url, `Users/${id}`)
  }

  update(id: string, data: any) {
    return this.apiSevice.put(environment.api_url, `Users/${id}`, data);
  }

  deleteUser(id: string) {
    return this.apiSevice.delete(environment.api_url, `Users/${id}`);
  }

  save(data: any) {
    return this.apiSevice.post(environment.api_url, `Users`, data);
  }
}
