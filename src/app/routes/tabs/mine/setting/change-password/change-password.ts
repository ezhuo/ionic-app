import {
    Component,
    ViewEncapsulation,
    OnInit,
    OnDestroy,
    Injector,
} from '@angular/core';
import { ModalControl } from '@core';

@Component({
    selector: 'tabs-mine-change-password',
    templateUrl: 'change-password.html',
    styleUrls: [`./change-password.scss`],
    encapsulation: ViewEncapsulation.None,
})
export class TabsMineChangePassword extends ModalControl
    implements OnInit, OnDestroy {
    form: any;
    strength = {
        low: false,
        middle: false,
        high: false,
    };
    verifyMessages = {
        oldPsw: {
            errorMsg: '',
            required: '旧密码为必填项',
        },
        newPsw: {
            errorMsg: '',
            required: '新密码为必填项',
            minlength: '密码最少4个字符',
        },
        newPsw2: {
            errorMsg: '',
            required: '请重复输入新密码',
            minlength: '密码最少4个字符',
        },
    };

    constructor(protected injector: Injector) {
        super(injector);
        this.form = this.FormBuilder.group({
            oldPsw: ['', [this.Validators.required]],
            newPsw: [
                '',
                [this.Validators.required, this.Validators.minLength(4)],
            ],
            newPsw2: [
                '',
                [this.Validators.required, this.Validators.minLength(4)],
            ],
        });
        this.form.valueChanges.subscribe(data => {
            const verifyMessages = this.verifyMessages;
            Object.keys(verifyMessages).forEach(field => {
                verifyMessages[field].errorMsg = '';
                const control = this.form.get(field);
                if (control && control.dirty && !control.valid) {
                    const messages = verifyMessages[field];
                    Object.keys(control.errors).forEach(key => {
                        messages[key] &&
                            (verifyMessages[field].errorMsg +=
                                messages[key] + ' ');
                    });
                }
            });
        });
    }

    onSubmit() {
        const oldPsw = this.form.value.oldPsw;
        const newPsw = this.form.value.newPsw;
        const newPsw2 = this.form.value.newPsw2;
        if (newPsw2 != newPsw) {
            this.noticeSrv.alertInfo('新密码两次输入不一致');
            return;
        }
        // this.mineService.updateUserPassword(oldPsw, newPsw).subscribe(res => {
        //     this.nativeService.showToast('密码修改成功');
        //     this.dismiss();
        // });
    }

    dismiss() {
        this.modalClose();
    }

    input(val) {
        const m = this.checkPass(val);
        if (m >= 3) {
            this.strength.high = true;
        }
        if (m == 2) {
            this.strength.high = false;
            this.strength.middle = true;
        }
        if (m < 2) {
            this.strength.high = false;
            this.strength.middle = false;
            this.strength.low = true;
        }
    }

    /**
     * 密码强度
     * @param pwd
     * @returns {number}
     */
    private checkPass(pwd) {
        let m = 0;
        if (pwd.length <= 4) {
            return m; // 密码长度小于等于4
        }
        if (/\d/.test(pwd)) {
            m++; // 纯数字密码
        }
        if (/[a-z]/.test(pwd)) {
            m++; // 密码包含小写字母
        }
        if (/[A-Z]/.test(pwd)) {
            m++; // 密码包含大写字母
        }
        if (/\W/.test(pwd)) {
            m++; // 密码包含特殊字符
        }
        if (pwd.length > 15) {
            m = 4; // 密码长度大于15
        }
        return m;
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
