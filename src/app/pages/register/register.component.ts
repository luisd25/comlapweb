import {Component, ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator} from '../../theme/validators';
import {BackandService} from 'angular2bknd-sdk';
import {Router} from '@angular/router';

@Component({
  selector: 'register',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./register.scss')],
  template: require('./register.html'),
})
export class Register {

  public form:FormGroup;
  public username:AbstractControl;
  public email:AbstractControl;
  public password:AbstractControl;
  public repeatPassword:AbstractControl;
  public passwords:FormGroup;
  private count:number;

  public submitted:boolean = false;

  constructor(fb:FormBuilder, private backandService:BackandService, private router:Router) {

    this.form = fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
      'passwords': fb.group({
        'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      }, {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')})
    });

    this.username = this.form.controls['name'];
    this.email = this.form.controls['email'];
    this.passwords = <FormGroup> this.form.controls['passwords'];
    this.password = this.passwords.controls['password'];
    this.repeatPassword = this.passwords.controls['repeatPassword'];
  }

  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.form.valid) {
      this.validateUserName();
    }
  }

  validateUserName(){
    let filter =//filtro para el select (where clause)
          [
            {
              fieldName: 'username',//nombre del campo
              operator: 'equals',//operador, si es un numero se usa equals, si es string contains, ahi mas variantes
              //remover comentario cuando se utilize el campo del formulario
              value: this.username.value
              //value: 'joannolasco05'//valor
            }
          ];

      this.backandService.getList('users',null,null,filter)//nombre de la tabla,pagesiz,pagenumber,filtro
            .subscribe(
                data => {
                    console.log('lista de usuarios',data);
                    this.count= data.length;
                      
                },
                err => this.backandService.logError(err),
                ()=> this.validateEmail()
      );
    }

  validateEmail(){
    if(this.count == 0){
      let filter =//filtro para el select (where clause)
          [
            {
              fieldName: 'email',//nombre del campo
              operator: 'equals',//operador, si es un numero se usa equals, si es string contains, ahi mas variantes
              //remover comentario cuando se utilize el campo del formulario
              value: this.email.value
              //value: 'joannolasco05'//valor
            }
          ];

      this.backandService.getList('users',null,null,filter)//nombre de la tabla,pagesiz,pagenumber,filtro
            .subscribe(
                data => {
                    console.log('lista de usuarios',data);
                    this.count= data.length;
                      
                },
                err => this.backandService.logError(err),
                ()=> this.registerUser()
      );
    } else {
      alert("El usuario " + this.username.value + " no se encuentra disponible.");
    }

  }

  registerUser(){
    if(this.count == 0){
      this.backandService.create('users', {
        username: this.username.value,
        email: this.email.value,
        password: this.password.value
      }).subscribe(
        data => {
          alert('Registro completado exitosamente!')
        },
        err => this.backandService.logError(err),
        () => this.router.navigate(['login'])
      );
      
    } else {
      alert("El email " + this.email.value + " ya se encuentra registrado en COMLAP.");
    }
    
    
  }
}
