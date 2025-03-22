import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const getLanguages = createAsyncThunk(
  "language/getLanguages",
  async () => {
    // Api'den dil verilerini alıp
    const res = await api.get("/getLanguages");
    // Aldığı verileri payload olarak belirle
    return res.data.data.languages;
  }
);

export const translateText = createAsyncThunk(
  "translate/translateText",
  async (arg, { getState }) => {
    // Aksiyon içerisinde store'a abone olmaya yarar
    const { translate } = getState();

    // Api'a gönderilecek olan parametreleri belirle
    const params = new URLSearchParams();
    params.set("source_language", translate.sourceLang.value);
    params.set("target_language", translate.targetLang.value);
    params.set("text", translate.textToTranslate);

    // Api'a istek at
    const res = await api.post("/translate", params);

    //Aldığı çevrilmiş metni payload olarak belirle
    return res.data.data.translatedText;
  }
);
