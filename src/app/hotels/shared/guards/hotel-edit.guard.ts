import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HotelEditComponent } from '../../hotel-edit/hotel-edit.component';

@Injectable({
  providedIn: 'root'
})
export class HotelEditGuard implements CanDeactivate<HotelEditComponent> {
  canDeactivate(
    component: HotelEditComponent): boolean  {
      if(component.hotelform.dirty){
        const hotelName = component.hotelform.get('hotelName') || 'Nouveau hotel' ;
        return confirm(`Voulez vous annuler les changements effectués sur ${hotelName}`);
      }
    return true;
  }
  
}
