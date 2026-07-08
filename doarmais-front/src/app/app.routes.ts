import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { MinhaContaComponent } from './pages/minha-conta/minha-conta.component';
import { RelatoriosComponent } from './pages/relatorios/relatorios.component';
import { AuditoriaComponent } from './pages/auditoria/auditoria.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'minha-conta', component: MinhaContaComponent, canActivate: [authGuard] },
  { path: 'relatorios', component: RelatoriosComponent, canActivate: [authGuard] },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [authGuard, adminGuard] },
  { path: 'auditoria', component: AuditoriaComponent, canActivate: [authGuard, adminGuard] },
  { path: '**', redirectTo: 'home' },
];
