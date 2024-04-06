import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import {ActivatedRoute} from "@angular/router";
import {DashboardComponent} from "../dashboard/dashboard.component";
import { LoginService } from "./login.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  public loggedIn: boolean;
  public errorMessage: any;
  public data :any = null;
  public successMessage: any;
  public loginForm: FormGroup;
  constructor(private fb: FormBuilder,
              private logserv: LoginService,
              private router: Router,
              private r: ActivatedRoute) {  }

  public ngOnInit() {
    // sessionStorage.clear()
    this.data = sessionStorage.getItem("FirstName");
    this.loggedIn = false;
    const search = sessionStorage.getItem("searched");
    this.loginForm = this.fb.group({
      userName: ["", [Validators.required, Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")]],
      password: ["", [Validators.required]],
    });
    if (this.data) {
      this.router.navigate(["/"]);
    }
  }
  public login() {
    // console.log(this.loginForm.value);
    const product = sessionStorage.getItem("product");
    const item = sessionStorage.getItem("Item");
    this.errorMessage = null;
    this.successMessage = null;
    this.logserv.loginform(this.loginForm.value).subscribe(
      (success) => {
        if (product && item) {this.router.navigate(["home", item, product]); } else {this.router.navigate(["/home"]); }

        // console.log(success.userdetails.fname)
        this.loggedIn = true;
        sessionStorage.setItem("FirstName", success.userdetails.fname);
        sessionStorage.setItem("email", success.userdetails.userName);

        // this.loggedIn=sessionStorage.getItem("FirstName")
      },
      (error) => {
        this.errorMessage = error.error.message; },
    );
  }

}
