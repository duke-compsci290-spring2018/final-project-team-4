import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { GoogleSignInComponent } from 'angular-google-signin';

import { environment } from './../environments/environment';
import { GroupsPageComponent } from './groups-page/groups-page.component';
import { MakeScheduleComponent } from './make-schedule/make-schedule.component';
import { MakeGroupComponent } from './make-group/make-group.component';


const routes: Routes = [
  {path: 'make-group', component: MakeGroupComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WelcomePageComponent,
    GroupsPageComponent,
    GoogleSignInComponent,
    MakeScheduleComponent,
    MakeGroupComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
