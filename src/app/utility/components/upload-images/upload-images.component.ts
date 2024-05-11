import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService, SharedService, SnackBarService } from '@app/core';
import imageCompression from 'browser-image-compression';
import {
  UploadPhotoTypeEnum,
  imageTypes,
  isImageSize,
  isImageType,
} from '@app/helpers';
@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.scss'],
})
export class UploadImagesComponent {
  @Input() profilePhotos!: any[];
  @Input() otherPhotos: any[] = [];
  @Input() isLoading!: boolean;
  userDetail!: any;

  uploadPhotoTypeEnum = UploadPhotoTypeEnum;
  imageTypeAccept = imageTypes;

  constructor(
    private commonService: CommonService,
    private sharedService: SharedService,
    private snackBarService: SnackBarService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.userDetail = this.sharedService.getUser();
  }

  onFileUpload = async (fileInput: any, type: UploadPhotoTypeEnum) => {
    const { files } = fileInput.target;
    const options = {
      maxSizeMB: 2,
      useWebWorker: true,
      alwaysKeepResolution: true,
      initialQuality: 1,
    };
    const filesArray = Array.from(files) as File[];
    const optimizedFiles = Array.from(filesArray).map((file: File) => {
      console.log(`original size ${file.size / 1024 / 1024} MB`);
      return new Promise((resolve, reject) => {
        imageCompression(file, options)
          .then((compressedFile) => {
            console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`);
            resolve(compressedFile);
          })
          .catch((error) => {
            reject(error);
          });
      });
    });

    Promise.all(optimizedFiles)
      .then((optimizedFiles) => {
        this.uploadFiles(optimizedFiles, type)
      })
      .catch((error) => {
        console.log(error.message);
      });

  };

  uploadFiles = (files: any[], type: UploadPhotoTypeEnum) => {
    let message = '';
    if (files && files.length > 0) {
      if (type === UploadPhotoTypeEnum.OTHER && files.length > 3) {
        message = `You can upload maximum of 3 files.`;
      }
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!isImageType(file.type)) {
          message = `Allowed only ${imageTypes}`;
          break;
        } else if (isImageSize(file)) {
          message = `Allowed only 2MB`;
          break;
        }
      }

      if (message) {
        this.snackBarService.setSnackBarMessage(message);
      }

      if (!message) {
        const fileArray = [{ reqKey: 'Files', files: [...files] }];
        this.commonService
          .uploadPhotos(fileArray, { PhotoType: type })
          .subscribe({
            next: (res) => {
              const uploadedPhotos = res.payload;
              if (type === UploadPhotoTypeEnum.PROFILE_PICTURE) {
                this.profilePhotos = uploadedPhotos;
                const userObj = {
                  ...this.userDetail,
                  photo: this.profilePhotos[0].photo,
                };
                this.sharedService.setUser({ ...userObj });
              } else if (type === UploadPhotoTypeEnum.OTHER) {
                this.otherPhotos = uploadedPhotos;
              }
            },
            error: (e) => console.error(e),
          });
      }
    }
  };

  onFileElementClick = (event: any) => {
    event.target.value = '';
  };

  onDeletePhoto = (photo: any, type: UploadPhotoTypeEnum) => {
    if (photo) {
      this.commonService.deletePhoto({ PhotoId: photo.id }).subscribe({
        next: (res) => {
          if (type === UploadPhotoTypeEnum.OTHER) {
            this.otherPhotos = this.otherPhotos.filter((e) => e.id != photo.id);
          } else if (type === UploadPhotoTypeEnum.PROFILE_PICTURE) {
            this.profilePhotos = this.profilePhotos.filter(
              (e) => e.id != photo.id
            );
            const userObj = {
              ...this.userDetail,
              photo: '',
            };
            this.sharedService.setUser({ ...userObj });
          }
        },
        error: (e) => console.error(e),
      });
    }
  };

  onBrowseFile(id: string) {
    document.getElementById(id)?.click();
  }
}
