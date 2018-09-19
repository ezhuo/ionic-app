import { Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppControl } from '@core';
import { UserData } from './providers/user-data';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent extends AppControl implements OnInit {
    loggedIn = false;
    get platform() {
        return this.injector.get(Platform);
    }
    get splashScreen() {
        return this.injector.get(SplashScreen);
    }
    get statusBar() {
        return this.injector.get(StatusBar);
    }
    get userData() {
        return this.injector.get(UserData);
    }
    constructor(protected injector: Injector) {
        super(injector);
        this.initializeApp();
    }

    ngOnInit() {
        this.checkLoginStatus();
        this.listenForLoginEvents();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    logout() {
        this.userData.logout().then(() => {
            return this.navigate('/app/admin/tabs/(schedule:schedule)');
        });
    }

    openTutorial() {
        this.ionMenu.enable(false);
        this.route.navigateByUrl('/tutorial');
    }

    checkLoginStatus() {
        return this.userData.isLoggedIn().then(loggedIn => {
            return this.updateLoggedInStatus(loggedIn);
        });
    }

    updateLoggedInStatus(loggedIn: boolean) {
        setTimeout(() => {
            this.loggedIn = loggedIn;
        }, 300);
    }

    listenForLoginEvents() {
        this.ionEvents.subscribe('user:login', () => {
            this.updateLoggedInStatus(true);
        });

        this.ionEvents.subscribe('user:signup', () => {
            this.updateLoggedInStatus(true);
        });

        this.ionEvents.subscribe('user:logout', () => {
            this.updateLoggedInStatus(false);
        });
    }
}
