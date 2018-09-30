# 养老服务需求评估系统

> android APP , ionic1.3.3 ，angular.js 1.5.3

## 安装

* npm i
* npm run platform
* npm run serve
* npm run live
* npm run dev
* npm run build
* npm run release

## 编译

* ionic cordova build android --release
* ionic cordova platform add android --save
* ionic cordova platform rm android --save
* git config --system core.longpaths true

## 调试 1

* ionic serve -lc
* ionic cordova run android --device --livereload
* ionic serve --address 192.168.168.202
* weinre --boundHost 192.168.168.202
* chrome://inspect/#devices
* 然后运行 ionic cordova run android -l -c -s 或者 ionic cordova emulate android -lcs
* ios 运行 ionic run/emulate ios -livereload -consolelogs -serverlogs
* ionic serve -lc 感觉 ionic serve 已经支持热更新了，好像没有必要加上-lc 这个调试参数，谷歌浏览器本身就有 APP 模式，加上这个参数以后可以在地址后面加上平台参数来模拟平台如http://localhost:8100?ionicplatform=android
* ionic cordova run android 在 android 模拟器或者真机上运行
* ionic cordova run android -lc 可以在真机上远程调试
* ionic cordova run android --device
* ionic cordova run android --prod --release
* ionic cordova build android --prod --release 生成发布的 apk

## 生成资源

* ionic cordova resources

## 热更新

* cordova-hcp build 将 conrdova-hcp.json 文件中 content_url , update 复制到 chcp.json 到这个中
* cordova-hcp server
* cordova build --chcp-dev

## 生成 key

    另一种配置方法是使用 Gradle ，一个 Android 的自动化构建工具。
    cordova build android 的过程其实就是使用它。
    你要在 platforms/android 目录下建立 release-signing.properties 文件，内容类似下面这样：
    storeFile=relative/path/to/keystore
    storePassword=SECRET1
    keyAlias=ALIAS_NAME
    keyPassword=SECRET2

## 重置 ionic

* ionic state reset

## 连接不上手机

* adb start-server 启动服务
* adb kill-server 停止服务
* adb devices 查看已连接设备

## 编译过程错误（先清除平台，再编辑）

* 如果在编译中发生错误，极有可能是plugin版本不对，或android版本不对，解决办法是 npm run unplatform 删除当前系统及plugin，并且一定要保证config.xml的plugin版本是最新的可用的，最好用 https://www.npmjs.com/package/package 查询下版本
* 删除 C:\Users\Administrator\.gradle\caches 缓存
* cordova clean android
* cordova build android

## install plugin

```
删除 package.json 文件中 的 plugins 节点 和 config.xml 中的所有 <plugin 再进行如下安装
```


```
--apache & ionic----------
*  cordova plugin add --save cordova-plugin-whitelist cordova-plugin-statusbar cordova-plugin-device cordova-plugin-splashscreen cordova-plugin-inappbrowser cordova-plugin-camera cordova-plugin-dialogs cordova-plugin-geolocation cordova-plugin-network-information
*  cordova plugin add --save cordova-plugin-file  cordova-plugin-file-transfer cordova-plugin-ionic-webview cordova-plugin-ionic-keyboard
--other----------
*  cordova plugin add --save cordova-hot-code-push-plugin cordova-plugin-app-version cordova-plugin-datepicker   cordova-plugin-x-toast cordova.plugins.diagnostic phonegap-plugin-barcodescanner cordova-plugin-appminimize
*  cordova plugin add --save cordova-plugin-telerik-imagepicker --variable PHOTO_LIBRARY_USAGE_DESCRIPTION="请允许使用图库"
```

## remove plugin

```
*  cordova plugin rm --save cordova-plugin-whitelist cordova-plugin-statusbar cordova-plugin-device cordova-plugin-splashscreen cordova-plugin-inappbrowser cordova-plugin-camera cordova-plugin-dialogs cordova-plugin-geolocation cordova-plugin-network-information
*  cordova plugin rm --save cordova-plugin-file  cordova-plugin-file-transfer cordova-plugin-ionic-webview cordova-plugin-ionic-keyboard
--other----------
*  cordova plugin rm --save cordova-hot-code-push-plugin cordova-plugin-app-version  cordova-plugin-datepicker   cordova-plugin-x-toast cordova.plugins.diagnostic phonegap-plugin-barcodescanner cordova-plugin-appminimize
*  cordova plugin rm --save cordova-plugin-telerik-imagepicker --variable PHOTO_LIBRARY_USAGE_DESCRIPTION="请允许使用图库"
```

## 编译不通的组件
``` 
* cordova plugin add --save https://github.com/namedjw/com.kit.cordova.amaplocation.git --variable KEY=418d3ef19c3b375b61c6e7c38e3794e8
这个plugin 有可能引起编译不通过，需要降到6.4

* cordova plugin add --save cordova-plugin-file-opener2 call-number

* cordova plugin add --save https://github.com/DaiHuaXieHuaKai/GaoDeLocation.git --variable API_KEY=418d3ef19c3b375b61c6e7c38e3794e8

cordova-plugin-compat 这个plugins 是为解决兼容性问题，但已经不再使用了，一用就编译就会有问题
```

## 闪退
```
* cordova plugin add  --save cordova-plugin-app-update
```


npm i -g ionic@3.20.0