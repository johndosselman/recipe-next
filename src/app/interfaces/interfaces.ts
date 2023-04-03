export interface Recipe {
  recipeTitle: string;
  imgUrl: string | null;
  description: string | null;
  notes: string[] | null;
  ingredients: string[];
  directions: string[];
}
export interface UserData {
  name: string | null;
  email: string;
  theme: "light" | "dark";
}
export interface identifiable {
  id: number;
}

export interface ingredient extends identifiable {
  ingredientName: string;
}

export interface direction extends identifiable {
  directionText: string;
}

export interface note extends identifiable {
  noteText: string;
}
