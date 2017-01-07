import {Component, ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {BackandService} from 'angular2bknd-sdk';

@Component({
  selector: 'login',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./login.scss')],
  template: require('./login.html'),
})
export class Login {

  //TODO: validate username or email with the database results

  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;
  public username:string;
  private items:any;

  constructor(fb:FormBuilder,private backandService:BackandService) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
    
  }

  public onSubmit(values:Object):void {
    console.log('presione el boton');
    this.submitted = true;
    
    if (this.form.valid) {// luego de que se llene el formulario
      let filter =//filtro para el select (where clause)
          [
            {
              fieldName: 'username',//nombre del campo
              operator: 'contains',//operador, si es un numero se usa equals, si es string contains, ahi mas variantes
              //remover comentario cuando se utilize el campo del formulario
              // value: this.username
              value: 'jose'//valor
            }
          ]
      ;
      //Los metodos disponibles estan definidos en node_modules/angular2bknd-sdk/backandService
      this.backandService.getList('users',null,null,filter)//nombre de la tabla,pagesiz,pagenumber,filtro
            .subscribe(
                data => {
                    console.log('lista de usuarios',data);
                    this.items = data;
                },
                err => this.backandService.logError(err),
                ()=> this.loginUser()
            );  
    }
  }
  loginUser(){
     
    }

}

