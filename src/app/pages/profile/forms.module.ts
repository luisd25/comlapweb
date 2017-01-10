import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule as AngularFormsModule,ReactiveFormsModule  } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { routing }       from './forms.routing';

import { RatingModule } from 'ng2-bootstrap/ng2-bootstrap';
import { Forms } from './forms.component';
import { Layouts } from './components/layouts';

import { BlockForm } from './components/layouts/components/blockForm';

@NgModule({
  imports: [
    CommonModule,
    AngularFormsModule,
    ReactiveFormsModule, 
    NgaModule,
    RatingModule,
    routing
  ],
  declarations: [
    Layouts,
    Forms,
    BlockForm
  ]
})
export default class FormsModule {
}
