import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'FilterPipe',
})
export class FilterPipe implements PipeTransform {
    transform(value: any, input: string) {
        if (input) {
            input = input.toLowerCase();
            return value.filter(function (el: any) {
                if(el.value.label){
                //console.log(el);
                return el.value.label.toLowerCase().indexOf(input) > -1;
                }
                else if(el.doc.feedname){
                    return el.doc.feedname.toLowerCase().indexOf(input) > -1;
                }
            })
        }
        return value;
    }
}