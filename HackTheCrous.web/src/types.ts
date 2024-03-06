export interface Restaurant {
  id: number;
  name: string;
  url: string;
  meals: Meal[];
}

export interface Meal {
  ID: number;
  Type: string;
  Foodies: Menu[];
  Day: string;
}

export interface Menu {
  content: string[];
  type: string;
}
