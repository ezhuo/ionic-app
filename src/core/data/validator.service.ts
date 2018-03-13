import { Injectable } from "@angular/core";
import { Validators as angularValidators, AbstractControl } from '@angular/forms';

@Injectable()
export class ValidatorService extends angularValidators {

  /*E-mail*/
  static email = function (control: AbstractControl) {
    return ValidatorService.validatorsByPattern('email', control, '([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?');
  };

  /*手机号码*/
  static phone = function (control: AbstractControl) {
    return ValidatorService.validatorsByPattern('phone', control, '1[0-9]{10,10}');
  };

  /*中文*/
  static chinese = function (control: AbstractControl) {
    return ValidatorService.validatorsByPattern('chinese', control, '[(\u4e00-\u9fa5)]+');
  };

  /*英文、数字包括下划线*/
  static legallyNamed = function (control: AbstractControl) {
    return ValidatorService.validatorsByPattern('legallyNamed', control, '[A-Za-z0-9_]+');
  };

  private static validatorsByPattern = function (name: string, control: AbstractControl, pattern: string) {
    let validatorFn = ValidatorService.pattern(pattern)(control);
    if (validatorFn != null) {
      validatorFn[name] = validatorFn['pattern'];
    }
    return validatorFn;
  };
}
