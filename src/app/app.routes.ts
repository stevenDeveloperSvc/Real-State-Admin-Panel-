import { Routes } from '@angular/router';
import { LayoutComponent } from './Layout/layout.component';
import { LoginComponent } from './login/login.component';
import { ContentDashboardComponent } from './Layout/content/content-dashboard/content-dashboard.component';
import { ContentUserInfoComponent } from './Layout/content/content-user-info/content-user-info.component';
import { ContentPropertyListComponent } from './Layout/content/content-property-list/content-property-list.component';
import { ContentPropertyMaintenanceComponent } from './Layout/content/content-property-maintenance/content-property-maintenance.component';
import { authGuard } from './guard/auth.guard';
import { InfoComponent } from './Layout/content/content-user-info/info/info.component';
import { PasswordComponent } from './Layout/content/content-user-info/password/password.component';

export const routes: Routes = [
  {
    path: 'main',
    component: LayoutComponent,
    title: 'Admin - Panel',
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      {
        path: 'dashboard',
        component: ContentDashboardComponent,
        title: 'Admin - Dashboard',
      },
      {
        path: 'user-info',
        component: ContentUserInfoComponent,
        title: 'Admin - User',
        canActivateChild: [authGuard],
        children: [
          {
            path: '',
            redirectTo: 'info',
            pathMatch: 'full',
          },
          {
            path: 'info',
            component: InfoComponent,
            title: 'Admin - user - info',
          },
          {
            path: 'password',
            component: PasswordComponent,
            title: 'Admin - user - password',
          },
        ],
      },

      {
        path: 'property-list',
        component: ContentPropertyListComponent,
        canActivate: [authGuard],
        canActivateChild: [authGuard],
        title: 'Admin - Propety List',
        children: [
          {
            title: 'property-maintenance',
            path: 'maintenance',
            component: ContentPropertyMaintenanceComponent,
          },
        ],
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: 'main/dashboard' },
];

