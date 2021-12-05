import { Period } from "../model";

export const calcRank = (cur: number, prev: number) => {
  const calcNum = prev - cur;

  if (Math.sign(calcNum) === 1) {
    return `▲${Math.abs(calcNum)}`;
  }

  if (Math.sign(calcNum) === -1) {
    return `▼${Math.abs(calcNum)}`;
  }

  return "-";
};

export const convertToDay = (day: Period) => {
  switch (day) {
    case "MON":
      return "월";
    case "TUE":
      return "화";
    case "WED":
      return "수";
    case "THU":
      return "목";
    case "FRI":
      return "금";
    case "SAT":
      return "토";
    default:
      return "일";
  }
};
