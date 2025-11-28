import { Recipe } from '../types';
import { RecipeCard } from './RecipeCard';

interface RecipeGridProps {
  recipes: Recipe[];
  onAddToWeek: (recipe: Recipe) => void;
}

export function RecipeGrid({ recipes, onAddToWeek }: RecipeGridProps) {
  if (recipes.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        <div className="text-center">
          <p>No recipes found matching your filters</p>
          <p className="text-sm mt-1">Try adjusting your search criteria</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onAddToWeek={onAddToWeek}
        />
      ))}
    </div>
  );
}