import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiRequestService {
  constructor(private http: HttpClient) {}

  /**
   *  Return request POST
   * @param url
   * @param obj
   * @returns
   */
  post<T>(url: string, obj: any): Observable<T> {
    return this.http.post<T>(url, obj, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8',
      }),
    });
  }
  public postNew<T>(url: string, obj: any): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.http.post<T>(url, obj, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8',
        }),
      }).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  
  /**
   *  Return request PUT
   * @param url
   * @param obj
   * @returns
   */
  put<T>(url: string, obj: any): Observable<T> {
    return this.http.put<T>(url, obj, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8',
      }),
    });
  }

  /**
   *  Return request DELETE
   * @param url
   * @returns
   */
  delete<T>(url: string): Observable<any> {
    return this.http.delete<T>(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8',
      }),
    });
  }

  /**
   * Return request GET
   * @param url
   * @param obj
   * @returns
   */
  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8',
      }),
    });
  }

  /**
   * Return request GET
   * @param url
   * @param obj
   * @returns
   */
  getPIM<T>(url: string): Observable<T> {
    return this.http.get<T>(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization:
          'Basic ' + window.btoa('API DATALOG' + ':' + 'Datalog23'),
      }),
    });
  }
}
