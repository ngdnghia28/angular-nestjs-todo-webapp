import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponseBase } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { JwtService } from '../services/jwt.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    constructor(
        private jwtService: JwtService,
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let headersConfig = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: ''
        };

        const token = this.jwtService.getToken();

        if (token) {
            headersConfig = { ...headersConfig, Authorization: `Bearer ${token}` }
        }

        const request = req.clone({ setHeaders: headersConfig });
        return next.handle(request).pipe(tap(
            (event: any) => {
                // console.log(event.body)
                if (event.body && event.body.error) {
                    console.error({ title: 'Lỗi!', message: event.body.error.message || event.body.error })
                }
                if (event.body && event.body.note) {
                    console.log(event.body.note);
                }
            },
            (err: HttpErrorResponse) => {
                console.error({ title: 'Lỗi kết nối!', message: 'Kế nối đến ' + req.url + ' thất bại.' });
            }
        ));
    }
}
