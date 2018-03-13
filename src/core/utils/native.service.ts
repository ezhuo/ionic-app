import { Injectable } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { AppVersion } from "@ionic-native/app-version";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { File, FileEntry } from "@ionic-native/file";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { ImagePicker } from "@ionic-native/image-picker";
import { Network } from "@ionic-native/network";
import { AppMinimize } from "@ionic-native/app-minimize";
import { CallNumber } from "@ionic-native/call-number";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { Diagnostic } from "@ionic-native/diagnostic";
import { Position } from "../model/type";
import { define } from './../public/config';
import { Observable } from "rxjs";
import { LoggerService } from "./logger.service";
import { NoticeService } from "./notice.service";

declare var LocationPlugin;

@Injectable()
export class NativeService {

  constructor(private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private appVersion: AppVersion,
    private camera: Camera,
    private file: File,
    private inAppBrowser: InAppBrowser,
    private imagePicker: ImagePicker,
    private network: Network,
    private appMinimize: AppMinimize,
    private cn: CallNumber,
    private barcodeScanner: BarcodeScanner,
    public logger: LoggerService,
    private diagnostic: Diagnostic,
    public noticeService: NoticeService) { }

  /**
   * 状态栏
   */
  statusBarStyle(): void {
    if (this.isMobile()) {
      this.statusBar.overlaysWebView(false);
      this.statusBar.styleLightContent();
      this.statusBar.backgroundColorByHexString('#488aff');//3261b3
    }
  }

  /**
   * 隐藏启动页面
   */
  splashScreenHide(): void {
    return (this.isMobile() && this.splashScreen.hide());
  }

  /**
   * 获取网络类型 如`unknown`, `ethernet`, `wifi`, `2g`, `3g`, `4g`, `cellular`, `none`
   */
  getNetworkType(): string {
    if (!this.isMobile()) {
      return 'wifi';
    }
    return this.network.type;
  }

  /**
   * 判断是否有网络
   */
  isConnecting(): boolean {
    return this.getNetworkType() != 'none';
  }

  /**
   * 调用最小化app插件
   */
  minimize(): void {
    this.appMinimize.minimize()
  }

  /**
   * 通过浏览器打开url
   */
  openUrlByBrowser(url: string): void {
    this.inAppBrowser.create(url, '_system');
  }


  /**
   * 是否真机环境
   */
  isMobile(): boolean {
    return this.platform.is('mobile') && !this.platform.is('mobileweb');
  }

  /**
   * 是否android真机环境
   */
  isAndroid(): boolean {
    return this.isMobile() && this.platform.is('android');
  }

