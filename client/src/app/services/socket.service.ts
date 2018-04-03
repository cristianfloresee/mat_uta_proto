import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//OBSERVABLES
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
//SOCKET.IO
import * as io from 'socket.io-client';
const SERVER_URL = 'https://146.83.108.235:3002';

@Injectable()
export class SocketService {
   private socket;

   constructor(private client: HttpClient) { }

   public initSocket(): void {
      this.socket = io(SERVER_URL);
   }

   public getMatriculas(): Promise<any> {
      return this.client
         .get<any>(`${SERVER_URL}/api/matriculas`)
         .toPromise()
         .then((response) => {
            return response
         })
         .catch(this.handleError);
   }


   public onChange(): Observable<any> {
      return new Observable<any>(observer => {
         this.socket.on('change_matriculas', (data) => observer.next(data));
      });
   }

   private handleError(error: any): Promise<any> {
      console.error('An error occurred', error);
      return Promise.reject(error.message || error);
   }
}
