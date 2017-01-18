import {Injectable} from '@angular/core';
import {BaThemeConfigProvider, colorHelper} from '../../../theme';

@Injectable()
export class PieChartService {

  constructor(private _baConfig:BaThemeConfigProvider) {
  }
  hospitalList:any;
  usercases:any;
  userappointment:any;
  // hospitalList:any;
  getData() {

    this.hospitalList = JSON.parse(localStorage.getItem('hospitalmarker'));
    this.usercases = JSON.parse(localStorage.getItem('usercases'));
    this.userappointment = JSON.parse(localStorage.getItem('userappointment'));
    let pieColor = this._baConfig.get().colors.custom.dashboardPieChart;
    // return [
    //   {
    //     color: pieColor,
    //     description: 'New Visits',
    //     stats: '57,820',
    //     icon: 'person',
    //   }, {
    //     color: pieColor,
    //     description: 'Purchases',
    //     stats: '$ 89,745',
    //     icon: 'money',
    //   }, {
    //     color: pieColor,
    //     description: 'Active Users',
    //     stats: '178,391',
    //     icon: 'face',
    //   }, {
    //     color: pieColor,
    //     description: 'Returned',
    //     stats: '32,592',
    //     icon: 'refresh',
    //   }
    // ];
    return [
      {
        color: pieColor,
        description: 'Hospitales',
        stats: this.hospitalList.length,
        icon: 'android-location',
      }, {
        color: pieColor,
        description: 'Casos',
        stats: this.usercases.length,
        icon: 'android-clock',
      }, {
        color: pieColor,
        description: 'Citas',
        stats: this.userappointment.length,
        icon: 'android-book',
      }
    ];
  }
}
