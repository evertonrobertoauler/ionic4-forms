import { Directive } from '@angular/core';

@Directive({
  selector: '[appFormManager]'
})
export class FormManagerDirective {
  private inputs = [];

  constructor() {}

  register(input) {
    this.inputs = [...this.inputs, input];

    if (this.inputs.length === 1) {
      console.log('focus');
      setTimeout(() => this.inputs[0].focus(), 500);
    }
  }

  goToNextInput(input) {
    const index = this.inputs.findIndex(i => i === input);
    if (this.inputs[index + 1]) {
      this.inputs[index + 1].focus();
    }
  }
}
