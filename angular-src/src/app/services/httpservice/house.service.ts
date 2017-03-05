import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';
import { environment } from '../../../environments/environment';

@Injectable()
export class HouseService {
  authToken: any;
  baseURL = environment.baseURL;

  constructor(private http:Http) { }

  getHouse(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.baseURL + '/house/floors/getfloors', {headers: headers})
      .map(res => res.json());
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  addFloor(floor){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseURL + '/house/floors/addfloor', floor, {headers: headers})
      .map(res => res.json());
  }

  deleteFloor(floor){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseURL + '/house/floors/deletefloor', floor, {headers: headers})
      .map(res => res.json());
  }

  getRooms(floorId){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.baseURL + '/house/floors/' + floorId + '/getrooms', {headers: headers})
      .map(res => res.json());
  }

  deleteRoom(id){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseURL + '/house/rooms/deleteroom', id, {headers: headers})
      .map(res => res.json());
  }

  addRoom(room){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseURL + '/house/rooms/addroom', room, {headers: headers})
      .map(res => res.json());
  }

  updateImgPath(query){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseURL + '/house/rooms/updateimg', query, {headers: headers})
      .map(res => res.json());
  }

}
