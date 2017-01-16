import {Component, ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../users.services';
import { BaThemeSpinner } from '../../theme/services';
import { ComlapService } from '../../comlap.service';



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
  // public username:string;
  private items:any;

  constructor(fb:FormBuilder,private comlapService:ComlapService
              ,private router:Router,private user:UserService,private _spinner: BaThemeSpinner) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];

  }

  public onSubmit(values:Object):void {
    console.log('presione el boton');
    this.submitted = true;
    this._spinner.show();
    if (this.form.valid) {// luego de que se llene el formulario
  
      this.comlapService.getList('users','username','eq',this.email.value)//nombre de la tabla,pagesiz,pagenumber,filtro
            .subscribe(
                data => {
                    console.log('lista de usuarios',data);
                    this.items = data;
                },
                err => this.comlapService.logError(err),
                ()=> this.loginUser()
            );  
    }
  }
  loginUser(){
        let failed = 0;
        let position = 0;
        for (let i = 0; i < this.items.length; i++) {
          if(this.items[i].username == this.email.value &&
             this.items[i].password == this.password.value) {
                 failed = 1; 
                 position = i;                 
                }
        }
        if (failed != 0) {
            
            // alert('Valid user');
            this.user.login2();
            this.router.navigate(['pages/dashboard']);//nos dirigimos a la pagina principal
            localStorage.setItem('currentUser',JSON.stringify(this.items[position]));//se almacena la info del usuario en el localstorage
            localStorage.setItem('userType',JSON.stringify(this.items[position].usertype))
            // this._spinner.hide();                                
        }
        else{
          this._spinner.hide();
          alert('Invalid username or password');
        }
     
    }

}

