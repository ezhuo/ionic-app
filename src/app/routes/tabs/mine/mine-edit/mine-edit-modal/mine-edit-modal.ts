import {
    Component,
    ViewEncapsulation,
    OnInit,
    OnDestroy,
    Injector,
} from '@angular/core';
import { ModalControl } from '@core';

@Component({
    selector: 'tabs-mine-edit-modal',
    templateUrl: 'mine-edit-modal.html',
    styleUrls: [`./mine-edit-modal.scss`],
    encapsulation: ViewEncapsulation.None,
})
export class TabsMineEditModal extends ModalControl
    implements OnInit, OnDestroy {
    userInfo;
    userForm: any;
    verifyMessages = {
        name: {
            errorMsg: '',
            required: '用户名为必填项',
            minlength: '姓名最少2个字符',
            chinese: '姓名必须是中文',
        },
        phone: {
            errorMsg: '',
            required: '手机号码为必填项',
            phone: '请输入正确的手机号码',
        },
        email: {
            errorMsg: '',
            required: '电子邮箱为必填项',
            email: '请输入正确的邮箱地址',
        },
    };

    constructor(protected injector: Injector) {
        super(injector);

        // this.userInfo = this.globalData.user;
        this.userForm = this.FormBuilder.group({
            name: [
                this.userInfo.realname,
                [
                    this.Validators.required,
                    this.Validators.minLength(2),
                    // this.Validators.chinese,
                ],
            ],
            mobileNumber: [
                this.userInfo.mobileNumber,
                [
                    this.Validators.required,
                    // this.Validators.phone
                ],
            ],
            email: [
                this.userInfo.email,
                [this.Validators.required, this.Validators.email],
            ],
        });
        this.userForm.valueChanges.subscribe(data => {
            const verifyMessages = this.verifyMessages;
            Object.keys(verifyMessages).forEach(field => {
                verifyMessages[field].errorMsg = '';
                const control = this.userForm.get(field);
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
        Object.assign(this.userInfo, this.userForm.value);
        this.ionSrv.storage.set('UserInfo', this.userInfo);
        this.noticeSrv.msgInfo('保存成功');
        this.modalClose(this.userInfo);
    }

    dismiss() {
        this.modalClose();
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
