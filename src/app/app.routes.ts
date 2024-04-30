import { Routes } from '@angular/router';
import { LayoutComponent } from './Layout/layout.component';
import { LoginComponent } from './login/login.component';
import { ContentDashboardComponent } from './Layout/content/content-dashboard/content-dashboard.component';
import { ContentUserInfoComponent } from './Layout/content/content-user-info/content-user-info.component';
import { ContentPropertyListComponent } from './Layout/content/content-property-list/content-property-list.component';
import { ContentPropertyMaintenanceComponent } from './Layout/content/content-property-maintenance/content-property-maintenance.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
  {
    path: 'main',
    component: LayoutComponent,
    title: 'Admin - Panel',
    canActivate:[authGuard],
    children: [
      {
        path: 'dashboard',
        component: ContentDashboardComponent,
        canActivate:[authGuard],
        title: 'Admin - Dashboard',
      },
      {
        path:'user-info',
        component: ContentUserInfoComponent,
        canActivate:[authGuard],
        title:'Admin - User'
      },
      {
        path:'property-list',
        component:ContentPropertyListComponent,
        canActivate:[authGuard],
        canActivateChild:[authGuard],
        title: 'Admin - Propety List',
        children:[
          {
            title:'property-maintenance',
            path:'maintenance',
            component: ContentPropertyMaintenanceComponent,
          
          }
        ]
      },
      // {
      //   path:'property-maintenance',
      //   component:ContentPropertyMaintenanceComponent,
      //   canActivate:[authGuard],
      //   title: 'Admin - Property Maintenance'
      
      // },
      // {
      //   path: '',
      //   redirectTo: 'property-maintenance',
      //   pathMatch: 'full',
      //   canActivate:[authGuard],
      //   title: 'Admin - Dashboard ',
      // },
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
    { path: '**', redirectTo: 'login' }

];

// const routes: Routes = [
//   {
//     path: 'home',
//     component: LayoutComponent,
//     canActivate: [loginGuard],
//     title: 'Dasha - Home',
//     children: [
//       { path: 'dashboard', component: DashboardComponent, canActivate: [loginGuard], title: "Dasha - Dashboard", data: { animation: 'Dashboard' } },
//       { path: 'product', component: ProductsComponent, canActivate: [loginGuard], title: 'Dasha - Product' },
//       { path: 'customer', component: CustomerComponent, canActivate: [loginGuard], title: 'Dasha - Customer' },
//       { path: 'transactions', component: TransactionsComponent, canActivate: [loginGuard], title: 'Dasha - Transactions' },
//       { path: 'stock', component: StockComponent, canActivate: [loginGuard], title: 'Dasha - Stock' },
//       { path: 'bills', component: BillComponent, canActivate: [loginGuard], title: 'Dasha - Bills' },
//       { path: 'bills/billDetails', component: BilldetailsComponent, canActivate: [loginGuard], title: 'Dasha - Bills Details' },
//       { path: '', redirectTo: 'dashboard', pathMatch: 'full', title: 'Dasha - Home' },

//     ]
//   },
//   { path: 'account/login', component: LoginComponent },
//   { path: 'account/register', component: RegisterComponent },
//   { path: 'account/forgotpassword', component: ForgotpasswordComponent },
//   {
//     path: 'account/reset-password',
//     component: ResetpasswordComponent,
//     canActivate: [checkTokeParamGuard],
//   },
//   { path: '**', redirectTo: 'home/dashboard' }
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],
// })
// export class AppRoutingModule { }
