import { Observable, zip } from 'rxjs';
import { IonicService } from './ionic.service';
import { CameraOptions, FileEntry } from './native.plugins';

import { define } from '../config.inc';
import { Position } from '../model';

export class NativeGets {
    private __ionicSrv: IonicService;
    get ionSrv() {
        return this.__ionicSrv;
    }

    constructor(ionicService: IonicService) {
        this.__ionicSrv = ionicService;
    }

    /**
     * 获取网络类型 如`unknown`, `ethernet`, `wifi`, `2g`, `3g`, `4g`, `cellular`, `none`
     */
    getNetworkType(): string {
        if (!this.ionSrv.app.isMobile()) {
            return 'wifi';
        }
        return this.ionSrv.network.type;
    }

    /**
     * 使用cordova-plugin-camera获取照片
     * @param options
     */
    getPicture(options: CameraOptions = {}): Observable<string> {
        const ops: CameraOptions = {
            sourceType: this.ionSrv.camera.PictureSourceType.CAMERA, // 图片来源,CAMERA:拍照,PHOTOLIBRARY:相册
            destinationType: this.ionSrv.camera.DestinationType.FILE_URI, // 默认返回图片路径：DATA_URL:base64字符串，FILE_URI:图片路径
            quality: define.quality_size, // 图像质量，范围为0 - 100
            allowEdit: false, // 选择图片前是否允许编辑
            encodingType: this.ionSrv.camera.EncodingType.JPEG,
            targetWidth: define.image_size, // 缩放图像的宽度（像素）
            targetHeight: define.image_size, // 缩放图像的高度（像素）
            saveToPhotoAlbum: false, // 是否保存到相册
            correctOrientation: true,
            ...options,
        };
        return Observable.create(observer => {
            this.ionSrv.camera
                .getPicture(ops)
                .then((imgData: string) => {
                    if (
                        ops.destinationType ===
                        this.ionSrv.camera.DestinationType.DATA_URL
                    ) {
                        observer.next('data:image/jpg;base64,' + imgData);
                    } else {
                        observer.next(imgData);
                    }
                })
                .catch(err => {
                    if (err == 20) {
                        this.ionSrv.noticeSrv.alertInfo(
                            '没有权限,请在设置中开启权限',
                        );
                    } else if (String(err).indexOf('cancel') != -1) {
                        console.log('用户点击了取消按钮');
                    } else {
                        this.ionSrv.logger.log(
                            err,
                            '使用cordova-plugin-camera获取照片失败',
                        );
                        this.ionSrv.noticeSrv.alert('获取照片失败');
                    }
                    observer.error(false);
                });
        });
    }

