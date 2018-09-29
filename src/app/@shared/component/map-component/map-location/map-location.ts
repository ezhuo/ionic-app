import {
    Component,
    Injector,
    OnInit,
    OnDestroy,
    AfterContentInit,
    ViewEncapsulation,
    Input,
} from '@angular/core';
import { IndexControl } from '@core';
import { SearchAddress } from '../search-address/search-address';
import { Navigation } from '../navigation/navigation';

@Component({
    selector: 'page-map-location',
    templateUrl: 'map-location.html',
    styleUrls: [`./map-location.scss`],
    encapsulation: ViewEncapsulation.None,
})
export class MapLocation extends IndexControl
    implements OnInit, OnDestroy, AfterContentInit {
    map: any; // 地图对象
    mapIsComplete = false; // 地图是否加载完成
    isPositioning = false; // 是否正在定位
    marker: any; // 标注
    showIonFab = false; // 是否显示导航按钮

    // 使用参考:src\pages\mine\work-map\work-map.ts
    static defaultParams = {
        draggable: true, // 标注是否可以拖拽;
        click: false, // 地图是否点击改变标注的位置
        searchBar: true, // 是否显示搜索框
        navigation: true, // 是否显示导航按钮
        address: '', // 主页面传过来的地址
        position: {
            lng: '',
            lat: '',
        }, // 主页面传过来的坐标
    };

    @Input()
    params = MapLocation.defaultParams;

    constructor(protected injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestory() {
        super.ngOnDestroy();
    }

    ngAfterContentInit() {
        this.loadMap();
        setTimeout(() => {
            if (!this.map) {
                this.loadMap();
            }
        }, 3000);
    }

    // 加载地图
    private loadMap() {
        const that = this;
        try {
            that.map = new AMap.Map('map-share', {
                view: new AMap.View2D({
                    // 创建地图二维视口
                    zoom: 16, // 设置地图缩放级别
                    rotateEnable: true,
                    showBuildingBlock: true,
                    baseRender: 'd',
                }),
            });

            that.map.on('complete', () => {
                that.mapIsComplete = true;
                AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], () => {
                    // 添加工具条和比例尺
                    that.map.addControl(new AMap.ToolBar());
                });
                const existPosition =
                    that.params.position &&
                    that.params.position.lat &&
                    that.params.position.lng;
                if (existPosition) {
                    // 判断主页面传过来的是坐标就直接描点标注
                    that.drawMarker(that.params.position);
                } else if (!existPosition && that.params.address) {
                    // 判断主页面传过来的是地址就跳转到地址搜索地址页面,返回确定的地址
                    that.locationSearch();
                } else {
                    // 主页面不传address和position就直接定位到当前位置
                    that.mapLocation();
                }

                // 判断是否可以点击地图改变标注位置
                if (that.params.click) {
                    that.map.on('click', e => {
                        const position = {
                            lng: e.lnglat.getLng(),
                            lat: e.lnglat.getLat(),
                        };
                        that.drawMarker(position);
                    });
                }
            });
            window['HomeAMap'] = this.map;
        } catch (err) {
            that.mapIsComplete = false;
            that.noticeSrv.msgInfo('地图加载失败,请检查网络或稍后再试.');
        }
    }

    // 跳转到地址查询搜索页面,并返回一个地址对象(经纬坐标+中文地址)
    async locationSearch() {
        const locationSearchModal = await this.modalSrv.modalCtrl.create({
            component: SearchAddress,
            componentProps: {
                address: this.params.address || '',
            },
        });
        await locationSearchModal.present();
        // locationSearchModal.onDidDismiss(item => {
        //     if (item) {
        //         this.drawMarker(item.location, item.name);
        //     }
        // });
    }

    // 定位当前地址
    mapLocation() {
        const that = this;
        that.isPositioning = true;
        that.ionSrv.gets.getUserLocation().subscribe(
            position => {
                that.drawMarker(position);
                that.isPositioning = false;
            },
            () => {
                that.isPositioning = false;
            },
        );
    }

    // 描点标注
    private drawMarker(position, addressName = '') {
        const that = this;
        that.params.position = position;
        that.map.clearMap();

        // 配置需要显示搜索框就根据传进来的position参数给搜索框赋值
        if (that.params.searchBar) {
            if (addressName) {
                that.params.address = addressName;
            } else {
                that.geocoder(new AMap.LngLat(position.lng, position.lat));
            }
        }

        that.marker = new AMap.Marker({
            map: that.map,
            draggable: that.params.draggable, // 控制标注是否可以拖拽
            position: new AMap.LngLat(position.lng, position.lat),
        });

        // 配置需要搜索框才执行
        if (that.params.navigation && that.marker) {
            that.showIonFab = true;
        }

        // 拖拽标注
        that.marker.on('dragend', e => {
            const position = {
                lng: e.lnglat.getLng(),
                lat: e.lnglat.getLat(),
            };
            that.drawMarker(position);
        });
        that.map.setFitView();
    }

    // 根据经纬坐标获取对应的地址
    private geocoder(position) {
        const that = this;
        const geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: 'all',
        });
        geocoder.getAddress(position, (status, result) => {
            if (status === 'complete' && result.info === 'OK') {
                // 获得了有效的地址信息:
                const addressComponent = result.regeocode.addressComponent;
                that.params.address =
                    addressComponent.district +
                    addressComponent.township +
                    addressComponent.street +
                    addressComponent.streetNumber;
            } else {
                that.params.address = '';
            }
        });
    }

    // 导航函数
    async mapNavigation(navigationType) {
        // 1驾车,2公交,3步行
        const markerPosition = this.marker.getPosition();
        if (!markerPosition) {
            this.noticeSrv.msg('请先搜索要去的地点');
            return;
        }
        this.modalSrv.create(Navigation, {
            navigationType: navigationType,
            markerLocation: {
                lng: markerPosition.lng,
                lat: markerPosition.lat,
            },
        });
    }
}
