import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SharedService, SnackBarService } from '../services';
import { ToastrService } from 'ngx-toastr';

import { HttpStatus } from '@app/helpers/constants';
import { LogService } from '../services/log.service';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {
  constructor(
    private sharedService: SharedService,
    private snackBarService: SnackBarService,
    private toastr: ToastrService,
    private logService:LogService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const jwtReq = request.clone();
    // Pass on the cloned request instead of the original request.
    return next.handle(jwtReq).pipe(
      tap(
        (event: HttpEvent<any>) => {},
        (err: any) => {
          this.logService.logException(err);
          if (err instanceof HttpErrorResponse) {
            let message = 'There is a technical issue. Please try later';
            if ([HttpStatus.UNAUTHORIZED].indexOf(err.status) !== -1) {
              message = 'Please login';
              this.sharedService.logout();
              // location.reload(true);
            }

            if ([HttpStatus.FORBIDDEN].indexOf(err.status) !== -1) {
              message = 'Forbidden';
            } else if (
              err.error &&
              err.error.message &&
              err.error.message.length > 0
            ) {
              message = err.error.message;
            }
           // this.snackBarService.setSnackBarMessage(message);
          // this.toastr.info(message);
           this.toastr.info(message, '', {
            timeOut: 3000,
            positionClass: 'toast-bottom-center',
      
          });
          }
        }
      )
    );
  }
}
