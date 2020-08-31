import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

import tw from './translations/zh-TW.json'
import en from './translations/en.json'

if (!localStorage.getItem('lang')) {
	localStorage.setItem('lang', 'en');
}

let locale = localStorage.getItem('lang');

const messages = {
	'zh-TW': tw,
	en
}

const i18n = new VueI18n({
	locale,
	messages
})

export default i18n
