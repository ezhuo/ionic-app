import {
    Component,
    Injector,
    OnInit,
    OnDestroy,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';

import { Slides } from '@ionic/angular';
import { IndexControl } from '@core';

@Component({
    selector: 'page-tutorial',
    templateUrl: 'tutorial.html',
    styleUrls: ['./tutorial.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class TutorialPage extends IndexControl implements OnInit, OnDestroy {
    showSkip = true;

    @ViewChild('slides')
    slides: Slides;

    constructor(protected injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    startApp() {
        this.route
            .navigateByUrl('/app/tabs/(schedule:schedule)')
            .then(() => this.ionStorage.set('ion_did_tutorial', 'true'));
    }

    onSlideChangeStart(event) {
        event.target.isEnd().then(isEnd => {
            this.showSkip = !isEnd;
        });
    }

    // constructor --> ionViewDidLoad --> ionViewWillEnter --> ionViewDidEnter --> ionViewWillLeave --> ionViewDidLeave --> ionViewWillUnload.

    ionViewWillEnter() {
        console.log('ionViewWillEnter');
        this.ionStorage.get('ion_did_tutorial').then(res => {
            if (res) {
                this.route.navigateByUrl('/app/tabs/(schedule:schedule)');
            }
        });

        this.ionMenu.enable(false);
    }

    ionViewDidLeave() {
        console.log('ionViewDidLeave');
        // enable the root left menu when leaving the tutorial page
        this.ionMenu.enable(true);
    }
}
