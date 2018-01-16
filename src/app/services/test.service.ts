import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { baseURL } from '../shared/baseurl';
import { User } from '../shared/user';
import { Test } from '../shared/test';
import { ProcesshttpmsgService } from './processhttpmsg.service';
import { AuthService } from './auth.service';

import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';

@Injectable()
export class TestService {

  test: Test;
  user: User;

  constructor(
    private _http: Http,
    private processHTTPMsgService: ProcesshttpmsgService,
    private authService: AuthService
  ) { }

  postTest(test: Test): Observable<Test> {
    const authToken = this.authService.getToken();
    console.log(authToken);
    //trim first character
    let myString = authToken.substr(1);   // Need to trim first and last character of authToken because it stores in the for ""abc"" which results  in mismatch of token
    //trim last character
    var actual = myString.slice(0, -1);  
    console.log(authToken);
    let headers = new Headers();
    headers.append('Authorization', 'bearer ' + actual);
    console.log(headers);

    return this._http.post(baseURL + 'tests', test, {headers: headers})
    .map(res => res.json())
    .catch(error => {
      return this.processHTTPMsgService.handleError(error);
    });
  }

  getTestbyId(testId): Observable<Test> {
    const authToken = this.authService.getToken();
    console.log(authToken);
    //trim first character
    let myString = authToken.substr(1);   // Need to trim first and last character of authToken because it stores in the for ""abc"" which results  in mismatch of token
    //trim last character
    var actual = myString.slice(0, -1);  
    console.log(authToken);
    let headers = new Headers();
    headers.append('Authorization', 'bearer ' + actual);
    console.log(headers);

    return this._http.get(baseURL + 'tests/' + testId,  {headers: headers})
    .map(res => res.json())
    .catch(error => {
      return this.processHTTPMsgService.handleError(error);
    });
  }

  getTestbyUid(uId): Observable<Test[]> {
    const authToken = this.authService.getToken();
    console.log(authToken);
    //trim first character
    let myString = authToken.substr(1);   // Need to trim first and last character of authToken because it stores in the for ""abc"" which results  in mismatch of token
    //trim last character
    var actual = myString.slice(0, -1);  
    console.log(authToken);
    let headers = new Headers();
    headers.append('Authorization', 'bearer ' + actual);
    console.log(headers);

    return this._http.get(baseURL + 'tests?uId=' + uId,  {headers: headers})
    .map(res => res.json())
    .catch(error => {
      return this.processHTTPMsgService.handleError(error);
    });
  }
}
