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
  fullUser:any;

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
      id: {
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
        type: 'string'
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();
  currentUser:any;
  constructor(private comlapservice:ComlapService) {
      this.userAppointment = JSON.parse(localStorage.getItem('userappointment'));
      // console.log()
      this.source.load(this.userAppointment);
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.fullUser = JSON.parse(localStorage.getItem('fullUser'));
  }
  ngAfterViewInit(){
    this.lastfilter = localStorage.getItem('casefilter');
    console.log('caseid:',this.lastfilter);
    if(this.lastfilter) this.filtertable(this.lastfilter);
  }

  onDeleteConfirm(event): void {
      if(window.confirm('Are you sure you want to delete?')){
        this.comlapservice.delete('appointment',event.data.id).subscribe(
        data=>{
            
        },
        err =>{this.comlapservice.logError(err);event.confirm.resolve();},
        ()=> {console.log('Success delete'); event.confirm.resolve();this.updateList();}
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
        caseid:this.lastfilter,
        aptstartdate: event.newData.aptstartdate,
        aptenddate: event.newData.aptenddate

      }).subscribe(
        data => {
          console.log('appointment agregado');
          
        },
        err => {this.comlapservice.logError(err);event.confirm.reject();},
        () => {
                event.confirm.resolve();console.log('created');
                this.updateList();
              
            }
      );   
  }
  filtertable(filter:any){
      this.source.setFilter([{ field: 'caseid', search: filter }]);
      this.lastfilter = filter;
  }

  updateList(){
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
      this.comlapservice.getList('appointment',fieldname,operator,value)//nombre de la tabla,pagesiz,pagenumber,filtro
            .subscribe(
                data => {
                    console.log('appointment del usuario:',data);
                    this.userAppointment = data;
                },
                err => this.comlapservice.logError(err),
                ()=> {
                        localStorage.setItem('userappointment',JSON.stringify(this.userAppointment));
                        
                      }
            );

  }
}
