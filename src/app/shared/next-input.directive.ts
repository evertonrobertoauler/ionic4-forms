import { Directive, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { fromEvent, Subscription, of } from 'rxjs';
import { switchMap, filter, delay } from 'rxjs/operators';
import { FormManagerDirective } from './form-manager.directive';

@Directive({
  selector: '[appNextInput]'
})
export class NextInputDirective implements OnInit, OnDestroy {
  private sub: Subscription;
  private input: HTMLInputElement;
  private button: HTMLButtonElement;

  constructor(private el: ElementRef, private form: FormManagerDirective) {}

  ngOnInit() {
    this.form.register(this);

    switch (this.el.nativeElement.nodeName) {
      case 'ION-BUTTON':
        of(1)
          .pipe(delay(500))
          .subscribe(() => {
            const nodes = Array.from(this.el.nativeElement.shadowRoot.childNodes);
            this.button = nodes.find((n: any) => n.nodeName === 'BUTTON') as any;
          });
        break;
      case 'ION-INPUT':
        this.sub = fromEvent(this.el.nativeElement, 'ionInputDidLoad')
          .pipe(
            switchMap(() => {
              const nodes = Array.from(this.el.nativeElement.shadowRoot.childNodes);
              this.input = nodes.find((n: any) => n.nodeName === 'INPUT') as any;
              return fromEvent(this.input, 'keydown').pipe(filter((e: any) => e.keyCode === 13));
            })
          )
          .subscribe(() => this.form.goToNextInput(this));
        break;
    }
  }

  ngOnDestroy() {
    if (this.sub instanceof Subscription) {
      this.sub.unsubscribe();
    }
  }

  focus() {
    if (this.input) {
      this.input.focus();
    } else if (this.button) {
      this.button.focus();
    }
  }
}
