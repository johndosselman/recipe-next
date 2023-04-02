export default interface Recipe {
  recipeTitle: string;
  imgUrl: string | null;
  description: string | null;
  notes: string[] | null;
  ingredients: string[];
  directions: string[];
}
