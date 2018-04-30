import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { GoogleSignInComponent } from 'angular-google-signin';

import { environment } from './../environments/environment';
import { GroupsPageComponent } from './groups-page/groups-page.component';
import { MakeGroupComponent } from './make-group/make-group.component';
import { UserService } from './user.service';
import { EditGroupComponent } from './edit-group/edit-group.component';
import { PickGroupComponent } from './pick-group/pick-group.component';

import { NgPipesModule } from 'ngx-pipes';


const routes: Routes = [
  {path: 'make-group', component: MakeGroupComponent},
  {path: 'edit-group/:group', component: EditGroupComponent},
  {path: 'pick-group', component: PickGroupComponent},
  {path: 'welcome', component: WelcomePageComponent},
  { path: '',   redirectTo: '/welcome', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    GroupsPageComponent,
    GoogleSignInComponent,
    MakeGroupComponent,
    EditGroupComponent,
    PickGroupComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(routes),
    NgPipesModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
