import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localFr from '@angular/common/locales/fr';
import { AppComponent } from './app.component';
import { HotelListComponent } from './hotels/hotel-list/hotel-list.component';
import { ReplaceComma } from './shared/shared/pipes/replace-comma.pipe';
import { StartRatingComponent } from './shared/shared/pipes/components/start-rating/start-rating.component';
import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { HotelDetailComponent } from './hotels/hotel-detail/hotel-detail.component';
import { RouterModule } from '@angular/router';
import { HotelDetailGuard } from './hotels/shared/guards/hotel-detail.guard';
import { HotelModule } from './hotels/hotel.module';
import { AppRoutingModule } from './app-routing.module';
registerLocaleData(localFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    
    
    
    HomeComponent,
    
  ],
  imports: [
    
    BrowserModule,
    FormsModule,
    HttpClientModule,
    
    HotelModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
