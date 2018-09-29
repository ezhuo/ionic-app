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
        address: '花园soho', // 主页面传过来的地址
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
        try {
            this.map = new AMap.Map('map-share', {
                view: new AMap.View2D({
                    // 创建地图二维视口
                    zoom: 16, // 设置地图缩放级别
                    rotateEnable: true,
                    showBuildingBlock: true,
                    baseRender: 'd',
                }),
            });

            this.map.on('complete', () => {
                this.mapIsComplete = true;
                AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], () => {
                    // 添加工具条和比例尺
                    this.map.addControl(new AMap.ToolBar());
                });
                const existPosition =
                    this.params.position &&
                    this.params.position.lat &&
                    this.params.position.lng;
                if (existPosition) {
                    // 判断主页面传过来的是坐标就直接描点标注
                    this.drawMarker(this.params.position);
                } else if (!existPosition && this.params.address) {
                    // 判断主页面传过来的是地址就跳转到地址搜索地址页面,返回确定的地址
                    this.locationSearch();
                } else {
                    // 主页面不传address和position就直接定位到当前位置
                    this.mapLocation();
                }

                // 判断是否可以点击地图改变标注位置
                if (this.params.click) {
                    this.map.on('click', e => {
                        const position = {
                            lng: e.lnglat.getLng(),
                            lat: e.lnglat.getLat(),
                        };
                        this.drawMarker(position);
                    });
                }
            });
            window['HomeAMap'] = this.map;
        } catch (err) {
            this.mapIsComplete = false;
            this.noticeSrv.msgInfo('地图加载失败,请检查网络或稍后再试.');
        }
    }

    // 跳转到地址查询搜索页面,并返回一个地址对象(经纬坐标+中文地址)
    async locationSearch() {
        const locationSearchModal = await this.modalSrv.create(SearchAddress, {
            address: this.params.address || '',
        });
        console.log(locationSearchModal);
        locationSearchModal.onDidDismiss().then((item: any) => {
            item = item.data || item;
            if (item) {
                this.drawMarker(item.location, item.name);
            }
        });
    }

    // 定位当前地址
    mapLocation() {
        this.isPositioning = true;
        this.ionSrv.gets.getUserLocation().subscribe(
            position => {
                this.drawMarker(position);
                this.isPositioning = false;
            },
            () => {
                this.isPositioning = false;
            },
        );
    }

    // 描点标注
    private drawMarker(position, addressName = '') {
        this.params.position = position;
        this.map.clearMap();

        // 配置需要显示搜索框就根据传进来的position参数给搜索框赋值
        if (this.params.searchBar) {
            if (addressName) {
                this.params.address = addressName;
            } else {
                this.geocoder(new AMap.LngLat(position.lng, position.lat));
            }
        }

        this.marker = new AMap.Marker({
            map: this.map,
            draggable: this.params.draggable, // 控制标注是否可以拖拽
            position: new AMap.LngLat(position.lng, position.lat),
        });

        // 配置需要搜索框才执行
        if (this.params.navigation && this.marker) {
            this.showIonFab = true;
        }

        // 拖拽标注
        this.marker.on('dragend', e => {
            const position = {
                lng: e.lnglat.getLng(),
                lat: e.lnglat.getLat(),
            };
            this.drawMarker(position);
        });
        this.map.setFitView();
    }

    // 根据经纬坐标获取对应的地址
    private geocoder(position) {
        const geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: 'all',
        });
        geocoder.getAddress(position, (status, result) => {
            if (status === 'complete' && result.info === 'OK') {
                // 获得了有效的地址信息:
                const addressComponent = result.regeocode.addressComponent;
                this.params.address =
                    addressComponent.district +
                    addressComponent.township +
                    addressComponent.street +
                    addressComponent.streetNumber;
            } else {
                this.params.address = '';
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
