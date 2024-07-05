import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PazientiComponent } from './components/pazienti/pazienti.component';
import { ConsegneComponent } from './components/consegne/consegne.component';
import { OrdiniComponent } from './components/ordini/ordini.component';
import { TerapieComponent } from './components/terapie/terapie.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { DocumentiComponent } from './components/documenti/documenti.component';
import { AdminComponent } from './components/admin/admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/signup/signup.component';

const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },

  {
    path: 'dashboard',
    component: SidebarComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'reparto', pathMatch: 'full' },
      {
        path: 'reparto',
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'pazienti',
        component: PazientiComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'consegne',
        component: ConsegneComponent,
        canActivate: [AuthGuard],
      },
      { path: 'ordini', component: OrdiniComponent, canActivate: [AuthGuard] },
      {
        path: 'terapie',
        component: TerapieComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'calendario',
        component: CalendarioComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'documenti',
        component: DocumentiComponent,
        canActivate: [AuthGuard],
      },
      { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
