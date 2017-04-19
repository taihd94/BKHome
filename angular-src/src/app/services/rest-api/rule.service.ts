import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';
import { environment } from '../../../environments/environment';

@Injectable()
export class RuleService {
  authToken: any;
  baseURL = environment.baseURL;

  constructor(private http:Http) { }
  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  getListOfRules(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.baseURL + '/rules', {headers: headers})
      .map(res => res.json());
  }

  getRelationalOperation(id){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.baseURL + '/rules/relational-operation/' + id, {headers: headers})
      .map(res => res.json());
  }

  getLogicalOperation(id){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.baseURL + '/rules/logical-operation/' + id, {headers: headers})
      .map(res => res.json());
  }

  getOperation(id){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.baseURL + '/rules/operation/' + id, {headers: headers})
      .map(res => res.json());
  }
}
