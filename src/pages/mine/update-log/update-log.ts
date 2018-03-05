import {Component} from '@angular/core';
import {VersionService} from "../../../core/services/VersionService";

@Component({
  selector: 'page-update-log',
  templateUrl: 'update-log.html'
})
export class UpdateLogPage {

  versions = [];

  constructor(public versionService: VersionService) {
    this.versionService.getVersionList().subscribe(versions => {
      this.versions = versions;
    });
  }


}
