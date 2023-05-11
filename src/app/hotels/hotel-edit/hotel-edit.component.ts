import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelListService } from '../shared/services/hotel-list.service';
import { IHotel } from '../shared/models/hotel';

@Component({
  selector: 'app-hotel-edit',
  templateUrl: './hotel-edit.component.html',
  styleUrls: ['./hotel-edit.component.css']
})
export class HotelEditComponent implements OnInit{

  public hotelform!: FormGroup;

  public hotel!: IHotel;

  public pageTitle!: string;

  public errorMessage!: string

  constructor(
    
    private fb: FormBuilder,
    
    private route: ActivatedRoute,

    private router: Router,

    private hotelService: HotelListService
    
    
    ){}


  ngOnInit(): void {
    this.hotelform = this.fb.group({
      hotelName:['',Validators.required],
      price:['',Validators.required],
      rating:[''],
      description:[''],
      tags: this.fb.array([])


    });

    this.route.paramMap.subscribe(params => {
      this.getSelectedHotel(params.get('id'))
    });
    
  }

  public hideError(): void{
    this.errorMessage = " ";
  }



  public get tags(): FormArray {
    return this.hotelform.get('tags') as FormArray;
  }

  public addTags(): void {
    this.tags.push(new FormControl());
  }

  public deleteTag(index: number):void{
    this.tags.removeAt(index);
    this.tags.markAsDirty();
  }






  public getSelectedHotel(id: any): void{ 
    this.hotelService.getHotelById(id).subscribe((hotel: IHotel) => {
      this.displayModel(hotel);
    });


  }
  public displayModel(hotel: IHotel): void{
    this.hotel = hotel;
    this.pageTitle = `Créer un hotel`;

    if(this.hotel?.id || 0 != 0){
      this.pageTitle = `modifier l\'hotel ${this.hotel.hotelName}`;
      this.hotelform.patchValue({
        hotelName: this.hotel?.hotelName,
        price: this.hotel?.price,
        rating: this.hotel?.rating,
        description: this.hotel?.description
      });
      this.hotelform.setControl('tags',this.fb.array(this.hotel.tags || []));



    } else {
      this.hotelform.patchValue({
        hotelName: "",
        hotelPrice: 0,
        starRating: "",
        description: "",
      })
    }


    

  }



  public saveHotel(): void{
    if(this.hotelform.valid){
      if(this.hotelform.dirty) {

        const hotel: IHotel = {
          ...this.hotel,
          ...this.hotelform.value

        };

        if(hotel.id === 0){
          this.hotelService.createHotel(hotel).subscribe({
            next: () => this.savedCompleted(),
            error: (err) => this.errorMessage = err
          });
        }else{
          this.hotelService.updateHotel(hotel).subscribe({
            next: () => this.savedCompleted(),
            error: (err) => this.errorMessage = err 
          });
        }
      }
    }
    console.log(this.hotelform.value);

  }

  public savedCompleted(): void{
    this.hotelform.reset();
    this.router.navigate(['/hotels']);
  }

  public deleteHotel(): void {
    if (confirm (`voulez vous reelement suprimer ${this.hotel.hotelName}?`)) {
      this.hotelService.deleteHotel(this.hotel.id).subscribe({
        next: () => this.savedCompleted()
      });
    }
  }




}
