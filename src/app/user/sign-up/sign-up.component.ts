import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { MessageService } from '../../message.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup

  constructor(private fb: FormBuilder, private auth: AuthService, private msgService: MessageService) { }

  ngOnInit() {
    this.initForm()
  }

  initForm(){
    this.signUpForm = this.fb.group({
      email: ['', Validators.required],
      password : ['', Validators.required],
      password_2 : ['', Validators.required],
      first_name : ['', Validators.required],
      last_name : ['', Validators.required],
    })
  }

  signUp(){
    if(this.signUpForm.get('password').value == this.signUpForm.get('password_2').value){
      let content = {
        username : this.signUpForm.get('email').value,
        email : this.signUpForm.get('email').value,
        password : this.signUpForm.get('password').value,
        first_name : this.signUpForm.get('first_name').value,
        last_name : this.signUpForm.get('last_name').value,
      }

      this.auth.signUp(content).subscribe(
        res => {
          console.log(res)
          this.auth.user = res
          this.auth._loggedIn.next(true)
          let credentials = { username: this.signUpForm.get('email').value, password: this.signUpForm.get('password').value }
          console.log(credentials)
          this.auth.get_auth_token(credentials).subscribe( //then get token
            res => {
              console.log(res)
              this.auth._userId.next(res['id'])
              this.auth.auth_token = res['token']
              this.auth.store_user(res['token'], res['id'])
              this.auth._loggedIn.next(true)
              console.log('Done')
            },
            err => console.log(err)
          )
        },
        err => console.log(err)
      )
    }else{
      this.msgService.displayMessage('Passwords Do Not Match')
    }
  }


}
