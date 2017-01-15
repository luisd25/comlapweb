import {Component, ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator} from '../../theme/validators';
import {Router} from '@angular/router';
import { ComlapService } from '../../comlap.service';

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

  constructor(fb:FormBuilder, private comlapService:ComlapService, private router:Router) {

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
      this.comlapService.getList('users','username','eq',this.username.value)//nombre de la tabla,pagesiz,pagenumber,filtro
            .subscribe(
                data => {
                    console.log('lista de usuarios',data);
                    this.count= data.length;
                      
                },
                err => this.comlapService.logError(err),
                ()=> this.validateEmail()
      );
    }

  validateEmail(){
    if(this.count == 0){
      this.comlapService.getList('users','email','eq',this.email.value)//nombre de la tabla,pagesiz,pagenumber,filtro
            .subscribe(
                data => {
                    console.log('lista de usuarios',data);
                    this.count= data.length;
                      
                },
                err => this.comlapService.logError(err),
                ()=> this.registerUser()
      );
    } else {
      alert("El usuario " + this.username.value + " no se encuentra disponible.");
    }

  }

  registerUser(){
    if(this.count == 0){
      this.comlapService.create('users', {
        username: this.username.value,
        email: this.email.value,
        password: this.password.value
      }).subscribe(
        data => {
          alert('Registro completado exitosamente!')
        },
        err => this.comlapService.logError(err),
        () => this.router.navigate(['login'])
      );
      
    } else {
      alert("El email " + this.email.value + " ya se encuentra registrado en COMLAP.");
    }
    
    
  }
}
