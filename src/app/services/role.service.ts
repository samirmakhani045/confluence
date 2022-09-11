import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(
    private apiSevice: ApiService
  ) { }

  getAllRole() {
    return this.apiSevice.get(environment.api_url, 'Role/All')
  }

}
