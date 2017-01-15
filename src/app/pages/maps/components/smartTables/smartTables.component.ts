import {Component, ViewEncapsulation} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ComlapService } from '../../../../comlap.service';

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
      confirmCreate: true 
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

  constructor(private comlapservice:ComlapService) {
      this.userAppointment = JSON.parse(localStorage.getItem('userappointment'));
      this.source.load(this.userAppointment);
  }
  ngAfterViewInit(){
    this.lastfilter = localStorage.getItem('casefilter');
    console.log(this.lastfilter);
    if(this.lastfilter > 0) this.filtertable(this.lastfilter);
  }

  onDeleteConfirm(event): void {
      if(window.confirm('Are you sure you want to delete?')){
        this.comlapservice.delete('cases',event.data.caseid).subscribe(
        data=>{

        },
        err =>{this.comlapservice.logError(err);event.confirm.resolve();},
        ()=> {console.log('Success delete'); event.confirm.resolve();}
        );
      }
      else{
          event.confirm.reject();
      }

  }
    onCreteConfirm(event){
      console.log('oncreate:',event);
      this.comlapservice.create('appointment', {
        apttitle: event.newData.apttitle,
        aptdetail: event.newData.aptdetail,
        patientid:this.userAppointment[0].patientid,
        caseid:this.lastfilter

      }).subscribe(
        data => {
          console.log('appointment agregado');
        },
        err => {this.comlapservice.logError(err);event.confirm.reject();},
        () => {event.confirm.resolve();console.log('created');}
      );   
  }
  filtertable(filter:any){
      this.source.setFilter([{ field: 'caseid', search: filter }]);
      this.lastfilter = filter;
  }
}
