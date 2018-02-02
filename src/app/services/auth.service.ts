import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { baseURL } from '../shared/baseurl';
import { User } from '../shared/user';
import { PassResetCode } from '../shared/passresetcode';
import { Mail } from '../shared/mail';
import { ProcesshttpmsgService } from './processhttpmsg.service';

import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';

interface JWTResponse {
  status: string;
  success: string;
  user: any;
};

interface AuthResponse {
  status: string;
  success: string;
  token: string;
};

@Injectable()
export class AuthService {

  tokenKey: string = 'JWT';
  isAuthenticated: Boolean = false;
  authToken: string = undefined;
  uSer: User;
  user: any;

  constructor(
    private http: HttpClient,
    private _http: Http,
    private processHTTPMsgService: ProcesshttpmsgService
  ) { }

  // checkJWTtoken() {
  //   this.http.get<JWTResponse>('http://localhost:3000/users/checkJWTtoken')
  //   .subscribe(res => {
  //     console.log("JWT Token Valid: ", res);
  //     //this.sendUsername(res.user.username);
  //   },
  //   err => {
  //     console.log("JWT Token invalid: ", err);
  //     this.destroyUserCredentials();
  //   })
  // }

  // loadUserCredentials() {
  //   var credentials = JSON.parse(localStorage.getItem(this.tokenKey));
  //   console.log("loadUserCredentials ", credentials);
  //   if (credentials && credentials.username != undefined) {
  //     this.useCredentials(credentials);
  //     if (this.authToken)
  //       this.checkJWTtoken();
  //   }
  // }

  storeUserData(token, user, Id) {
    localStorage.setItem('jwt', JSON.stringify(token));
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('Id', JSON.stringify(Id));
    this.authToken = token;
    this.user = user;
  }

  // useCredentials(credentials: any) {
  //   this.isAuthenticated = true;
  //   this.sendUsername(credentials.username);
  //   this.authToken = credentials.token;
  // }

  // destroyUserCredentials() {
  //   this.authToken = undefined;
  //   this.clearUsername();
  //   this.isAuthenticated = false;
  //   localStorage.removeItem(this.tokenKey);
  // }

  signUp(user: any): Observable<any> {
    return this.http.post(baseURL + 'users/signup', user)
      // {"firstname": user.firstname, "lastname": user.lastname, "username": user.username, "password": user.password})
      .catch(error => { return this.processHTTPMsgService.handleError(error); });  
  }

