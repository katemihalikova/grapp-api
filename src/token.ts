import Axios from "axios";
import * as cheerio from "cheerio";

import {baseUrl} from "./baseUrl";
import {Token} from "./params";

export function loadToken(): Promise<Token> {
  return Axios.get(baseUrl)
    .then(response => response.data)
    .then(html => {
      let $ = cheerio.load(html);
      return $("#token").val();
    });
}
