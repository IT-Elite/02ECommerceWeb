import { Component, OnInit, Input, Output, EventEmitter, Inject } from "@angular/core";
import { CookieService } from "angular2-cookie";
import { WINDOW } from "../window/window.service";


@Component({
    selector: 'app-login',
    templateUrl: 'app/login/login.component.html',
    styleUrls: ['app/login/login.component.css']
})

export class LoginComponent implements OnInit {
    @Input() orderVisible: boolean = true;
    @Input() closable = true;
    @Input() visible: boolean;
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    host: string = this.window.location.host;       //Get the host through window injection
    validEmail: boolean = true;


    constructor(private _cookieService: CookieService, @Inject(WINDOW) private window: Window) { }

    ngOnInit() { }

    close() {
        this.visible = false;
        this.visibleChange.emit(this.visible);
    }

    //Generate cookie
    generateCookie(email:any) {
        let date = new Date();
        date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));      //Set cookie expeirs in 30 days

        var patt_email = /(\w+)[\.\_\-]?(\w+)@(\w+)\.(\w+)\.?(\w?)\.?(\w?)/;	//Create email pattern
        var validEmail = patt_email.test(email.value);		//Validate email input

        if (!validEmail) {
            alert("Please enter a valid email address!");
            this.validEmail = false;
        }

        if (this._cookieService.get('user_login') == undefined) {       //Check if login token is on
            if (this._cookieService.get(email.value) != undefined) {
                return true;
            } else {
                this._cookieService.put(email.name, email.value, { expires: date });
            }
            return true;
        } else {
            //Code for login user
        }
    }

    //Page turning to order placing
    turnToOrder() {
        if (this.validEmail) {
            this.window.location.href = "http://" + this.host + "/src/#/order";
        }
    }
}