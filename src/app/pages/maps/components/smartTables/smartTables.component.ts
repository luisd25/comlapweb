import {Component, ViewEncapsulation} from '@angular/core';
import {BackandService} from 'angular2bknd-sdk';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'basic-tables',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./smartTables.scss')],
  template: require('./smartTables.html')
})
export class SmartTables {

  query: string = '';
  userAppointment:any;
  lastfilter:any;

  settings = {
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>',
      createButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
      confirmSave: true 
    },
    edit: {
      editButtonContent: '<i class="ion-edit"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true
    },
    columns: {
      appointmentid: {
        title: '# Cita',
        type: 'number'
      },
      apttitle: {
        title: 'Titulo',
        type: 'string'
      },
      aptstartdate: {
        title: 'Fecha Inicio',
        type: 'string'
      },
      aptenddate: {
        title: 'Fecha Fin',
        type: 'string'
      },
      aptdetail: {
        title: 'Detalle',
        type: 'string'
      },
      caseid: {
        title: '# Caso',
        type: 'number'
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private backandService:BackandService) {
      this.userAppointment = JSON.parse(localStorage.getItem('userappointment'));
      this.source.load(this.userAppointment);
  }
  ngAfterViewInit(){
    this.lastfilter = localStorage.getItem('casefilter');
  }

  onDeleteConfirm(event): void {
      if(window.confirm('Are you sure you want to delete?')){
        this.backandService.delete('cases',event.data.caseid).subscribe(
        data=>{

        },
        err =>{this.backandService.logError(err);event.confirm.resolve();},
        ()=> {console.log('Success delete'); event.confirm.resolve();}
        );
      }
      else{
          event.confirm.reject();
      }

  }
    onCreteConfirm(event){
      console.log(event);
      this.backandService.create('appointment', {
        apttitle: event.newData.apttitle,
        aptdetail: event.newData.aptdetail,
        patientid:this.userAppointment[0].patientid,
        caseid:this.lastfilter

      }).subscribe(
        data => {
          console.log('appointment agregado');
        },
        err => {this.backandService.logError(err);event.confirm.reject();},
        () => {event.confirm.resolve();console.log('created');}
      );   
  }
}
