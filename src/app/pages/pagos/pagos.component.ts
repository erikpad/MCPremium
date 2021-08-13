import { AfterViewInit, Component, ElementRef, NgZone , OnInit, ViewChild } from '@angular/core';
import { StripeService } from './stripe.service';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})

export class PagosComponent implements ElementRef {
  
  @ViewChild('cardInfo') cardInfo: ElementRef;
  cardError: string;
  card:any;

  constructor(
    private ngZone: NgZone,
    private stripeService: StripeService 
    ) {     }
  nativeElement: any;

  
  ngAfterViewInit(){
      this.card = elements.create('card');
      this.card.mount(this.cardInfo.nativeElement);
      this.card.addEventListener('change', this.onChange.bind(this));  
  }

  onChange({error}){ {
      if(error) {
          this.ngZone.run(() => this.cardError = 'message');
      }else{
        this.ngZone = null;
      }

   }
  }

  async unClick(){
    const{ token, error} = await stripe.createToken(this.card);
    if (token) {
     const response = await this.stripeService.charge(100, token.id);
     console.log(response);
    } else {
      this.ngZone.run(() => this.cardError = error.message);
    }
  }
}
