import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class HouseService {
  authToken: any;
  user: any;

  constructor(private http:Http) { }

  getHouse(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('/house/floors/getfloors', {headers: headers})
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
    return this.http.post('/house/floors/addfloor', floor, {headers: headers})
      .map(res => res.json());
  }

  deleteFloor(floor){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('/house/floors/deletefloor', floor, {headers: headers})
      .map(res => res.json());
  }

  getRooms(floorId){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('/house/floors/' + floorId + '/getrooms', {headers: headers})
      .map(res => res.json());
  }

  deleteRoom(id){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('/house/rooms/deleteroom', id, {headers: headers})
      .map(res => res.json());
  }

  addRoom(room){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('/house/rooms/addroom', room, {headers: headers})
      .map(res => res.json());
  }

  updateImgPath(query){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('/house/rooms/updateimg', query, {headers: headers})
      .map(res => res.json());
  }

}