    /**
     * 通过图库选择多图
     * @param options
     */
    getMultiplePicture(options = {}): Observable<any> {
        const that = this;
        const ops = {
            maximumImagesCount: 6,
            width: define.image_size, // 缩放图像的宽度（像素）
            height: define.image_size, // 缩放图像的高度（像素）
            quality: define.quality_size,
            ...options,
        };
        return Observable.create(observer => {
            this.ionSrv.imagePicker
                .getPictures(ops)
                .then(files => {
                    const destinationType = options['destinationType'] || 0; // 0:base64字符串,1:图片url
                    if (destinationType === 1) {
                        observer.next(files);
                    } else {
                        const imgBase64s = []; // base64字符串数组
                        for (const fileUrl of files) {
                            that.convertImgToBase64(fileUrl).subscribe(
                                base64 => {
                                    imgBase64s.push(base64);
                                    if (imgBase64s.length === files.length) {
                                        observer.next(imgBase64s);
                                    }
                                },
                            );
                        }
                    }
                })
                .catch(err => {
                    this.ionSrv.logger.log(err, '通过图库选择多图失败');
                    this.ionSrv.noticeSrv.alert('获取照片失败');
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
            this.ionSrv.appVersion
                .getVersionNumber()
                .then((value: string) => {
                    observer.next(value);
                })
                .catch(err => {
                    this.ionSrv.logger.log(err, '获得app版本号失败');
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
            this.ionSrv.appVersion
                .getAppName()
                .then((value: string) => {
                    observer.next(value);
                })
                .catch(err => {
                    this.ionSrv.logger.log(err, '获得app name失败');
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
            this.ionSrv.appVersion
                .getPackageName()
                .then((value: string) => {
                    observer.next(value);
                })
                .catch(err => {
                    this.ionSrv.logger.log(err, '获得app包名失败');
                    observer.error(false);
                });
        });
    }

    /**
     * 拨打电话
     * @param number
     */
    getCallNumber(num: string): void {
        // this.cn
        //     .callNumber(num, true)
        //     .then(() => console.log('成功拨打电话:' + num))
        //     .catch(err => this.ionSrv.logger.log(err, '拨打电话失败'));
    }

    /**
     * 扫描二维码
     * @returns {any}
     */
    getScan() {
        return Observable.create(observer => {
            this.ionSrv.barcodeScanner
                .scan()
                .then(barcodeData => {
                    observer.next(barcodeData.text);
                })
                .catch(err => {
                    this.ionSrv.logger.log(err, '扫描二维码失败');
                    observer.error(false);
                });
        });
    }

    /**
     * 获得用户当前坐标信息
     * 5秒内只会返回同一结果
     */
    getUserLocation = (() => {
        let lastTime = null; //  缓存上次获取定位时间
        let lastResult = null; //  缓存上次获取的结果
        return () => {
            return Observable.create(observer => {
                //  5秒内有获取过定位则不再重复获取
                if (lastTime && new Date().getTime() - lastTime < 5000) {
                    if (lastResult) {
                        observer.next(lastResult);
                    } else {
                        //  获取定位是异步,所以这里用定时,直到获取到结果
                        const timer = setInterval(() => {
                            if (lastResult) {
                                clearInterval(timer);
                                observer.next(lastResult);
                            }
                        }, 1000);
                    }
                } else {
                    lastTime = new Date().getTime(); //  准备获取定位时记录时间
                    lastResult = null; //  每次重新获取时,需清空上次结果,以免下次一获取在5秒内直接返回上次结果
                    this.getLocation().subscribe(
                        res => {
                            lastTime = new Date().getTime(); //  当获取成功,重置上次获取时间
                            lastResult = res;
                            observer.next(res);
                        },
                        () => {
                            lastTime = null;
                        },
                    );
                }
            });
        };
    })();

    /**
     * 获取位置
     */
    getLocation() {
        return Observable.create(observer => {
            if (this.ionSrv.app.isMobile()) {
                //  检查app是否开始位置服务和定位权限.没有则会请求权限
                zip(
                    this.assertLocationService(),
                    this.assertLocationAuthorization(),
                ).subscribe(
                    () => {
                        LocationPlugin.getLocation(
                            data => {
                                //  android返回data形如:{"locationType":4,"latitude":23.119225,"longitude":113.350784,"hasAccuracy":true,"accuracy":29,"address":"广东省广州市天河区潭乐街靠近广电科技大厦","country":"中国","province":"广东省","city":"广州市","district":"天河区","street":"平云路","cityCode":"020","adCode":"440106","aoiName":"广电平云广场","speed":0,"bearing":0,"time":1515976535559}
                                //  其中locationType为定位来源.定位类型对照表: http://lbs.amap.com/api/android-location-sdk/guide/utilities/location-type/
                                //  iOS只会返回data形如:{longitude: 113.35081420800906, latitude: 23.119172707345594}
                                console.log('定位信息', data);
                                observer.next({
                                    lng: data.longitude,
                                    lat: data.latitude,
                                });
                            },
                            msg => {
                                if (
                                    msg.indexOf('缺少定位权限') != -1 ||
                                    (this.ionSrv.app.isIos() &&
                                        msg.indexOf('定位失败') != -1)
                                ) {
                                    this.ionSrv.noticeSrv
                                        .alertConfirm(
                                            '请在手机设置或app权限管理中开启',
                                            '缺少定位权限',
                                            '去开启',
                                        )
                                        .then(() => {
                                            this.ionSrv.diagnostic.switchToSettings();
                                        })
                                        .catch(() => {});
                                } else if (msg.indexOf('WIFI信息不足') != -1) {
                                    alert(
                                        '定位失败,请确保连上WIFI或者关掉WIFI只开流量数据',
                                    );
                                } else if (msg.indexOf('网络连接异常') != -1) {
                                    alert(
                                        '网络连接异常,请检查您的网络是否畅通',
                                    );
                                } else {
                                    alert('获取位置错误,错误消息:' + msg);
                                    this.ionSrv.logger.log(msg, '获取位置失败');
                                }
                                observer.error('获取位置失败');
                            },
                        );
                    },
                    err => {
                        observer.error(err);
                    },
                );
            } else {
                console.log('非手机环境,即测试环境返回固定坐标');
                observer.next({ lng: 113.350912, lat: 23.119495 });
            }
        });
    }

    // 检测app位置服务是否开启
    private assertLocationService = (() => {
        let enabledLocationService = false; // 手机是否开启位置服务
        return () => {
            return Observable.create(observer => {
                if (enabledLocationService) {
                    observer.next(true);
                } else {
                    this.ionSrv.diagnostic
                        .isLocationEnabled()
                        .then(enabled => {
                            if (enabled) {
                                enabledLocationService = true;
                                observer.next(true);
                            } else {
                                enabledLocationService = false;
                                this.ionSrv.noticeSrv
                                    .alertConfirm(
                                        '正在获取位置信息',
                                        '您未开启位置服务',
                                        '去开启',
                                    )
                                    .then(() => {
                                        this.ionSrv.diagnostic.switchToLocationSettings();
                                    })
                                    .catch(() => {});
                                observer.error(false);
                            }
                        })
                        .catch(err => {
                            this.ionSrv.logger.log(
                                err,
                                '调用diagnostic.isLocationEnabled方法失败',
                            );
                            observer.error(false);
                        });
                }
            });
        };
    })();

    // 检测app是否有定位权限,如果没有权限则会请求权限
    private assertLocationAuthorization = (() => {
        let locationAuthorization = false;
        return () => {
            return Observable.create(observer => {
                if (locationAuthorization) {
                    observer.next(true);
                } else {
                    this.ionSrv.diagnostic
                        .isLocationAuthorized()
                        .then(res => {
                            if (res) {
                                locationAuthorization = true;
                                observer.next(true);
                            } else {
                                locationAuthorization = false;
                                this.ionSrv.diagnostic
                                    .requestLocationAuthorization('always')
                                    .then(res => {
                                        // 请求定位权限
                                        if (res == 'DENIED_ALWAYS') {
                                            // 拒绝访问状态,必须手动开启
                                            locationAuthorization = false;
                                            this.ionSrv.noticeSrv
                                                .alertConfirm(
                                                    '请在手机设置或app权限管理中开启',
                                                    '缺少定位权限',
                                                    '去开启',
                                                )
                                                .then(() => {
                                                    this.ionSrv.diagnostic.switchToSettings();
                                                });
                                            observer.error(false);
                                        } else {
                                            locationAuthorization = true;
                                            observer.next(true);
                                        }
                                    })
                                    .catch(err => {
                                        this.ionSrv.logger.log(
                                            err,
                                            '调用diagnostic.requestLocationAuthorization方法失败',
                                        );
                                        observer.error(false);
                                    });
                            }
                        })
                        .catch(err => {
                            this.ionSrv.logger.log(
                                err,
                                '调用diagnostic.isLocationAvailable方法失败',
                            );
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
        return () => {
            return Observable.create(observer => {
                if (havePermission) {
                    observer.next(true);
                } else {
                    const permissions = [
                        this.ionSrv.diagnostic.permission.READ_EXTERNAL_STORAGE,
                        this.ionSrv.diagnostic.permission
                            .WRITE_EXTERNAL_STORAGE,
                    ];
                    this.ionSrv.diagnostic
                        .getPermissionsAuthorizationStatus(permissions)
                        .then(res => {
                            if (
                                res.READ_EXTERNAL_STORAGE == 'GRANTED' &&
                                res.WRITE_EXTERNAL_STORAGE == 'GRANTED'
                            ) {
                                havePermission = true;
                                observer.next(true);
                            } else {
                                havePermission = false;
                                this.ionSrv.diagnostic
                                    .requestRuntimePermissions(permissions)
                                    .then(res => {
                                        // 请求权限
                                        if (
                                            res.READ_EXTERNAL_STORAGE ==
                                                'GRANTED' &&
                                            res.WRITE_EXTERNAL_STORAGE ==
                                                'GRANTED'
                                        ) {
                                            havePermission = true;
                                            observer.next(true);
                                        } else {
                                            havePermission = false;
                                            this.ionSrv.noticeSrv
                                                .alertConfirm(
                                                    '请在手机设置或app权限管理中开启',
                                                    '缺少读取存储权限',
                                                    '去开启',
                                                )
                                                .then(() => {
                                                    this.ionSrv.diagnostic.switchToSettings();
                                                })
                                                .catch(() => {});
                                            observer.error(false);
                                        }
                                    })
                                    .catch(err => {
                                        this.ionSrv.logger.log(
                                            err,
                                            '调用diagnostic.requestRuntimePermissions方法失败',
                                        );
                                        observer.error(false);
                                    });
                            }
                        })
                        .catch(err => {
                            this.ionSrv.logger.log(
                                err,
                                '调用diagnostic.getPermissionsAuthorizationStatus方法失败',
                            );
                            observer.error(false);
                        });
                }
            });
        };
    })();

    /**
     * 地图导航
     * @param startPoint 开始坐标
     * @param endPoint 结束坐标
     * @param type 0驾车实时导航,1驾车模拟导航,2步行实时导航,3步行模拟导航.默认为0
     */
    navigation(
        startPoint: Position,
        endPoint: Position,
        type = 1,
    ): Observable<string> {
        return Observable.create(observer => {
            if (
                this.ionSrv.platform.is('mobile') &&
                !this.ionSrv.platform.is('hybrid')
            ) {
                AMapNavigation.navigation(
                    {
                        lng: startPoint.lng,
                        lat: startPoint.lat,
                    },
                    {
                        lng: endPoint.lng,
                        lat: endPoint.lat,
                    },
                    type,
                    message => {
                        observer.next(message);
                    },
                    err => {
                        this.ionSrv.logger.log(err, '导航失败');
                        this.ionSrv.noticeSrv.alert('导航失败');
                        observer.error(false);
                    },
                );
            } else {
                this.ionSrv.noticeSrv.alert('非手机环境不能导航');
                observer.error(false);
            }
        });
    }

    /**
     * 根据图片绝对路径转化为base64字符串
     * @param path 绝对路径
     */
    convertImgToBase64(path: string): Observable<string> {
        return Observable.create(observer => {
            this.ionSrv.file
                .resolveLocalFilesystemUrl(path)
                .then((fileEnter: FileEntry) => {
                    fileEnter.file(file => {
                        const reader = new FileReader();
                        reader.onloadend = function(e) {
                            observer.next(this.result);
                        };
                        reader.readAsDataURL(file);
                    });
                })
                .catch(err => {
                    this.ionSrv.logger.log(
                        err,
                        '根据图片绝对路径转化为base64字符串失败',
                    );
                    observer.error(false);
                });
        });
    }
}
