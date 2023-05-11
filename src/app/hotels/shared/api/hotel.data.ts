import {InMemoryDbService, RequestInfo} from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { IHotel } from '../models/hotel';


export class HotelData implements InMemoryDbService {

    createDb(): Record<string, IHotel[]>{

        const hotels: IHotel[] = [
            {
                id: 1,
                hotelName: "Buea sweet life",
                description: "belle vue au bord de la mer",
                price: 230.5,
                imageUrl : "assets/img/hotel-room.jpg",
                rating: 3.5,
                tags: ['nouveau']
            },{
                id: 2,
               hotelName: "Marakech",
                description: "profitez de la vue sur les montagnes",
                price: 145.5,
                imageUrl : "assets/img/window.jpg",
                rating: 5,
                tags: ['nouveau']
            },{
                id: 3,
                hotelName: "SEME BEACH",
                description: "profitez de la vue sur la mer",
                price: 120.5,
                imageUrl : "assets/img/indoors.jpg",
                rating: 4,
                tags: ['nouveau']
            },{
                id: 4,
                hotelName: "cape town city",
                description: "profitez de la vie en campagne",
                price: 155.5,
                imageUrl : "assets/img/the-interior.jpg",
                rating: 2.5,
                tags: ['nouveau']
            }

        ];

        return{hotels};
    }

    genId(hotels: IHotel[]): number{
        return hotels.length > 0 ? Math.max(...hotels.map(hotel => hotel.id)) + 1 : 1;
    }

}