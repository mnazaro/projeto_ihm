import { Recipe, PantryItem, RecipeMatch } from '../types';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Clock, Plus, Users, CheckCircle, XCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PantryRecipesProps {
  recipes: Recipe[];
  pantryItems: PantryItem[];
  onAddToWeek: (recipe: Recipe) => void;
}

export function PantryRecipes({ recipes, pantryItems, onAddToWeek }: PantryRecipesProps) {
  const pantryIngredients = pantryItems.map(item => item.name.toLowerCase());

  // Calculate recipe matches
  const recipeMatches: RecipeMatch[] = recipes.map(recipe => {
    const availableIngredients = recipe.ingredients.filter(ingredient =>
      pantryIngredients.some(pantryIngredient =>
        ingredient.toLowerCase().includes(pantryIngredient) ||
        pantryIngredient.includes(ingredient.toLowerCase())
      )
    );

    const missingIngredients = recipe.ingredients.filter(ingredient =>
      !pantryIngredients.some(pantryIngredient =>
        ingredient.toLowerCase().includes(pantryIngredient) ||
        pantryIngredient.includes(ingredient.toLowerCase())
      )
    );

    const matchPercentage = Math.round((availableIngredients.length / recipe.ingredients.length) * 100);

    return {
      recipe,
      availableIngredients,
      missingIngredients,
      matchPercentage
    };
  });

  // Sort by match percentage (highest first)
  const sortedMatches = recipeMatches.sort((a, b) => b.matchPercentage - a.matchPercentage);

  // Filter to show recipes with at least some matching ingredients
  const relevantMatches = sortedMatches.filter(match => match.matchPercentage > 0);

  if (pantryItems.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h2>Receitas com Seus Ingredientes</h2>
          <p className="text-muted-foreground">
            Adicione ingredientes à sua despensa para ver o que você pode cozinhar
          </p>
        </div>
        
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <p>Nenhum ingrediente adicionado ainda</p>
            <p className="text-sm mt-1">Comece adicionando ingredientes que você tem em casa</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (relevantMatches.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h2>Receitas com Seus Ingredientes</h2>
          <p className="text-muted-foreground">
            Nenhuma receita encontrada com os ingredientes da sua despensa
          </p>
        </div>
        
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <p>Tente adicionar ingredientes mais comuns à sua despensa</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2>Receitas com Seus Ingredientes</h2>
        <p className="text-muted-foreground">
          Receitas que você pode fazer com ingredientes da sua despensa
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relevantMatches.map((match) => (
          <Card key={match.recipe.id} className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="relative overflow-hidden">
              <ImageWithFallback
                src={match.recipe.image}
                alt={match.recipe.title}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-2 right-2">
                <Badge 
                  variant={match.matchPercentage === 100 ? 'default' : 'secondary'}
                  className={match.matchPercentage === 100 ? 'bg-green-600' : 'bg-white/90 text-black'}
                >
                  {match.matchPercentage}% compatível
                </Badge>
              </div>
            </div>
            
            <CardContent className="p-4">
              <h3 className="mb-2">{match.recipe.title}</h3>
              <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                {match.recipe.description}
              </p>
              
              <div className="flex items-center justify-between mb-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{match.recipe.cookTime} min</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users size={14} />
                  <span>{match.recipe.servings} porções</span>
                </div>
              </div>

              {/* Ingredient match progress */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Compatibilidade</span>
                  <span>{match.availableIngredients.length}/{match.recipe.ingredients.length}</span>
                </div>
                <Progress value={match.matchPercentage} className="h-2" />
              </div>

              {/* Available ingredients */}
              {match.availableIngredients.length > 0 && (
                <div className="mb-2">
                  <div className="flex items-center gap-1 text-sm text-green-600 mb-1">
                    <CheckCircle size={12} />
                    <span>Você tem ({match.availableIngredients.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {match.availableIngredients.slice(0, 3).map((ingredient, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-green-200 text-green-700">
                        {ingredient}
                      </Badge>
                    ))}
                    {match.availableIngredients.length > 3 && (
                      <Badge variant="outline" className="text-xs border-green-200 text-green-700">
                        +{match.availableIngredients.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Missing ingredients */}
              {match.missingIngredients.length > 0 && (
                <div className="mb-3">
                  <div className="flex items-center gap-1 text-sm text-orange-600 mb-1">
                    <XCircle size={12} />
                    <span>Precisa ({match.missingIngredients.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {match.missingIngredients.slice(0, 3).map((ingredient, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-orange-200 text-orange-700">
                        {ingredient}
                      </Badge>
                    ))}
                    {match.missingIngredients.length > 3 && (
                      <Badge variant="outline" className="text-xs border-orange-200 text-orange-700">
                        +{match.missingIngredients.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              )}
              
              <Button 
                onClick={() => onAddToWeek(match.recipe)}
                className="w-full"
                size="sm"
              >
                <Plus size={14} className="mr-1" />
                Adicionar à Semana
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}