import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NextInputDirective } from './next-input.directive';
import { FormManagerDirective } from './form-manager.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [NextInputDirective, FormManagerDirective],
  exports: [NextInputDirective, FormManagerDirective]
})
export class SharedModule {}
