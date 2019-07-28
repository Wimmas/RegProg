import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class LoginGuard implements CanActivate{
    constructor(
        private router: Router,
        private cookieService: CookieService
    ){}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
        let cookieVal = this.cookieService.get('Status');

        if(cookieVal)
        {
            return true;
        }

        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
