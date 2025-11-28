export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  cookTime: number;
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
  tags: string[];
  ingredients: string[];
  servings: number;
  calories: number; // Calorias por porção
  price: number; // Preço estimado por porção em R$
}

export interface PlannedMeal {
  id: string;
  recipe: Recipe;
  day: string;
  mealType: 'café da manhã' | 'almoço' | 'jantar';
}

export interface PantryItem {
  id: string;
  name: string;
  category?: string;
  addedDate: Date;
}

export interface RecipeMatch {
  recipe: Recipe;
  availableIngredients: string[];
  missingIngredients: string[];
  matchPercentage: number;
}

export type FilterType = 'all' | 'quick' | 'vegetarian' | 'gluten-free' | 'dairy-free' | 'easy' | 'desserts';

export const DAYS_OF_WEEK = [
  'Segunda',
  'Terça', 
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
  'Domingo'
];

export const MEAL_TYPES = ['café da manhã', 'almoço', 'jantar'] as const;

export const INGREDIENT_CATEGORIES = [
  'Proteínas',
  'Vegetais',
  'Frutas',
  'Grãos',
  'Laticínios',
  'Especiarias e Ervas',
  'Itens da Despensa',
  'Outros'
];