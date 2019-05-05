import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from "../app.settings";

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private httpClient: HttpClient){}

  getShows(){
    return this.httpClient.get(AppSettings.baseAPIUrl + '/shows');
  }

  getDates(data: any){
    return this.httpClient.post(AppSettings.baseAPIUrl + '/dates', data);
  }

  getDemos(data: any){
    return this.httpClient.post(AppSettings.baseAPIUrl + '/demos', data);
  }

  getCategories(data: any){
    return this.httpClient.post(AppSettings.baseAPIUrl + '/categories', data);
  }

  getData(data: any){
    return this.httpClient.post(AppSettings.baseAPIUrl + '/data', data);
  }

}
