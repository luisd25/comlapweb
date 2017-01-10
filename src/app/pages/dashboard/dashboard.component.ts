import {Component, ViewEncapsulation} from '@angular/core';
import { BaThemeSpinner } from '../../theme/services';

@Component({
  selector: 'dashboard',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./dashboard.scss')],
  template: require('./dashboard.html')
})
export class Dashboard {

  constructor(private _spinner: BaThemeSpinner) {
  }
  ngAfterViewInit(){
    this._spinner.hide();
  }

}
