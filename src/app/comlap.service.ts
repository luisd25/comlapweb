import { Injectable } from '@angular/core';
import { Http, Response,Headers,RequestOptions,URLSearchParams   } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class ComlapService {
    url:string = 'http://comlap.azurewebsites.net/tables/';
  constructor (
    private http: Http
  ) {}

  getList(object: string, 
          filter: any = null,
          operator:any = null,
          value:any = null) {
          let queryParams : string[] = [];
          let query: string = '';

        if (filter){
            queryParams.push("$filter="+filter+"%20"+operator+"%20"+"'"+ value+"'");
        }
        if (queryParams.length > 0){
            query = '?' + queryParams.join('&');
        }
        // console.log( query);
        return this.http.get(this.url + object + query, {
                        headers: this.authHeader
                    })
                    .retry(3)
                    .map((res:Response) => res.json())
  }

  public create(object: string, item: any, returnObject: boolean = false) {
 
        let bodyString = JSON.stringify(item); // Stringify payload
        // let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: this.authHeader }); // Create a request options
        
        return this.http.post(this.url + object, bodyString, options) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }

    public update(object: string, id: string, item: any, deep: boolean = false, returnObject: boolean = false) {
        let data: string = JSON.stringify(item);
        let query: string = '';
        if (returnObject){
            query += 'returnObject=true';
        }
        if (deep){
            query += query ? '&deep = true' : 'deep=true';
        }


        return this.http.patch(this.url + object + '/' + id + (query ? '?' + query : ''), data,
            {
                headers: this.authHeader
            })
            .retry(3)
            .map((res:Response) => res.json())         
    }          
    

  private get authHeader() {
        var authHeader = new Headers();
        authHeader.append('ZUMO-API-VERSION','2.0.0');
        authHeader.append('Accept','application/json');
        authHeader.append('Content-Type','application/json');
        return authHeader;
    
  }
  public logError(err) {
        console.error('Error: ' + err);
    }

}