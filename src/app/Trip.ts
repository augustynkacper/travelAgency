import { IReview } from "./IReview";


export interface Trip {
    name: string;
    country: string;
    startDate: string;
    endDate: string;
    price: number;
    freePlaces: number;
    img: string;  //link to an image
    id : number;
    reviews:number;
    stars: number;
    detailedReviews: IReview[];
}