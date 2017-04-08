import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';
import { environment } from '../../../environments/environment';

@Injectable()
export class SceneService {
  authToken: any;
  baseURL = environment.baseURL;

  constructor(private http:Http) { }

  getListOfScenes(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.baseURL + '/scenes', {headers: headers})
      .map(res => res.json());
  }


  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
}
