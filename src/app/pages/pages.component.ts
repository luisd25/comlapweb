import {Component, ViewEncapsulation} from '@angular/core';
import {UserService} from './users.services';
import { Router, CanActivate } from '@angular/router';
import {BackandService} from 'angular2bknd-sdk';
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
    <footer class="al-footer clearfix">
      <div class="al-footer-right">Created with <i class="ion-heart"></i></div>
      <div class="al-footer-main clearfix">
        <div class="al-copy">&copy; <a href="http://akveo.com">Akveo</a> 2016</div>
        <ul class="al-share clearfix">
          <li><i class="socicon socicon-facebook"></i></li>
          <li><i class="socicon socicon-twitter"></i></li>
          <li><i class="socicon socicon-google"></i></li>
          <li><i class="socicon socicon-github"></i></li>
        </ul>
      </div>
    </footer>
    <ba-back-top position="200"></ba-back-top>
    `
})
export class Pages implements CanActivate {
  currentUser:any;
  fullUser:any;
  userCases:any;
  userAppointment:any;

  constructor(private user: UserService,private backandService:BackandService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    let filter =//filtro para el select (where clause)
          [
            {
              fieldName: 'username',//nombre del campo
              operator: 'contains',//operador, si es un numero se usa equals, si es string contains, ahi mas variantes
              //remover comentario cuando se utilize el campo del formulario
              value: this.currentUser.username
              // value: 'jose'//valor
            }
          ]
      ;
      //Los metodos disponibles estan definidos en node_modules/angular2bknd-sdk/backandService
      this.backandService.getList(this.currentUser.usertype,null,null,filter)//nombre de la tabla,pagesiz,pagenumber,filtro
            .subscribe(
                data => {
                    console.log('usuario completo:',data);
                    this.fullUser = data[0];
                },
                err => this.backandService.logError(err),
                ()=> {
                        localStorage.setItem('fullUser',JSON.stringify(this.fullUser));
                        this.loadUserData();
                      }
            );
  }
  
  canActivate(){
    return this.user.isLoggedIn();
  }

  loadUserData(){
      console.log(this.fullUser.patientid);
      let filter =//filtro para el select (where clause)
          [
            {
              fieldName: 'patientid',//nombre del campo
              operator: 'equals',//operador, si es un numero se usa equals, si es string contains, ahi mas variantes
              //remover comentario cuando se utilize el campo del formulario
              value: this.fullUser.patientid
              // value: 'jose'//valor
            }
          ]
      ;
      //Los metodos disponibles estan definidos en node_modules/angular2bknd-sdk/backandService
      this.backandService.getList('cases',null,null,filter)//nombre de la tabla,pagesiz,pagenumber,filtro
            .subscribe(
                data => {
                    console.log('casos del usuario:',data);
                    this.userCases = data;
                },
                err => this.backandService.logError(err),
                ()=> {
                        localStorage.setItem('usercases',JSON.stringify(this.userCases));
                        this.loadUserAppointment();
                        
                      }
            );

  }

  loadUserAppointment(){
      console.log(this.fullUser.patientid);
      let filter =//filtro para el select (where clause)
          [
            {
              fieldName: 'patientid',//nombre del campo
              operator: 'in',//operador, si es un numero se usa equals, si es string contains, ahi mas variantes
              //remover comentario cuando se utilize el campo del formulario
              value: this.fullUser.patientid
              // value: 'jose'//valor
            }
          ]
      ;
      //Los metodos disponibles estan definidos en node_modules/angular2bknd-sdk/backandService
      this.backandService.getList('appointment',null,null,filter)//nombre de la tabla,pagesiz,pagenumber,filtro
            .subscribe(
                data => {
                    console.log('appointment del usuario:',data);
                    this.userAppointment = data;
                },
                err => this.backandService.logError(err),
                ()=> {
                        localStorage.setItem('userappointment',JSON.stringify(this.userAppointment));
                        
                      }
            );

  }
}
