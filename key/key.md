## 生成KEY
* keytool -genkey -v -alias zishikeji -keyalg RSA -keystore zs.keystore -dname "CN=www.zishikeji.com,OU=xxx,O=xxx,L=
hangzhou,ST=hangzhou,C=china" -storepass zishikeji@888 -keypass zishikeji@888 -validity 36500
* 将zs.keystore 和 release-signing.properties 文件复制到platforms/android目录下

## 生成高德地图KEY

* keytool -v -list -keystore F:\zs_root\pinggu\app\key\zs.keystore
* keytool -v -list -keystore ./key/zs.keystore