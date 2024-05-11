import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { UploadPhotoTypeEnum } from '@app/helpers';

@Component({
  selector: 'app-image-view-slider',
  templateUrl: './image-view-slider.component.html',
  styleUrls: ['./image-view-slider.component.scss']
})
export class ImageViewSliderComponent {

  // @Input() pictureType: UploadPhotoTypeEnum | undefined;
  @Input() previewPictures: any[] = [];
  @Output() close = new EventEmitter();
  uploadPhotoTypeEnum = UploadPhotoTypeEnum;
  selectedPreviewPicture: any;

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.onCloseClick()
  }

  ngOnInit() {
    this.selectedPreviewPicture = this.previewPictures.find(e => e.isSelected);
  }

  handlePreviousClick = () => {
    if (this.selectedPreviewPicture.id > 0) {
      this.selectedPreviewPicture = this.previewPictures.find((e, i) => i === this.selectedPreviewPicture.id - 1);
    }
  };

  handleNextClick = async () => {
    if (this.selectedPreviewPicture.id !== this.previewPictures.length) {
      this.selectedPreviewPicture = this.previewPictures.find((e, i) => i === this.selectedPreviewPicture.id + 1);
    }
  };

  onCloseClick = () => {
    this.close.emit(true);
  }

}
