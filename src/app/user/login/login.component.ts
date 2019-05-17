import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup

  constructor(private fb: FormBuilder, private auth: AuthService) { }

  ngOnInit() {
    this.initForm()
  }

  initForm(){
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login(){
    let credentials = {
      username: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    }
    this.auth.get_auth_token(credentials).subscribe(
      res => {
        console.log(res)
        this.auth.auth_token = res['token']
        this.auth._userId.next(res['id'])
        this.auth.get_user()
        this.auth._loggedIn.next(true)
        this.auth.store_user(res['token'], res['id'])
      },
      err => console.log(err)
    )
  }

}
