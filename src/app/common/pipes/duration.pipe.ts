import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let days: any;
    let seconds: any;
    let minutes: any;
    let hours: any;

    if (args[0] === 'ms' && args[1] === 'hhmmss') {
      seconds = Math.floor((value / 1000) % 60);
      minutes = Math.floor(((value / (1000 * 60)) % 60));
      hours = Math.floor((value / (1000 * 60 * 60)));
      return this.duration(args[1], seconds, minutes, hours, days);

    } else if (args[0] === 's' && args[1] === 'hhmmss') {
      seconds = Math.floor((value % 60));
      minutes = Math.floor(((value / 60) % 60));
      hours = Math.floor(((value / 60) / 60));
      return this.duration(args[1], seconds, minutes, hours, days);

    } else if (args[0] === 'ms' && (args[1] === 'ddhhmmss' || args[1] === 'ddhhmmssLong')) {
      seconds = Math.floor(((value / 1000) % 60));
      minutes = Math.floor((value / (1000 * 60) % 60));
      hours = Math.floor((value / (1000 * 60 * 60) % 24));
      days = Math.floor((value / (1000 * 60 * 60 * 24)));
      return this.duration(args[1], seconds, minutes, hours, days);

    } else if (args[0] === 's' && (args[1] === 'ddhhmmss' || args[1] === 'ddhhmmssLong')) {
      seconds = Math.floor(value % 60);
      minutes = Math.floor(((value / 60) % 60));
      hours = Math.floor(((value / 60) / 60) % 24);
      days = Math.floor((((value / 60) / 60) / 24));
      return this.duration(args[1], seconds, minutes, hours, days);

    }
    else {
      return value;
    }
  }

  private duration(format: any, seconds: any, minutes: any, hours: any, days: any) {
    (days < 10) ? days = '0' + days : days;
    (hours < 10) ? hours = '0' + hours : hours;
    (minutes < 10) ? minutes = '0' + minutes : minutes;
    (seconds < 10) ? seconds = '0' + seconds : seconds;

    switch (format) {
      case 'hhmmss':
        return `${hours}:${minutes}:${seconds}`;
      case 'ddhhmmss':
        return `${days}d, ${hours}h, ${minutes}m, ${seconds}s`;
      case 'ddhhmmssLong':
        return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
      default:
        return `${hours}:${minutes}:${seconds}`;
    }
  }
}
