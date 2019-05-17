import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {path: 'sign-up', component: SignUpComponent},
  {path: 'login', component: LoginComponent},
  /*{path: 'creator', component: CreatorComponent,
    children: [
      {path: '', component: EventCreatorHomeComponent},
      {path: 'single', component: EventCreatorSingleComponent},
      {path: 'my-events', component: MyEventsComponent},
      {path: 'edit-event/:id', component: EditEventComponent},
      {path: 'double', component: EventCreatorSingleComponent},
    ]
  },*/

]


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
