import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HotelDetailComponent } from './hotels/hotel-detail/hotel-detail.component';
import { HotelDetailGuard } from './hotels/shared/guards/hotel-detail.guard';
import { HotelListComponent } from './hotels/hotel-list/hotel-list.component';



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot([
      {path: 'home',component:HomeComponent},
      {path: '',redirectTo:'home',pathMatch:'full'},
      {
        path:'hotels/:id',component:HotelDetailComponent,
        canActivate: [HotelDetailGuard]

    
    },
      {path: 'hotels',component:HotelListComponent},
      {path:'**', redirectTo:'home',pathMatch:'full'}
    ]),
  ]
})
export class AppRoutingModule { }
