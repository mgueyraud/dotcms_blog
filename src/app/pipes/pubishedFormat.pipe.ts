import { Pipe, PipeTransform } from '@angular/core';
/*
 * Formats the date 
 * Usage:
 *   value | publishedFormat
 * Example:
 *   {{  Fri Sep 18 21:33:00 UTC 2020 | publishedFormat }}
 *   formats to: Sep 18, 2020
*/
@Pipe({name: 'publishedFormat'})
export class PublishedFormatPipe implements PipeTransform {
  transform(dateString: Date | string): string {
    const date = new Date(dateString);

    return `${date.toLocaleString('default', {month: 'short'})} ${date.getDate()}, ${date.getFullYear()}`;
  }
}