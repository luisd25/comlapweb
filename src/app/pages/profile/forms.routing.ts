import { Routes, RouterModule }  from '@angular/router';

import { Forms } from './forms.component';
import { Layouts } from './components/layouts/layouts.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Forms,
    children: [
      { path: 'layouts', component: Layouts }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
