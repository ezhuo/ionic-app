import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[autosize]', // Attribute selector
})
export class AutosizeDirective {
    @HostListener('input', ['$event.target'])
    onInput(textArea: HTMLTextAreaElement): void {
        this.adjust();
    }

    constructor(public element: ElementRef) {
        console.log('Hello AutosizeDirective Directive');
    }

    ngOnInit(): void {
        setTimeout(() => this.adjust(), 0);
    }

    adjust(): void {
        const textArea = this.element.nativeElement.getElementsByTagName(
            'textarea',
        )[0];
        textArea.style.overflow = 'hidden';
        textArea.style.height = 'auto';
        textArea.style.height = textArea.scrollHeight + 'px';
    }
}