  logIn(user: any): Observable<any> {
    return this.http.post<AuthResponse>(baseURL + 'users/login',
      {"username": user.username, "password": user.password})
      //user)
      /*.map(res => {
        this.storeUserCredentials({user: user, token: res.token});
        return {'success': true, 'user': user };
      })*/
      .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  //Get a particular user by user name
  getUser(username: string): Observable<User> {
    return this.http.get(baseURL + 'users?username='+username)
    .catch( error => {
      return this.processHTTPMsgService.handleError(error);
    });
  }

  //Get user by id
  getUserById(id: string): Observable<User> {
    const authToken = this.getToken();
    //trim first character
    var myString = authToken.substr(1);   // Need to trim first and last character of authToken because it stores in the for ""abc"" which results  in mismatch of token
    //trim last character
    var actual = myString.slice(0, -1);  
    console.log(authToken);
    let headers = new Headers();
    headers.append('Authorization', 'bearer ' + actual);
    console.log(headers);

    //trim Id
    var tempId = id.substr(1);
    var Id = tempId.slice(0, -1);

    return this._http.get(baseURL + 'users/' + Id, {headers: headers})
    .map(res => res.json())
    .catch( error => {
      return this.processHTTPMsgService.handleError(error);
    });
  }

  //Get all users
  getUsers(): Observable<User[]> {
    const authToken = this.getToken();
    //trim first character
    var myString = authToken.substr(1);   // Need to trim first and last character of authToken because it stores in the for ""abc"" which results  in mismatch of token
    //trim last character
    var actual = myString.slice(0, -1);  
    console.log(authToken);
    let headers = new Headers();
    headers.append('Authorization', 'bearer ' + actual);
    console.log(headers);

    return this._http.get(baseURL + 'users', {headers: headers})
    .map(res => res.json())
    .catch(error => {
      return this.processHTTPMsgService.handleError(error);
    });    
  }

  //Get user by usertype
  getSelectedUsers(usertype: string): Observable<User[]> {

    const authToken = this.getToken();
    //trim first character
    var myString = authToken.substr(1);   // Need to trim first and last character of authToken because it stores in the for ""abc"" which results  in mismatch of token
    //trim last character
    var actual = myString.slice(0, -1);  
    console.log(authToken);
    let headers = new Headers();
    headers.append('Authorization', 'bearer ' + actual);
    console.log(headers);

    return this._http.get(baseURL + 'users?usertype='+usertype, {headers: headers})
    .map(res => res.json())
    .catch(error => {
      return this.processHTTPMsgService.handleError(error);
    });
  }

  //Update User Role
  updateUser(id: string, data: User): Observable<User> {
    const authToken = this.getToken();
    //trim first character
    var myString = authToken.substr(1);   // Need to trim first and last character of authToken because it stores in the for ""abc"" which results  in mismatch of token
    //trim last character
    var actual = myString.slice(0, -1);  
    console.log(authToken);
    let headers = new Headers();
    headers.append('Authorization', 'bearer ' + actual);
    console.log(headers);
    console.log(id);
    console.log(JSON.stringify(data));

    return this._http.put(baseURL + 'users/' + id, data, {headers: headers})
    .map(res => res.json())
    .catch(error => {
      return this.processHTTPMsgService.handleError(error);
    });
  }

  //Delete User by UserId
  deleteUser(id: string): Observable<User[]> {
    const authToken = this.getToken();
    //trim first character
    var myString = authToken.substr(1);   // Need to trim first and last character of authToken because it stores in the for ""abc"" which results  in mismatch of token
    //trim last character
    var actual = myString.slice(0, -1);  
    console.log(authToken);
    let headers = new Headers();
    headers.append('Authorization', 'bearer ' + actual);
    console.log(headers);
    console.log(id);

    return this._http.delete(baseURL + 'users/' + id, {headers: headers})
    .map(res => res.json())
    .catch(error => {
      return this.processHTTPMsgService.handleError(error);
    });
  }

  getToken(): string {
    const token = localStorage.getItem('jwt');
    return token;
  }

  findEmailId(emailid): Observable<User[]> {
    console.log(emailid);
    return this._http.get(baseURL + 'users?email_id=' + emailid)
    .map(res => res.json())
    .catch(error => {
      return this.processHTTPMsgService.handleError(error);
    });
  }

  genPassResetCode(gencode: PassResetCode): Observable<PassResetCode> {

    return this._http.post(baseURL + 'resetpassword', gencode)
    .map(res => res.json())
    .catch(error => {
      return this.processHTTPMsgService.handleError(error);
    });
  }

  getVerificationCode(): Observable<PassResetCode> {
    return this._http.get(baseURL + 'resetpassword')
    .map(res => res.json())
    .catch(error => {
      return this.processHTTPMsgService.handleError(error);
    });
  }

  deleteVerificationCode(): Observable<PassResetCode> {
    return this._http.delete(baseURL + 'resetpassword')
    .map(res => res.json())
    .catch(error => {
      return this.processHTTPMsgService.handleError(error);
    });
  }

  sendMail(user: User, mail: Mail): Observable<Mail> {
    let params = new HttpParams();
    params.set('subject', mail.subject);
    params.set('message', mail.message);

    // console.log("problemservice user", user);
    return this._http.post(baseURL + 'mail?subject=' + mail.subject + '&message=' + mail.message, user, {params: params})
    .map(res => res.json())
    .catch(error => {
      return this.processHTTPMsgService.handleError(error);
    });
  }

  isLoggedIn(): Boolean {
    return this.isAuthenticated;
  }

}
