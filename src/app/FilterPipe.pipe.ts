import { Pipe, PipeTransform } from '@angular/core';
import { FilterObject } from './FilterObject';
import { Trip } from './Trip';

@Pipe({
    name: 'myfilter',
    pure: false
})
export class MyFilterPipe implements PipeTransform {
    
    transform(items: Trip[], filter: FilterObject): any {
        if (!items || !filter) {
            return items;
        }
        return items.filter(item => {
            
            if (filter.minPrice>item.price) return false;
            if (filter.maxPrice<item.price) return false;
            if (filter.countries.length!=0 && filter.countries.indexOf(item.country) === -1) return false;

            let d1 = new Date(item.startDate)
            let d2 = new Date(item.endDate)
            let d3 = new Date(filter.startDate)
            let d4 = new Date(filter.endDate)
            if(d1<d3) return false;
            if(d2 > d4) return false;
            
            return true;
        });
       
    }



}