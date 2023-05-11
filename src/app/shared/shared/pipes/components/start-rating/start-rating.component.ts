import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";


@Component({
    selector:'app-start-rating',
    templateUrl: './start-rating.component.html',
    styleUrls: ['./start-rating.component.css']
})

export class StartRatingComponent implements OnChanges{
    
    public starwidth!: number;

    @Input()

    public rating: number = 2;

    @Output()

    public starRatingClicked: EventEmitter<string> = new EventEmitter<string>();

     

    ngOnChanges() {
        this.starwidth = this.rating * 125 /5;
        
    }
    
    public sendRating(): void{
        this.starRatingClicked.emit(`la note est de ${this.rating}`)

    }

}