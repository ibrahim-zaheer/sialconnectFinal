import i18n from 'i18next'

import LanguageDetector from "i18next-browser-languagedetector"

import {initReactI18next, Translation} from "react-i18next"
import Backend from "i18next-http-backend";


i18n.use(LanguageDetector).use(initReactI18next).use(Backend).init({
    debug: true,
    returnObjects: true,
    fallbackLng:"en",

  //   resources:{
  //       en:{
  //         translation:{
  //           greeting:"Hello Supplier",
  //           description: {
  //   "line1": "You're watching  YouTube <1>{{channel}}</1>",
  //   "line2": "This is an Internationalisation Tutorial"
  // }
  //         }
  //       },
  //       ur:{
  //           translation:{
  //               greeting:"ہیلو سپلائر",
  //               description: {
  //                 "line1": "<1>{{channel}}</1> دیکھ رہے ہیں",
  //                 "line2": "یہ ایک انٹرنیشنلائزیشن ٹیوٹوریل ہے"
  //               }
  //             }
  //       }
  //   }
});