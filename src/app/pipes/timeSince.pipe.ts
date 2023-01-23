import { Pipe, PipeTransform } from '@angular/core';
/*
 * Formats the date so we know how time has passed
 * Usage:
 *   value | timeSince
 * Example:
 *   {{  Fri Sep 18 21:33:00 UTC 2020 | timeSince }}
 *   formats to: 3 years ago
*/
@Pipe({name: 'timeSince'})
export class TimeSincePipe implements PipeTransform {
  transform(dateString: Date | string): string {
    const date = new Date(dateString);
    const seconds = Math.floor((new Date().valueOf() - date.valueOf()) / 1000);

    let interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + " year/s ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " month/s ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " day/s ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hour/s ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minute/s ago";
    }
    return Math.floor(seconds) + " second/s ago";
  }
}