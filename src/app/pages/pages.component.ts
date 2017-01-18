import {Component, ViewEncapsulation} from '@angular/core';
import {UserService} from './users.services';
import { Router, CanActivate } from '@angular/router';
import { ComlapService } from '../comlap.service';
@Component({
  selector: 'pages',
  encapsulation: ViewEncapsulation.None,
  styles: [],
  template: `
    <ba-sidebar></ba-sidebar>
    <ba-page-top></ba-page-top>
    <div class="al-main">
      <div class="al-content">
        <ba-content-top></ba-content-top>
        <router-outlet></router-outlet>
      </div>
    </div>

    <ba-back-top position="200"></ba-back-top>
    `
})
export class Pages implements CanActivate {
  currentUser:any;
  fullUser:any;
  userCases:any;
  userAppointment:any;
  public hospitalList: any;

  constructor(private user: UserService,private comlapService:ComlapService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    let filter;
    let fieldname;
    let value = this.currentUser.username;
    let operator = 'eq';
    if(this.currentUser.usertype.trim().toLowerCase()=='patient'){
       fieldname = 'username';
    }else{
      fieldname = 'staffusername';
    }
      //Los metodos disponibles estan definidos en node_modules/angular2bknd-sdk/comlapService
      this.comlapService.getList(this.currentUser.usertype,fieldname,operator,value)//nombre de la tabla,pagesiz,pagenumber,filtro
            .subscribe(
                data => {
                    console.log('usuario completo:',data);
                    this.fullUser = data;
                },
                err => this.comlapService.logError(err),
                ()=> {
                        localStorage.setItem('fullUser',JSON.stringify(this.fullUser));
                        this.loadUserData();
                        // console.log('loaded full user');
                      }
            );
  }
  
  canActivate(){
    return this.user.isLoggedIn();
  }

  loadUserData(){
      let fieldname;
      let value;
      let operator = 'eq';
      // console.log(this.fullUser.patientid);
      if(this.currentUser.usertype.trim().toLowerCase()=='patient'){
        
      fieldname = 'patientid';
      value = this.fullUser[0].id;
      // console.log('soy un paciente',fieldname,value);
    }else{
      fieldname = 'hospitalid';
      value = this.fullUser[0].hospitalid;

    }

      this.comlapService.getList('cases',fieldname,operator,value)//nombre de la tabla,pagesiz,pagenumber,filtro
            .subscribe(
                data => {
                    console.log('casos del usuario:',data);
                    this.userCases = data;
                },
                err => this.comlapService.logError(err),
                ()=> {
                        localStorage.setItem('usercases',JSON.stringify(this.userCases));
                        this.loadUserAppointment();
                        
                      }
            );

  }

  loadUserAppointment(){
       let fieldname;
      let value;
      let operator = 'eq';

      if(this.currentUser.usertype.trim().toLowerCase()=='patient'){
      fieldname = 'patientid';
      value = this.fullUser[0].id;
      
      }else{
        fieldname = 'staffid';
        value = this.fullUser[0].id;

      }
        
      //Los metodos disponibles estan definidos en node_modules/angular2bknd-sdk/comlapService
      this.comlapService.getList('appointment',fieldname,operator,value)//nombre de la tabla,pagesiz,pagenumber,filtro
            .subscribe(
                data => {
                    console.log('appointment del usuario:',data);
                    this.userAppointment = data;
                },
                err => this.comlapService.logError(err),
                ()=> {
                        localStorage.setItem('userappointment',JSON.stringify(this.userAppointment));
                        this.loadMarker();
                        
                      }
            );

  }
  loadMarker(){
    this.comlapService.getList('hospital','Provincia','eq','SANTO DOMINGO')
           .subscribe(
               data => {
                   console.log(data);
                   this.hospitalList = data;
               },
               err => this.comlapService.logError(err),
               ()=> { localStorage.setItem('hospitalmarker',JSON.stringify(this.hospitalList)); console.log('market loaded'); }

            
           );
  }
}
