import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators,FormControl} from '@angular/forms';
import {BackandService} from 'angular2bknd-sdk';

@Component({
  selector: 'block-form',
  template: require('./blockForm.html'),
})
export class BlockForm {
  fullUser:any;
  enablefields:boolean = false;
  public form:FormGroup;
  public email:AbstractControl;
  public username:AbstractControl;
  public firstname:AbstractControl;
  public lastname:AbstractControl;
  
  constructor(fb:FormBuilder,private backandService:BackandService) {
    this.fullUser = JSON.parse(localStorage.getItem('fullUser'));
    // this.form = fb.group({
    //   'inputEmail': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
    //   'inputUserName': ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    // });

    // this.email = this.form.controls['inputEmail'];
    // this.username = this.form.controls['inputUserName'];
    // this.firstname = this.form.controls['firstname'];
    // this.lastname = this.form.controls['lastname'];
    // console.log('user:',this.email.value);
    this.form = fb.group({
      'firstname': [this.fullUser.firstname] , disabled: true,
      'lastname': [this.fullUser.lastname] ,
      'email': [this.fullUser.email],
      'username': [this.fullUser.username]
    });

    this.firstname = this.form.controls['firstname'];
    this.lastname = this.form.controls['lastname'];
    this.email = this.form.controls['email'];
    this.username = this.form.controls['username'];
    //desabilitar camposS
    this.username.disable();
    this.email.disable();
    this.firstname.disable();
    this.lastname.disable();

  }
  public onSubmit(values:Object){
     this.fullUser.username = this.username.value;
      this.fullUser.firstname=this.firstname.value ;
      this.fullUser.lastname = this.lastname.value;
      this.fullUser.email = this.email.value;


       let updateobject = {	
        fileid: this.fullUser.fileid,
        sufferid: this.fullUser.sufferid,
        userid: this.fullUser.userid,
        patientid: this.fullUser.patientid,
        identification: this.fullUser.identification,
        ssn: this.fullUser.ssn,
        firstname: this.fullUser.firstname,
        secondname: this.fullUser.secondname,
        lastname: this.fullUser.lastname,
        secondlastname: this.fullUser.secondlastname,
        gender: this.fullUser.gender,
        birthdate: this.fullUser.birthdate,
        pweight: this.fullUser.pweight,
        pheight: this.fullUser.pheight,
        telephone: this.fullUser.telephone,
        celphone: this.fullUser.celphone,
        homephone: this.fullUser.homephone,
        email: this.fullUser.email,
        details: this.fullUser.details,
        appointment: this.fullUser.appointment,
        username: this.fullUser.username
    }

      this.backandService.update('patient', this.fullUser.patientid,updateobject,false,true)
        .subscribe(
                data => {
                  console.log(data);
                },
                err => this.backandService.logError(err),
                () => this.successonUpdate()
            );
    }

    successonUpdate(){
      console.log('Updated'+' Datos Actualizados');
      // this.enablefields = !this.enablefields;
      this.enabledEdit();

    }
  

  public enabledEdit(){
    this.enablefields = !this.enablefields; 
    // console.log('state: ',this.enablefields);
    if(this.email.enabled){
        this.username.disable();
        this.email.disable();
        this.firstname.disable();
        this.lastname.disable();

    }else{
        this.email.enable()
        this.username.enable()
        this.firstname.enable()
        this.lastname.enable()
    }
    
  }
}
