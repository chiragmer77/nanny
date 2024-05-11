import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationFormat',
})
export class DurationFormatPipe implements PipeTransform {

  transform(value: number): string {
    if (!value) return "0 secs";

    const hours = Math.floor(value / 3600);
    const minutes = Math.floor((value % 3600) / 60);
    const seconds = value % 60;

    const hoursDisplay = hours > 0 ? `${hours} hr ` : '';
    const minutesDisplay = minutes > 0 || hours > 0 ? `${minutes} mins ` : '';
    const secondsDisplay = seconds > 0 ? `${seconds} secs` : '';

    return `${hoursDisplay}${minutesDisplay}${secondsDisplay}`;
  }
}
