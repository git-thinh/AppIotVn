react-native init AppIotVn --version react-native@0.59.10
react-native init AppIotVn
react-native run-android --no-jetifier
yarn remove xxx

rm -rf ios android node_modules

npm install
react-native upgrade

adb connect 127.0.0.1:21503
adb devices
react-native run-android

===================================================================
npm install --save react-native-device-info
npm install --save react-native-webview
npm install --save lodash
npm install --save react-native-elements
npm install --save react-native-fs
npm install --save react-native-vector-icons
npm install --save react-native-camera

npm install --save react-native-swiper
npm install --save react-native-drawer
npm install --save react-native-scrollable-tab-view
===================================================================
npm install --save react-native-firebase
npm install --save react-native-code-push
===================================================================



npm install --save base-64
npm install --save crypto-js
npm install --save utf8


	





===================================================================
# https://github.com/oblador/react-native-vector-icons
npm install --save react-native-vector-icons
-------------------------------------------------------------------
import android.app.Application;

import com.facebook.react.ReactApplication;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;


public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNCWebViewPackage(),
            new VectorIconsPackage()
      );
    }

