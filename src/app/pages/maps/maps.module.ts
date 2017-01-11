import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { routing }       from './maps.routing';
import { Maps } from './maps.component';
import { BubbleMaps } from './components/bubbleMaps/bubbleMaps.component';
import { GoogleMaps } from './components/googleMaps/googleMaps.component';
import { LeafletMaps } from './components/leafletMaps/leafletMaps.component';
import { LineMaps } from './components/lineMaps/lineMaps.component';
import { BubbleMapsService } from './components/bubbleMaps/bubbleMaps.service';
import { LineMapsService } from './components/lineMaps/lineMaps.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SmartTablesService } from './components/googleMaps/smartTables.service';
import { SmartTables } from './components/smartTables/smartTables.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    Ng2SmartTableModule
  ],
  declarations: [
    Maps,
    BubbleMaps,
    GoogleMaps,
    LeafletMaps,
    LineMaps,
    SmartTables
  ],
  providers: [
    BubbleMapsService,
    LineMapsService,
    SmartTablesService
  ]
})
export default class MapsModule {}
