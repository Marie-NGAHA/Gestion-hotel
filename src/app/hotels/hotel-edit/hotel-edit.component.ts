import { AfterViewInit, Component, ElementRef, OnInit , ViewChild, ViewChildren} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelListService } from '../shared/services/hotel-list.service';
import { IHotel } from '../shared/models/hotel';
import { GlobalGenericValidator } from '../shared/validators/global-generic.validator';
import { EMPTY, Observable, debounce, debounceTime, fromEvent, merge, timer } from 'rxjs';
import { NumberValidators } from '../shared/validators/numbers.validator';

@Component({
  selector: 'app-hotel-edit',
  templateUrl: './hotel-edit.component.html',
  styleUrls: ['./hotel-edit.component.css']
})
export class HotelEditComponent implements OnInit, AfterViewInit{

  @ViewChildren(FormControlName, {read: ElementRef}) inputElements!: ElementRef[];

 


  public hotelform!: FormGroup;

  public hotel!: IHotel;

  public pageTitle!: string;

  public errorMessage!: string;

  public formErrors: { [key: string]: {[key: string]: string} } |any = {};

  private validationMessages: { [key: string]: {[key: string]: string} } = {
    hotelName: {
      required: 'Le nom de l\'hotel est obligatoire',
      minlength: 'Le nom de l\'hotel doit comporter au moins 4 caractères'
    },
    price:{
      redquired: 'Le prix de l\'hotel est obligatoire',
      pattern: 'Le prix de l\'hotel doit etre un nombre'
    },
    rating: {
      range: 'Donnez une note comprise entre 1 et 5'
    }
  };

  private globalGenericValidator!: GlobalGenericValidator;

  private isFormSubmitted!: boolean;


  constructor(
    
    private fb: FormBuilder,
    
    private route: ActivatedRoute,

    private router: Router,

    private hotelService: HotelListService
    
    
    ){}
  


  ngOnInit(): void {
    this.globalGenericValidator = new GlobalGenericValidator(this.validationMessages);
    
    this.hotelform = this.fb.group({
      hotelName:['',
        [Validators.required, Validators.minLength(4)]],
      price:['',
      [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      rating:['', NumberValidators.range(1,5)],
      description:[''],
      tags: this.fb.array([])


    });
    

    this.route.paramMap.subscribe(params => {
      this.getSelectedHotel(params.get('id'))
    });
    
  }

  ngAfterViewInit(){

  const formControlBlurs: Observable<unknown>[] = this.inputElements
    .map((formControlElemRef: ElementRef) => fromEvent (formControlElemRef.nativeElement, 'blur'));

  merge(this.hotelform.valueChanges, ...formControlBlurs)
    .pipe(
      //debounceTime(800)
      (() => this.isFormSubmitted ? EMPTY : timer(800))
      )
    .subscribe(() => {
       this.formErrors = this.globalGenericValidator.createErrorMessage(this.hotelform), this.isFormSubmitted;
       console.log('errors: ', this.formErrors);
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
    this.isFormSubmitted = true;

    this.hotelform.updateValueAndValidity({
      onlySelf:true,
      emitEvent: true
    });
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
    } else {
      this.errorMessage = 'Corrigez les erreurs svp'
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
