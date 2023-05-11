import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StartRatingComponent } from './shared/pipes/components/start-rating/start-rating.component';
import { ReplaceComma } from './shared/pipes/replace-comma.pipe';



@NgModule({
  declarations: [
    StartRatingComponent,
    ReplaceComma
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StartRatingComponent,
    ReplaceComma
  ]
})
export class SharedModule { }
