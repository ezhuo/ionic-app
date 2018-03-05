import {Component, ViewChild, ElementRef} from "@angular/core";
import {IonicPage, NavParams, ViewController} from "ionic-angular";
import {NativeService} from "../../../../core/services/NativeService";
declare var AMap;
/**
 * Generated class for the Navigation page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-navigation',
  templateUrl: 'navigation.html',
})
export class Navigation {

  @ViewChild('panel') panel: ElementRef;
  navigationType:number;
  navigationIsReady: boolean = false;
  walkNavigationIsReady: boolean = false;
  map;
  startPoint;
  endPoint;

  constructor(private viewCtrl: ViewController,
              private nativeService: NativeService,
              private navParams: NavParams) {
    this.navigationType = this.navParams.get("navigationType");
    this.endPoint = this.navParams.get("markerLocation");
    this.map = window['HomeAMap'];
  }

  ngAfterContentInit() {
    this.nativeService.showLoading();
    let options = {city: '广州市', panel: this.panel.nativeElement, map: this.map};
    if (this.navigationType == 1) {
      AMap.service('AMap.Driving', () => {
        this.doSearch(new AMap.Driving(options));
        this.navigationIsReady = true;
      });
    } else if (this.navigationType == 2) {
      AMap.service('AMap.Transfer', () => {
        this.doSearch(new AMap.Transfer(options));
      });
    } else if (this.navigationType == 3) {
      AMap.service('AMap.Walking', () => {
        this.doSearch(new AMap.Walking(options));
        this.walkNavigationIsReady = true;
      });
    }
  }

  doSearch(navigationService) {
    this.nativeService.getUserLocation().subscribe(location => {
      this.map.clearMap();
      this.startPoint = location;
      navigationService.search([this.startPoint.lng, this.startPoint.lat], [this.endPoint.lng, this.endPoint.lat], (status, result) => {
        this.nativeService.hideLoading();
        console.log(status);
        console.log(result);
      });
    },()=>{
      this.nativeService.hideLoading();
    })
  }

  doNavigation(type) {// 0实时导航,1模拟导航
    this.nativeService.navigation(this.startPoint, this.endPoint, type).subscribe(message => {
      console.log(message);
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
