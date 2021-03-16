import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })

export class RestService {
    private httpOptions = {
        headers: new HttpHeaders()
    };

    constructor(private http: HttpClient) {
    }
  /**
   * Call Get RestService methods endpoints exposed
   * by WebServer
   * @param url - "{ControllerName}/{ActionMethod}"
   */
    public httpGet<T>(url: string, contentType: string = 'application/json'): Observable<T> {
        const headerOption = { headers: new HttpHeaders() };
        Object.assign(headerOption, this.httpOptions);
        headerOption.headers = headerOption.headers.append('Content-Type', contentType);
        if (false) {
            headerOption.headers = headerOption.headers.set('', '');
        }
        return this.http.get<T>(`${environment.baseUrl}${url}`, headerOption);
    }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - Name of the operation that failed
   * @param result - optional value to return as the observable result
   */

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
          // TODO: send the error to remote logging infrastructure
          console.error(error); // log to console instead
          // TODO: better job of transforming error for user consumption
          this.log(`${operation} failed: ${error.message}`);
          // Let the app keep running by returning an empty result.
          throw error;
        };
    }

    private log(message: string) {
      console.log(message);
    }
}
