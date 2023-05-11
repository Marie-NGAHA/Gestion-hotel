import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { ReplaceComma } from '../shared/shared/pipes/replace-comma.pipe';
import { StartRatingComponent } from '../shared/shared/pipes/components/start-rating/start-rating.component';
import { RouterModule } from '@angular/router';
import { HotelDetailGuard } from './shared/guards/hotel-detail.guard';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { HotelRoutingModule } from './hotel-routing.module';
import { HotelEditComponent } from './hotel-edit/hotel-edit.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HotelData } from './shared/api/hotel.data';



@NgModule({
  declarations: [
    HotelListComponent,
    HotelDetailComponent,
    HotelEditComponent,
    
  ],
  imports: [
    
    
    SharedModule,
    HotelRoutingModule,
    InMemoryWebApiModule.forFeature(HotelData)
  ]
})
export class HotelModule { }
