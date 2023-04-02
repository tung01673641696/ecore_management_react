import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import i18next from "i18next";
import us from "./us.json";
import vi from "./vi.json";


i18next.use(initReactI18next)
	.init({resources:{
			us: {translation: us},
			vi: {translation: vi}
		},
		fallbackLng: "vi",
		lng: "vi",
		interpolation: {
			escapeValue: false
		}
	})

export default i18n;
