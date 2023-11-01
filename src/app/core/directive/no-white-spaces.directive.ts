import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[noWhiteSpaces]',
})
export class NoWhiteSpacesDirective {
  constructor(private element: ElementRef) {}

  @HostListener('input', ['$event'])
  public onInputChange(event: KeyboardEvent): void {
    const initalValue = this.element.nativeElement.value;
    this.element.nativeElement.value = initalValue.replace(/\s*/g, '');
    if (initalValue !== this.element.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
