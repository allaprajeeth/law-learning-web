import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumValue'
})
export class EnumValuePipe implements PipeTransform {
  transform(value: string | undefined, enumType: any): string {
    if (!value || !enumType[value]) {
      return '';
    }
    return enumType[value];
  }
}