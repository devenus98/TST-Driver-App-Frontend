import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from './../services/translation.service';
import { LoadingService } from "../services/loading.service";
declare var window: any;

@Component({
  selector: 'app-language',
  templateUrl: './language.page.html',
  styleUrls: ['./language.page.scss'],
})
export class LanguagePage implements OnInit {
 
  selected_lang: any;

  constructor(
    private router: Router,
    private translation: TranslationService,
    private cd: ChangeDetectorRef,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
  }

  getSelectedData(event: any){
    this.selected_lang = event.detail.value
  }

  updateLanguage(){
    console.log(this.selected_lang);
    this.translation.setLanguage(this.selected_lang);
    setInterval(()=>{
      window.location.href = "/login";
    5000});
  }

}
