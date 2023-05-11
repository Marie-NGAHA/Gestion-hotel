import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { IHotel } from "../models/hotel";
import { tap, catchError, map , of} from "rxjs";


@Injectable(
    {
       providedIn: 'root' 
    }
)


export class HotelListService{

    private readonly HOTEL_API_URL = 'api/hotels';

    constructor(private http: HttpClient){

    }
    
    
    public getHotels(): Observable<IHotel[]> {
        return this.http.get<IHotel[]>(this.HOTEL_API_URL).pipe(
           tap(hotels => console.log('hotels:', hotels)),
           catchError(this.handleError)

        );
        
    }

    public getHotelById(id: number): Observable<any> {
      const url = `${this.HOTEL_API_URL}/${id} `;
      if (id == 0){
        return of(this.getDefaultHotel());
      }
      return this.http.get<IHotel>(url).pipe(
        catchError(this.handleError)
      );
    }

    public createHotel(hotel: IHotel): Observable<IHotel>{
      hotel = {
        ...hotel,
        imageUrl: "assets/img/the-interior.jpg",
       // id: 0,
      };

      return this.http.post<IHotel>(this.HOTEL_API_URL, hotel).pipe(
        catchError(this.handleError)
      );
    }

    public updateHotel(hotel: IHotel): Observable<any>{
      const url = `${this.HOTEL_API_URL}/${hotel.id}`;
      return this.http.put(url, hotel).pipe(
        catchError(this.handleError)
      );
    }

    public deleteHotel(id: number): Observable<{}> {
      const url = `${this.HOTEL_API_URL}/${id}`;
      return this.http.delete<IHotel>(url).pipe(
        catchError(this.handleError)
      );
    }



    private getDefaultHotel(): IHotel{
      return{
        id: 0,
        hotelName: '',
        description: '',
        price : 0,
        rating: 0,
        imageUrl: '',
      }
    }

    private handleError(error: HttpErrorResponse) {
        let errorMessage: string;
      
        if (error.status === 0) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
          errorMessage = `An error occured: ${error.error.message}`;
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong.
          console.error(
            `Backend returned code ${error.status}, ' + 'body was: `, error.error);
            errorMessage =  `Backend returned code ${error.status}, body was: ${error.error} ` ;
        }
        // Return an observable with a user-facing error message.
        return throwError( 'Something bad happened; please try again later.' + '\n' + errorMessage);
    }

}