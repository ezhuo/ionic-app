import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

/**
 * Generated class for the GetLocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-get-location',
  templateUrl: 'get-location.html',
})
export class GetLocationPage {
  params = {
    draggable: true,
    click: true,
    searchBar: true,
    navigation: true,
    address: '',
    position: {
      lng: '',
      lat: ''
    }
  };
  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public navParams: NavParams) {
    Object.assign(this.params, this.navParams.get('params'));
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }


  save(){
    this.viewCtrl.dismiss(this.params.position);
  }

}
