import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  isLogged = this.authService.isLogged;

  logout() {
    this.authService.logout().subscribe({
      complete: () => this.router.navigate(['/home']),
      error: () => this.router.navigate(['/home']),
    });
  }
}
