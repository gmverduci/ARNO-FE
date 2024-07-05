import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/signup/signup.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PazientiComponent } from './components/pazienti/pazienti.component';
import { ConsegneComponent } from './components/consegne/consegne.component';
import { OrdiniComponent } from './components/ordini/ordini.component';
import { TerapieComponent } from './components/terapie/terapie.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { AdminComponent } from './components/admin/admin.component';
import { DocumentiComponent } from './components/documenti/documenti.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthService } from './auth/auth.service';
import { TokenInterceptor } from './auth/token.interceptor';
import { ListaPazientiComponent } from './components/pazienti/lista-pazienti/lista-pazienti.component';



@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    SidebarComponent,
    DashboardComponent,
    PazientiComponent,
    ConsegneComponent,
    OrdiniComponent,
    TerapieComponent,
    CalendarioComponent,
    AdminComponent,
    DocumentiComponent,
    WelcomeComponent,
    SignUpComponent,
    ListaPazientiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    FormsModule, 
  ],
  providers: [   {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  },
  AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
