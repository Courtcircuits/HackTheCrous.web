export interface Restaurant {
  id: number;
  name: string;
  url: string;
  hours: string;
  meals: Meal[];
  gps_coord: Coordinates;
}

export interface Coordinates {
  X: number;
  Y: number;
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
