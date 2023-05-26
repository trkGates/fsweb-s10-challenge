import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const s10chLocalStorageKey = "s10ch";

const baslangicDegerleri = {
  notlar: [
    {
      id: "75g1IyB8JLehAr0Lr5v3p",
      date: "Fri Feb 03 2023 09:40:27 GMT+0300 (GMT+03:00)",
      body:
        "Bugün hava çok güzel!|En iyi arkadaşımın en iyi arkadaşı olduğumu öğrendim :)|Kedim iyileşti!",
    },
  ],
};

function localStorageStateYaz(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function localStorageStateOku(key) {
  return JSON.parse(localStorage.getItem(key));
}

function baslangicNotlariniGetir(key) {
  const eskiNotlar = localStorage.getItem(key);

  if (eskiNotlar) {
    return localStorageStateOku(key);
  } else {
    return baslangicDegerleri;
  }
}

export const notEkleAPI = createAsyncThunk(
  "notlar/notEkleAPI",
  async (yeniNot) => {
    try {
      const response = await axios.post("https://httpbin.org/anything", yeniNot);
      if (response.status === 200) {
        // Local storage'a kaydetme
        const eskiNotlar = localStorage.getItem(s10chLocalStorageKey);
        if (eskiNotlar) {
          const parsedNotlar = JSON.parse(eskiNotlar);
          parsedNotlar.notlar.push(yeniNot);
          localStorage.setItem(
            s10chLocalStorageKey,
            JSON.stringify(parsedNotlar)
          );
        } else {
          const baslangicDegerleri = {
            notlar: [yeniNot],
          };
          localStorage.setItem(
            s10chLocalStorageKey,
            JSON.stringify(baslangicDegerleri)
          );
        }

        return response.data;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const notSilAPI = createAsyncThunk(
  "notlar/notSilAPI",
  async (id) => {
    try {
      const response = await axios.delete(
        "https://httpbin.org/anything",
        { data: id }
      );
      if (response.status === 200) {
        // Local storage'dan silme
        const eskiNotlar = localStorage.getItem(s10chLocalStorageKey);
        if (eskiNotlar) {
          const parsedNotlar = JSON.parse(eskiNotlar);
          parsedNotlar.notlar = parsedNotlar.notlar.filter(
            (not) => not.id !== id
          );
          localStorage.setItem(
            s10chLocalStorageKey,
            JSON.stringify(parsedNotlar)
          );
        }

        return response.data;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const notlarSlice = createSlice({
  name: "notlar",
  initialState: baslangicNotlariniGetir(s10chLocalStorageKey),
  reducers: {
    notEkle: (state, action) => {
      state.notlar.push(action.payload);
      localStorageStateYaz(s10chLocalStorageKey, state);
    },
    notSil: (state, action) => {
      const notId = action.payload;
      state.notlar = state.notlar.filter((not) => not.id !== notId);
      localStorageStateYaz(s10chLocalStorageKey, state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(notEkleAPI.fulfilled, (state, action) => {
        // İstek başarılı olduğunda yapılacak işlemler
      })
      .addCase(notSilAPI.fulfilled, (state, action) => {
        // İstek başarılı olduğunda yapılacak işlemler
      });
  },
});

export const { notEkle, notSil } = notlarSlice.actions;

export default notlarSlice.reducer;
