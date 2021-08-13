import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class StripeService {

        constructor( private http: HttpClient){

        }
        charge(cantidad, tokenId){
            return this.http.post("http://localhost:3000/ProyectoStripeBack",{
                stripeToken: tokenId,
                cantidad:cantidad
            }).toPromise();

        }
}
