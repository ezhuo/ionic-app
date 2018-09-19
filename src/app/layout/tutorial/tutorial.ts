import {
    Component,
    Injector,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';

import { Slides } from '@ionic/angular';
import { ParentIndexControl } from '@core';

@Component({
    selector: 'page-tutorial',
    templateUrl: 'tutorial.html',
    styleUrls: ['./tutorial.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class TutorialPage extends ParentIndexControl {
    showSkip = true;

    @ViewChild('slides')
    slides: Slides;

    constructor(protected injector: Injector) {
        super(injector);
    }

    startApp() {
        this.route
            .navigateByUrl('/app/admin/tabs/(schedule:schedule)')
            .then(() => this.ionStorage.set('ion_did_tutorial', 'true'));
    }

    onSlideChangeStart(event) {
        event.target.isEnd().then(isEnd => {
            this.showSkip = !isEnd;
        });
    }

    ionViewWillEnter() {
        this.ionStorage.get('ion_did_tutorial').then(res => {
            if (res) {
                this.route.navigateByUrl('/app/admin/tabs/(schedule:schedule)');
            }
        });

        this.ionMenu.enable(false);
    }

    ionViewDidLeave() {
        // enable the root left menu when leaving the tutorial page
        this.ionMenu.enable(true);
    }
}
