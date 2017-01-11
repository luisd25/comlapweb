import {Component, ElementRef} from '@angular/core';
import {BackandService} from 'angular2bknd-sdk';
import { SmartTablesService } from './smartTables.service';
import { LocalDataSource } from 'ng2-smart-table';
// import {GoogleMapsLoader} from './googleMaps.loader';

@Component({
  selector: 'google-maps',
  styles: [require('./googleMaps.scss')],
  template: require('./googleMaps.html'),
})
export class GoogleMaps {
  public hospitalList: any;
  query: string = '';
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
      caseid: {
        title: 'ID',
        type: 'number'
      },
      casetitle: {
        title: 'Titulo',
        type: 'string'
      },
      casestartdate: {
        title: 'Fecha Inicio',
        type: 'string'
      },
      caseenddate: {
        title: 'Fecha Fin',
        type: 'string'
      },
      casedescription: {
        title: 'Descripción',
        type: 'string'
      },
      hospitalid: {
        title: 'id hospital',
        type: 'number',
        filter:true
      }
    }
  };

  public source: LocalDataSource = new LocalDataSource();
  usercases:any;
  constructor(private _elementRef:ElementRef,private backandService:BackandService,protected service: SmartTablesService) {
      
    
  }
  

  ngAfterViewInit() {

      var infoWindow = new google.maps.InfoWindow();


      this.usercases = JSON.parse(localStorage.getItem('usercases'));
      this.source.load(this.usercases);
    
        navigator.geolocation.getCurrentPosition((position)=>{
      console.log('geo: ',position.coords.latitude,position.coords.longitude);
      var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      map.setCenter(latLng)
      var marker = new google.maps.Marker({
                          position: latLng,
                          title:'Current location',
                          animation: google.maps.Animation.DROP,
                          map:map
                        });

    });
        var mapProp = {
            center: new google.maps.LatLng(18.4098742 , -70.1198232),
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROADMAP
            
        };
        var map = new google.maps.Map(this._elementRef.nativeElement.querySelector('.google-maps'), mapProp);

        

        // To add the marker to the map, call setMap();

        var self = this;
        
        let filter =
                [
                    {
                    fieldName: "Provincia",
                    operator: "contains",
                    value: "SANTO DOMINGO"
                    }
                ]
            ;

            this.backandService.getList('hospital',280,null,filter)
           .subscribe(
               data => {
                   console.log(data);
                   this.hospitalList = data;
               },
               err => this.backandService.logError(err),
               ()=> {
                    for(let location of this.hospitalList){

                        var marker = new google.maps.Marker({
                          position: new google.maps.LatLng(location.latitude,location.longitude),
                          title:location.NombreCentro,
                          animation: google.maps.Animation.DROP,
                          map:map
                        });

                        google.maps.event.addListener(marker, "click", function() {
                            self.filtertable(location.hospitalid);
                            // self.source.add()
                      
                    });
                    }
                      
                  }

            
           );

  }

  filtertable(filter:any){
      this.source.setFilter([{ field: 'hospitalid', search: filter }]);
      this.lastfilter = filter;
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
      this.backandService.create('cases', {
        casetitle: event.newData.casetitle,
        casedescription: event.newData.casedescription,
        hospitalid:this.lastfilter,
        patientid:this.usercases[0].patientid
      }).subscribe(
        data => {
          console.log('caso agregado');
        },
        err => {this.backandService.logError(err);event.confirm.reject();},
        () => {event.confirm.resolve();console.log('created');}
      );   
  }
  onRowSelected(event){
    console.log('fila:',event);
  }
}
