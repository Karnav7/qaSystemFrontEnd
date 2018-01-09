import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { baseURL } from '../shared/baseurl';
import { User } from '../shared/user';
import { QuestionSet, Question, Option } from '../shared/questionset';
import { ProcesshttpmsgService } from './processhttpmsg.service';
import { AuthService } from './auth.service';

import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';

@Injectable()
export class QuestionsetService {


  questionset: QuestionSet;
  question: Question;
  option: Option;
  user: User;

  constructor(
    private _http: Http,
    private processHTTPMsgService: ProcesshttpmsgService,
    //private headers: Headers,
    private authService: AuthService
  ) { }

  postQuestionSet(questionset: QuestionSet): Observable<QuestionSet> {
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
    
    return this._http.post(baseURL + 'questionsets', questionset, {headers: headers})
    .map(res => res.json())
    .catch(error => {
      return this.processHTTPMsgService.handleError(error);
    });
  }

  postQuestion(question: Question, qsetid: string): Observable<QuestionSet> {
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
    
    return this._http.post(baseURL + 'questionsets/' + qsetid + '/questions', question, {headers: headers})
    .map(res => res.json())
    .catch(error => {
      return this.processHTTPMsgService.handleError(error);
    });
  }

  postOption(option: Option, qsetid: string, qid: string): Observable<QuestionSet> {
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
    
    return this._http.post(baseURL + 'questionsets/' + qsetid + '/questions/' + qid + '/options', option, {headers: headers})
    .map(res => res.json())
    .catch(error => {
      return this.processHTTPMsgService.handleError(error);
    });
  }

  getQuestionset(): Observable<QuestionSet[]> {
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

    return this._http.get(baseURL + 'questionsets', {headers: headers})
    .map(res => res.json())
    .catch(error => {
      return this.processHTTPMsgService.handleError(error);
    });
  }

  getQuestionsetbyName(name: string): Observable<QuestionSet> {
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

    return this._http.get(baseURL + 'questionsets?name=' + name, {headers: headers})
    .map(res => res.json())
    .catch(error => {
      return this.processHTTPMsgService.handleError(error);
    });
  }

}
