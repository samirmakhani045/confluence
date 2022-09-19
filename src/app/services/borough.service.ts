import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class BoroughService {

  constructor(
    private apiSevice: ApiService
  ) { }

  getAllBorough(){
    return this.apiSevice.get(environment.api_url, 'Borough/GetBorough')
  }
}
