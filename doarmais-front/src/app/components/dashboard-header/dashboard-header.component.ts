import { Component, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-dashboard-header',
  imports: [RouterLink],
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.css',
})
export class DashboardHeaderComponent {
  private authService = inject(AuthService);

  totalCestas = input<number>(0);
  refresh = output<void>();

  usuario = this.authService.usuario;
  isAdmin = this.authService.isAdmin;
}
