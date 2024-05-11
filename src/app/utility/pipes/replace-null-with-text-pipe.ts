import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'replaceNullWithText'
})
export class ReplaceNullWithTextPipe implements PipeTransform {
    transform(value: any, replaceText: string = '-'): any {
        return value || value === 0 ? value : replaceText;
    }
}

// usage
// {{ book | replaceNullWithText:'Book Name Not Available'}}
// {{ book | replaceNullWithText }}