export const ingredientTitles: Array<string> = [
  "Węglowodany",
  "Tłuszcze",
  "Białko",
  "Kalorie",
];
export const namesOfDaysOfWeekArray: Array<string> = [
  "Niedziela",
  "Poniedziałek",
  "Wtorek",
  "Środa",
  "Czwartek",
  "Piątek",
  "Sobota",
];
export const namesOfTheMonths: Array<string> = [
  "Stycznia",
  "Lutego",
  "Marca",
  "Kwietnia",
  "Maja",
  "Czerwca",
  "Lipca",
  "Sierpnia",
  "Września",
  "Października",
  "Listopada",
  "Grudnia",
];
export const monthsNames: Array<string> = [
  "Styczeń",
  "Luty",
  "Marzec",
  "Kwiecień",
  "Maj",
  "Czerwiec",
  "Lipiec",
  "Sierpień",
  "Wrzesień",
  "Październik",
  "Listopad",
  "Grudzień",
];
interface trainingItem {
  name: string;
  min: number;
}
export const trainingList: Array<trainingItem> = [
  { name: "Początkujący/a", min: 0 },
  { name: "Średnio zaawansowany/a", min: 10 },
  { name: "Zaawansowany", min: 50 },
  { name: "Ekspert", min: 100 },
];
