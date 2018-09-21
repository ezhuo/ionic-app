import { Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { IndexControl } from '@core';
import { UserData } from './providers/user-data';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent extends IndexControl implements OnInit {
    loggedIn = false;
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
        this.ionNativeSrv.platform.ready().then(() => {
            this.ionNativeSrv.statusBar.styleDefault();
            this.ionNativeSrv.splashScreen.hide();
        });
    }

    logout() {
        this.userData.logout().then(() => {
            return this.navigate('/app/tabs/(schedule:schedule)');
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
