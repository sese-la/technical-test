import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  URL_API = 'https://jsonplaceholder.typicode.com/';
  constructor(private http: HttpClient) {}

  httpOption = {
    headers: new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    ),
  };

  sendData(rep: HttpParams): Observable<any> {
    return this.http.post(this.URL_API + 'todos', rep, this.httpOption);
  }
}
