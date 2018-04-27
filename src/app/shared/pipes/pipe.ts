import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'FilterPipe',
})
export class FilterPipe implements PipeTransform {
    transform(value: any, input: string) {
        if (input) {
            input = input.toLowerCase();
            return value.filter(function (el: any) {
              //console.log(el);
                if(!el.doc){
                  if(el.value.label){
                    return el.value.label.toLowerCase().indexOf(input) > -1;
                  }
                }

                else if(el.doc.feedname){
                    return el.doc.feedname.toLowerCase().indexOf(input) > -1;
                }
            })
        }
        return value;
    }
}

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value:any, words:boolean) {

    if (value) {
      if (words) {
        return value.replace(/\b\w/g, first => first.toLocaleUpperCase());
      } else {
        return value.charAt(0).toUpperCase() + value.slice(1);
      }
    }

    return value;
  }
}