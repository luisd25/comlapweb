import { Routes, RouterModule }  from '@angular/router';

import { Login } from './login.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Login
  },
  {
    path: 'register',
    loadChildren: () => System.import('../register/register.module')
  },
  {
    path: 'pages/dashboard',
    loadChildren: () => System.import('../dashboard/dashboard.module')
  }
];

export const routing = RouterModule.forChild(routes);
