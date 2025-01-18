export interface Restaurant {
  id: number;
  type: string;
  attributes: {
  name: string;
  url: string;
  hours: string;
  meals: Meal[];
  }
}

export interface Meal {
  id: number;
  type: string;
  foodies: Menu[];
  day: string;
}

export interface Menu {
  content: string[];
  type: string;
}

export interface APIData<T> {
  data: T
}

export interface School {
  school_name: string;
  school_full_name: string;
  distance_km: number;
}
