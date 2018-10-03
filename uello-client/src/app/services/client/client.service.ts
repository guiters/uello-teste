import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../../models/client';
import { map } from "rxjs/operators";
import 'rxjs/add/operator/map';


@Injectable({
  providedIn: 'root'
})
export class ClientService {


  api = environment.servidor;
  constructor(private http: HttpClient) { }

  getClients(): Observable<Client[]> {
    return this.http.request<Client[]>('GET', this.api + 'client',
      {
        headers: new HttpHeaders({ 'Authorization': 'Basic ' + environment.apikey })
      });
  }

  createClient(client: Client) {
    return this.http.request('POST', this.api + 'client',
      {
        body: JSON.stringify(client),
        headers: new HttpHeaders({ 'Authorization': 'Basic ' + environment.apikey })
      });
  }

  getClient(id): Observable<Client> {
    return this.http.request<Client>('GET', this.api + 'client?id=' + id,
      {
        headers: new HttpHeaders({ 'Authorization': 'Basic ' + environment.apikey })
      }).map(res => res[0]);
  }

  editClient(client, id) {
    return this.http.request('PUT', this.api + 'client?id=' + id,
      {
        body: client, headers: new HttpHeaders({ 'Authorization': 'Basic ' + environment.apikey })
      });
  }

  deleteClient(id) {
    return this.http.request('DELETE', this.api + 'client?id=' + id,
      {
        headers: new HttpHeaders({ 'Authorization': 'Basic ' + environment.apikey })
      });
  }

}
