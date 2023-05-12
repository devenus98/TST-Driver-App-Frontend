import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-createpassword',
  templateUrl: './createpassword.page.html',
  styleUrls: ['./createpassword.page.scss'],
})
export class CreatepasswordPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }
    PageRoute(urlSlug: string) {
        this.router.navigateByUrl('/' + urlSlug);
    }
}
