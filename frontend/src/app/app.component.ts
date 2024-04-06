import { Component, OnInit } from "@angular/core";
import {Router} from "@angular/router";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  public title = "Hoopla";
  public loggedUser :any= null;

  constructor(private router: Router) {
  }
  public ngOnInit() {
    this.loggedUser = null;
    sessionStorage.clear();
    // console.log("hi")
    // console.log("app",this.loggedUser)
  }
  public ngDoCheck() {
    this.loggedUser = sessionStorage.getItem("FirstName");
  }
  public logout() {
    sessionStorage.clear();
    this.loggedUser = null;
    this.router.navigate(["/login"]);
  }
  public login() {
    this.router.navigate(["/login"]);
  }
}
