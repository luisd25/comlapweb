import {Component, ElementRef} from '@angular/core';
import {BackandService} from 'angular2bknd-sdk';
// import {GoogleMapsLoader} from './googleMaps.loader';

@Component({
  selector: 'google-maps',
  styles: [require('./googleMaps.scss')],
  template: require('./googleMaps.html'),
})
export class GoogleMaps {
  public hospitalList: any;
 
  constructor(private _elementRef:ElementRef,private backandService:BackandService) {
  }

  ngAfterViewInit() {
    
    // let map = this._elementRef.nativeElement.querySelector('.google-maps');

    // TODO: do not load this each time as we already have the library after first attempt
    // GoogleMapsLoader.load((google) => {
    //   new google.maps.Map(map, {
    //     center: new google.maps.LatLng(44.5403, -78.5463),
    //     zoom: 8,
    //     mapTypeId: google.maps.MapTypeId.ROADMAP
    //   });
    // });

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
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP
            
        };
        var map = new google.maps.Map(this._elementRef.nativeElement.querySelector('.google-maps'), mapProp);

        

        // To add the marker to the map, call setMap();
        
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
                    }
                      // marker.setMap(map);
                  }

            
           );

  }
  ngOnInit() {


        
    }

    loadhospital(){
      
    }
}
