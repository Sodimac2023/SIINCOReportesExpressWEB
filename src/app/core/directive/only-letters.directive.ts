import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[onlyLetters]',
})
export class OnlyLettersDirective {
  private regex: RegExp = new RegExp(/^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/g);
  private specialKeys: Array<string> = [
    'Backspace',
    'Tab',
    'End',
    'Home',
    'Delete',
    'ArrowLeft',
    'ArrowRight',
    'Control',
  ];

  constructor(private el: ElementRef) {}

  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    // Allow Backspace, tab, end, and home keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    const current: string = this.el.nativeElement.value;
    const next: string = current.concat(event.key);
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    if (event.clipboardData != undefined) {
      const pastedInput: string = event.clipboardData
        .getData('text/plain')
        .replace(/[^A-Za-zÀ-ÖØ-öø-ÿ ]/g, '');
      document.execCommand('insertText', false, pastedInput);
    }
  }
}
