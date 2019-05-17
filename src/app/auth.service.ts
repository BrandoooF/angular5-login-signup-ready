import { Injectable } from '@angular/core';
import { User } from './models/user';
import { BehaviorSubject } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { API_URL } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth_token: String
  _userId = new BehaviorSubject('')
  user = new User
  _loggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false)
  location: Position //stores user location for search

  constructor(private http: HttpClient) { 
    this.checkStorageForCredentials()
  }

  get_auth_token(credentials){
    console.log(credentials)

    // Login From login.component if no user in storage
    return this.http.post(API_URL + '/api-token-auth/', {username: credentials.username, password: credentials.password})
 
  }

  get_user(user_id=this._userId.value){
    let request = this.http.get<User>(API_URL + '/users/' + user_id)
    request.subscribe(
      res => {
        this.user = res
        console.log(this.user)
        this._loggedIn.next(true)
      },
      err => console.log(err)
    )
  }

  store_user(auth_token, user_id){
    localStorage.setItem('VelAuthToken', auth_token)
    localStorage.setItem('VelUserId', user_id)
  }

  checkStorageForCredentials(){
    // If user is stored all user retrieval happens here
    this.auth_token = localStorage.getItem('VelAuthToken')
    this._userId.next(localStorage.getItem('VelUserId'))
    if(this.auth_token != null && this._userId != null){
        this.get_user(this._userId.value) //get user
    }
  }

  logout(){
    //clear user from memory and localstorage
    this.auth_token = null
    this.user = new User //What the hell?????????????????????????????? Trying to set user to nothing on logout
    this._userId.next('')
    this.clear_user()
  }

  clear_user(){
    localStorage.removeItem('VelAuthToken')
    localStorage.removeItem('VelUserId')
  }

  postLogin(){
  }

  signUp(content){
    return this.http.post<User>(API_URL + '/users/', content)
  }
}

