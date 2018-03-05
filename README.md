# Ionic Application

# 基础安装

* npm i
* npm run platform:install
* cordova plugin add --save cordova-plugin-whitelist cordova-plugin-device cordova-plugin-splashscreen cordova-plugin-ionic-webview cordova-plugin-ionic-keyboard

# 常用包安装

* cordova plugin add --save cordova-plugin-statusbar cordova-plugin-camera cordova-plugin-compat cordova-plugin-inappbrowser cordova-plugin-console cordova-plugin-dialogs cordova-plugin-network-information cordova-sqlite-storage cordova.plugins.diagnostic

* cordova plugin add --save cordova-plugin-app-version cordova-plugin-appminimize cordova-plugin-x-toast phonegap-plugin-barcodescanner cordova-plugin-advanced-http cordova-plugin-zip  cordova-plugin-jcore cordova-hot-code-push-plugin https://github.com/Rohfosho/CordovaCallNumberPlugin.git https://github.com/yanxiaojun617/com.kit.cordova.amaplocation

* cordova plugin add --save cordova-plugin-file-transfer cordova-plugin-file cordova-plugin-file-opener2

* cordova plugin add --save https://github.com/Telerik-Verified-Plugins/ImagePicker.git --variable PHOTO_LIBRARY_USAGE_DESCRIPTION="请允许使用图库"
```
安装此插件时，如果发生错误，请一定要删除package.json文件中的 com.synconset.imagepicker 和 cordova-plugin-telerik-imagepicker 等节点，然后再rimraf node_modules ,再执行npm i,
最后，再重新安装
```

* cordova plugin add --save jpush-phonegap-plugin --variable APP_KEY=a0becaf86f63fcdc3bd071e5