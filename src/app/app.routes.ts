import { Routes } from '@angular/router';
import { LayoutComponent } from './Layout/layout.component';
import { LoginComponent } from './login/login.component';
import { ContentDashboardComponent } from './Layout/content/content-dashboard/content-dashboard.component';
import { ContentUserInfoComponent } from './Layout/content/content-user-info/content-user-info.component';
import { ContentPropertyListComponent } from './Layout/content/content-property-list/content-property-list.component';

export const routes: Routes = [
  {
    path: 'main',
    component: LayoutComponent,
    title: 'Admin - Panel',
    children: [
      {
        path: 'dashboard',
        component: ContentDashboardComponent,
        title: 'Admin - Dashboard',
      },
      {
        path:'user-info',
        component: ContentUserInfoComponent,
        title:'Admin - UserInfo'
      },
      {
        path:'property-list',
        component:ContentPropertyListComponent,
        title: 'Admin - Propety List'
      },
      {
        path: '',
        redirectTo: 'property-list',
        pathMatch: 'full',
        title: 'Admin - Dashboard ',
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
