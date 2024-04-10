import { Timestamp } from "firebase/firestore";

export const convertToDate = (firebaseTimestamp: any) => {
  if (typeof firebaseTimestamp === "string") {
    return firebaseTimestamp;
  } else {
    if (typeof firebaseTimestamp === "object") {
      return firebaseTimestamp.toDate().toString();
    }
    return "";
  }
};

export const convertToFirebaseTimestamp = (
  date: string | Date | { _seconds: number; _nanoseconds: number }
) => {
  if (typeof date === "string") {
    return Timestamp.fromDate(new Date(date));
  }
  if (date instanceof Date) {
    return Timestamp.fromDate(date);
  }
  if (typeof date === "object") {
    return new Timestamp(date._seconds, date._nanoseconds);
  }
  return date;
};

export const changeValues = (obj: any, key: any, cb: any) => {
  for (let i in obj) {
    if (i === key) {
      obj[key] = cb(obj[key]);
    }
    if (Array.isArray(obj[i])) {
      obj[i].forEach((o: any) => changeValues(o, key, cb));
    }
    if (typeof obj[i] === "object" && !Array.isArray(obj[i])) {
      changeValues(obj[i], key, cb);
    }
  }
  return obj;
};

// convert date string to firebase timestamp
const toJson = (data: any) => {
  const d = JSON.parse(JSON.stringify(data));
  changeValues(d, "createdAt", (val: any) => convertToFirebaseTimestamp(val));
  changeValues(d, "updatedAt", (val: any) => convertToFirebaseTimestamp(val));
  return d;
};

// convert firebase timestamp to date string
const fromJson = (data: any) => {
  const d = data;
  changeValues(d, "createdAt", (val: any) => convertToDate(val));
  changeValues(d, "updatedAt", (val: any) => convertToDate(val));
  return d;
};

export const apiMiddleware = {
  toJson,
  fromJson,
};
