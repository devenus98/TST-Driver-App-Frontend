// Angular
import { Injectable } from '@angular/core';
// Tranlsation
import { TranslateService } from '@ngx-translate/core';

export interface Locale {
	lang: string;
	// tslint:disable-next-line:ban-types
	data: Object;
}

@Injectable({
	providedIn: 'root'
})
export class TranslationService {
	// Private properties
	private langIds: any = [];

	/**
	 * Service Constructor
	 *
	 * @param translate: TranslateService
	 */
	constructor(private translate: TranslateService) {
		let CHECK_LANG = localStorage.getItem('language');
		console.log(CHECK_LANG);
		if(CHECK_LANG == null){
			this.translate.addLangs(['hi']);
			this.translate.setDefaultLang('hi');
			translate.use('hi');
		}else{
			this.translate.addLangs([CHECK_LANG]);
			this.translate.setDefaultLang(CHECK_LANG);
			translate.use(CHECK_LANG);
		}
	}

	/**
	 * Load Translation
	 *
	 * @param args: Locale[]
	 */
	loadTranslations(...args: Locale[]): void {
		const locales = [...args];
		locales.forEach(locale => {
			this.translate.setTranslation(locale.lang, locale.data, true);

			this.langIds.push(locale.lang);
		});
		this.translate.addLangs(this.langIds);
	}

	/**
	 * Setup language
	 *
	 * @param lang: any
	 */
	setLanguage(lang: string) {
		if (lang) {
			this.translate.use(this.translate.getDefaultLang());
			localStorage.setItem('language', lang);
			this.translate.use(lang);
		}
	}

	/**
	 * Returns selected language
	 */
	getSelectedLanguage(): any {
		return localStorage.getItem('language') || this.translate.getDefaultLang();
	}
}