  /**
   * 是否ios真机环境
   */
  isIos(): boolean {
    return this.isMobile() && (this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone'));
  }

  /**
   * 使用cordova-plugin-camera获取照片
   * @param options
   */
  getPicture(options: CameraOptions = {}): Observable<string> {
    const self = this;
    let ops: CameraOptions = Object.assign({
      sourceType: this.camera.PictureSourceType.CAMERA,//图片来源,CAMERA:拍照,PHOTOLIBRARY:相册
      destinationType: this.camera.DestinationType.DATA_URL,//默认返回base64字符串,DATA_URL:base64   FILE_URI:图片路径
      quality: define.quality_size,//图像质量，范围为0 - 100
      allowEdit: false,//选择图片前是否允许编辑
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: define.image_size,//缩放图像的宽度（像素）
      targetHeight: define.image_size,//缩放图像的高度（像素）
      saveToPhotoAlbum: false,//是否保存到相册
      correctOrientation: true//设置摄像机拍摄的图像是否为正确的方向
    }, options);
    return Observable.create(observer => {
      this.camera.getPicture(ops).then((imgData: string) => {
        if (ops.destinationType === this.camera.DestinationType.DATA_URL) {
          observer.next('data:image/jpg;base64,' + imgData);
        } else {
          observer.next(imgData);
        }
      }).catch(err => {
        if (err == 20) {
          self.noticeService.alert_info('没有权限,请在设置中开启权限');
          return;
        }
        if (String(err).indexOf('cancel') != -1) {
          return;
        }
        this.logger.err(err, '使用cordova-plugin-camera获取照片失败');
        self.noticeService.alert_info('获取照片失败');
        observer.error(false);
      });
    });
  };

  /**
   * 通过拍照获取照片
   * @param options
   */
  getPictureByCamera(options: CameraOptions = {}): Observable<string> {
    let ops: CameraOptions = Object.assign({
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL//DATA_URL: 0 base64字符串, FILE_URI: 1图片路径
    }, options);
    return this.getPicture(ops);
  };

  /**
   * 通过图库获取照片
   * @param options
   */
  getPictureByPhotoLibrary(options: CameraOptions = {}): Observable<string> {
    let ops: CameraOptions = Object.assign({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL//DATA_URL: 0 base64字符串, FILE_URI: 1图片路径
    }, options);
    return this.getPicture(ops);
  };

  /**
   * 通过图库选择多图
   * @param options
   */
  getMultiplePicture(options = {}): Observable<any> {
    let self = this;
    let ops = Object.assign({
      maximumImagesCount: 6,
      width: define.image_size,//缩放图像的宽度（像素）
      height: define.image_size,//缩放图像的高度（像素）
      quality: define.quality_size//图像质量，范围为0 - 100
    }, options);
    return Observable.create(observer => {
      this.imagePicker.getPictures(ops).then(files => {
        let destinationType = options['destinationType'] || 0;//0:base64字符串,1:图片url
        if (destinationType === 1) {
          observer.next(files);
        } else {
          let imgBase64s = [];//base64字符串数组
          for (let fileUrl of files) {
            self.convertImgToBase64(fileUrl).subscribe(base64 => {
              imgBase64s.push(base64);
              if (imgBase64s.length === files.length) {
                observer.next(imgBase64s);
              }
            })
          }
        }
      }).catch(err => {
        this.logger.err(err, '通过图库选择多图失败');
        self.noticeService.alert_info('获取照片失败');
        observer.error(false);
      });
    });
  };

  /**
   * 根据图片绝对路径转化为base64字符串
   * @param path 绝对路径
   */
  convertImgToBase64(path: string): Observable<string> {
    return Observable.create(observer => {
      this.file.resolveLocalFilesystemUrl(path).then((fileEnter: FileEntry) => {
        fileEnter.file(file => {
          let reader = new FileReader();
          reader.onloadend = function (e) {
            observer.next(this.result);
          };
          reader.readAsDataURL(file);
        });
      }).catch(err => {
        this.logger.err(err, '根据图片绝对路径转化为base64字符串失败');
        observer.error(false);
      });
    });
  }

  /**
   * 获得app版本号,如0.01
   * @description  对应/config.xml中version的值
   */
  getVersionNumber(): Observable<string> {
    return Observable.create(observer => {
      this.appVersion.getVersionNumber().then((value: string) => {
        observer.next(value);
      }).catch(err => {
        this.logger.err(err, '获得app版本号失败');
        observer.error(false);
      });
    });
  }

  /**
   * 获得app name,如现场作业
   * @description  对应/config.xml中name的值
   */
  getAppName(): Observable<string> {
    return Observable.create(observer => {
      this.appVersion.getAppName().then((value: string) => {
        observer.next(value);
      }).catch(err => {
        this.logger.err(err, '获得app name失败');
        observer.error(false);
      });
    });
  }

  /**
   * 获得app包名/id,如com.kit.ionic2tabs
   * @description  对应/config.xml中id的值
   */
  getPackageName(): Observable<string> {
    return Observable.create(observer => {
      this.appVersion.getPackageName().then((value: string) => {
        observer.next(value);
      }).catch(err => {
        this.logger.err(err, '获得app包名失败');
        observer.error(false);
      });
    });
  }

  /**
   * 拨打电话
   * @param number
   */
  callNumber(number: string): void {
    this.cn.callNumber(number, true)
      .then(() => console.log('成功拨打电话:' + number))
      .catch(err => this.logger.err(err, '拨打电话失败'));
  }

  /**
   * 扫描二维码
   * @returns {any}
   */
  scan() {
    return Observable.create(observer => {
      this.barcodeScanner.scan().then((barcodeData) => {
        observer.next(barcodeData.text);
      }).catch(err => {
        this.logger.err(err, '扫描二维码失败');
        observer.error(false);
      });
    });
  }

  /**
   * 获得用户当前坐标信息
   * 5秒内只会返回同一结果
   */
  getUserLocation = (() => {
    let lastTime = null; // 缓存上次获取定位时间
    let lastResult = null; // 缓存上次获取的结果
    return () => {
      return Observable.create(observer => {
        // 5秒内有获取过定位则不再重复获取
        if (lastTime && (new Date().getTime() - lastTime < 5000)) {
          if (lastResult) {
            observer.next(lastResult);
          } else {
            // 获取定位是异步,所以这里用定时,直到获取到结果
            let timer = setInterval(() => {
              if (lastResult) {
                clearInterval(timer);
                observer.next(lastResult);
              }
            }, 1000);
          }
        } else {
          lastTime = new Date().getTime(); // 准备获取定位时记录时间
          lastResult = null; // 每次重新获取时,需清空上次结果,以免下次一获取在5秒内直接返回上次结果
          this.getLocation().subscribe(res => {
            lastTime = new Date().getTime(); // 当获取成功,重置上次获取时间
            lastResult = res;
            observer.next(res);
          }, () => {
            lastTime = null;
          });
        }
      });
    };
  })();

  /**
   * 获取位置
   */
  getLocation() {
    const self = this;
    return Observable.create(observer => {
      if (this.isMobile()) {
        // 检查app是否开始位置服务和定位权限.没有则会请求权限
        Observable.zip(this.assertLocationService(), this.assertLocationAuthorization()).subscribe(() => {
          LocationPlugin.getLocation(data => {
            // android返回data形如:{"locationType":4,"latitude":23.119225,"longitude":113.350784,"hasAccuracy":true,"accuracy":29,"address":"广东省广州市天河区潭乐街靠近广电科技大厦","country":"中国","province":"广东省","city":"广州市","district":"天河区","street":"平云路","cityCode":"020","adCode":"440106","aoiName":"广电平云广场","speed":0,"bearing":0,"time":1515976535559}
            // 其中locationType为定位来源.定位类型对照表: http://lbs.amap.com/api/android-location-sdk/guide/utilities/location-type/
            // iOS只会返回data形如:{longitude: 113.35081420800906, latitude: 23.119172707345594}
            console.log('定位信息', data);
            observer.next({ 'lng': data.longitude, 'lat': data.latitude });
          }, msg => {
            if (msg.indexOf('缺少定位权限') != -1 || (this.isIos() && msg.indexOf('定位失败') != -1)) {

              self.noticeService.alert_confirm('请在手机设置或app权限管理中开启', '缺少定位权限', '去开启')
                .then(() => {
                  this.diagnostic.switchToSettings();
                })

            } else if (msg.indexOf('WIFI信息不足') != -1) {
              alert('定位失败,请确保连上WIFI或者关掉WIFI只开流量数据')
            } else if (msg.indexOf('网络连接异常') != -1) {
              alert('网络连接异常,请检查您的网络是否畅通')
            } else {
              alert('获取位置错误,错误消息:' + msg);
              this.logger.err(msg, '获取位置失败');
            }
            observer.error('获取位置失败');
          });
        }, err => {
          observer.error(err);
        })
      } else {
        console.log('非手机环境,即测试环境返回固定坐标');
        observer.next({ 'lng': 113.350912, 'lat': 23.119495 });
      }
    });
  }

  public assertNetwork() {
    if (!this.isConnecting()) {
      this.noticeService.alert({
        message: '未检测到网络,请连接网络',
        showCloseButton: true,
        closeButtonText: '确定'
      });
    }
  }

  //检测app位置服务是否开启
  private assertLocationService = (() => {
    let enabledLocationService = false;//手机是否开启位置服务
    const self = this;
    return () => {
      return Observable.create(observer => {
        if (enabledLocationService) {
          observer.next(true);
        } else {
          this.diagnostic.isLocationEnabled().then(enabled => {
            if (enabled) {
              enabledLocationService = true;
              observer.next(true);
            } else {
              enabledLocationService = false;
              self.noticeService.alert_confirm('正在获取位置信息', '您未开启位置服务', '去开启')
                .then(() => {
                  this.diagnostic.switchToLocationSettings();
                })
              observer.error(false);
            }
          }).catch(err => {
            this.logger.err(err, '调用diagnostic.isLocationEnabled方法失败');
            observer.error(false);
          });
        }
      });
    };
  })();

  //检测app是否有定位权限,如果没有权限则会请求权限
  private assertLocationAuthorization = (() => {
    let locationAuthorization = false;
    const self = this;
    return () => {
      return Observable.create(observer => {
        if (locationAuthorization) {
          observer.next(true);
        } else {
          this.diagnostic.isLocationAuthorized().then(res => {
            if (res) {
              locationAuthorization = true;
              observer.next(true);
            } else {
              locationAuthorization = false;
              this.diagnostic.requestLocationAuthorization('always').then(res => {//请求定位权限
                if (res == 'DENIED_ALWAYS') {//拒绝访问状态,必须手动开启
                  locationAuthorization = false;
                  self.noticeService.alert_confirm('请在手机设置或app权限管理中开启', '缺少定位权限', '去开启')
                    .then(() => {
                      this.diagnostic.switchToSettings();
                    })
                  observer.error(false);
                } else {
                  locationAuthorization = true;
                  observer.next(true);
                }
              }).catch(err => {
                this.logger.err(err, '调用diagnostic.requestLocationAuthorization方法失败');
                observer.error(false);
              });
            }
          }).catch(err => {
            this.logger.err(err, '调用diagnostic.isLocationAvailable方法失败');
            observer.error(false);
          });
        }
      });
    };
  })();

  /**
   * 检测app是否有读取存储权限,如果没有权限则会请求权限
   */
  externalStoragePermissionsAuthorization = (() => {
    let havePermission = false;
    const self = this;
    return () => {
      return Observable.create(observer => {
        if (havePermission) {
          observer.next(true);
        } else {
          let permissions = [this.diagnostic.permission.READ_EXTERNAL_STORAGE, this.diagnostic.permission.WRITE_EXTERNAL_STORAGE];
          this.diagnostic.getPermissionsAuthorizationStatus(permissions).then(res => {
            if (res.READ_EXTERNAL_STORAGE == 'GRANTED' && res.WRITE_EXTERNAL_STORAGE == 'GRANTED') {
              havePermission = true;
              observer.next(true);
            } else {
              havePermission = false;
              this.diagnostic.requestRuntimePermissions(permissions).then(res => {//请求权限
                if (res.READ_EXTERNAL_STORAGE == 'GRANTED' && res.WRITE_EXTERNAL_STORAGE == 'GRANTED') {
                  havePermission = true;
                  observer.next(true);
                } else {
                  havePermission = false;

                  self.noticeService.alert_confirm('请在手机设置或app权限管理中开启', '缺少定位权限', '去开启')
                    .then(() => {
                      this.diagnostic.switchToSettings();
                    })

                  observer.error(false);
                }
              }).catch(err => {
                this.logger.err(err, '调用diagnostic.requestRuntimePermissions方法失败');
                observer.error(false);
              });
            }
          }).catch(err => {
            this.logger.err(err, '调用diagnostic.getPermissionsAuthorizationStatus方法失败');
            observer.error(false);
          });
        }
      });
    };
  })();

}
