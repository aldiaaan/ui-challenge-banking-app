export interface CardModel {
  id: string | number;
  name: string;
  color: string;
  expenses: ExpenseModel[];
}

export interface ExpenseModel {
  id: string | number;
  name: string;
  amount: string;
  logo: any;
  details?: string;
}

export const cards: CardModel[] = [
  {
    id: 1,
    name: "ccva",
    color: "#c6d9e6",
    expenses: [
      {
        id: "e1",
        name: "Netflix",
        amount: "-10.50",
        logo: require("./assets/netflix.png"),
        details: "Next 30 Jan",
      },
    ],
  },
  {
    id: 2,
    name: "bbva",
    color: "#9471d5",
    expenses: [
      {
        id: "e3",
        details: "Next 12 March",
        name: "Disney+",
        amount: "-20.23",
        logo: require("./assets/netflix.png"),
      },
    ],
  },
  {
    id: 3,
    name: "jenius",
    color: "#9ac5fc",
    expenses: [
      {
        id: "e2",
        name: "Genshin Impact",
        amount: "-10.00",
        logo: require("./assets/genshin_impact.png"),
        details: "Gnostoc Hymn",
      },
    ],
  },
];
