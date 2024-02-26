export interface Restaurant {
  id: number;
  name: string;
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
