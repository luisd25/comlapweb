import { Routes, RouterModule }  from '@angular/router';
import { Register } from './register.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  { path: '', component: Register },
  { path: 'login', loadChildren: ()=> System.import('../login/login.module')}
];

export const routing = RouterModule.forChild(routes);
