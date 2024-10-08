import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { finalize, Observable } from "rxjs";
import { spinnerService } from "../Servicios/spinner.service";

@Injectable({
    providedIn: 'root'
  })
export class SpinnerInterceptor implements HttpInterceptor{

    constructor(private spinnerSvc: spinnerService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {   
        this.spinnerSvc.show();
        return next.handle(req).pipe(finalize(()=>this.spinnerSvc.hide()));
    }  
}

export const interceptorProviderSpinner = [{provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true}];