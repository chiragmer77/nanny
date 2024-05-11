import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'linkify'
})
export class LinkifyPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(text: string): SafeHtml {
    if (!text) {
      return '';
    }
    const urlPattern = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])|(\bwww\.[-A-Z0-9+&@#\/%?=~_|!:,.;]*\b)/gim;
    let linkedText = text.replace(urlPattern, (url) => {
      let fullUrl = url.match(/^https?:\/\//i) || url.match(/^ftp:\/\//i) ? url : `http://${url}`;
      return `<a href="${fullUrl}" target="_blank">${url}</a>`;
    });
    return this.sanitizer.bypassSecurityTrustHtml(linkedText);
  }

}
