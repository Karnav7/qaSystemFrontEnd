import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { baseURL } from '../shared/baseurl';
import { User } from '../shared/user';
import { ProcesshttpmsgService } from './processhttpmsg.service';
import { AuthService } from './auth.service';

import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProfileService {

  uSer: User;

  constructor(
    private http: HttpClient,
    private _http: Http,
    private processHTTPMsgService: ProcesshttpmsgService,
    private authService: AuthService
  ) { }

  updateUser(username, id: string): Observable<User> {
    const authToken = this.authService.getToken();
    //trim first character
    var myString = authToken.substr(1);   // Need to trim first and last character of authToken because it stores in the for ""abc"" which results  in mismatch of token
    //trim last character
    var actual = myString.slice(0, -1);  
    console.log('trimmedToken', actual);

    const Id = id.substr(1);
    const ID = Id.slice(0, -1);

    let headers = new Headers();
    headers.append('Authorization', 'bearer ' + actual);
    console.log(headers);
    console.log('username', username);
    return this._http.put(baseURL + 'users/' + ID, username, {headers: headers})
    .map(res => res.json())
    .catch(error => {
      return this.processHTTPMsgService.handleError(error);
    });
  }
}
