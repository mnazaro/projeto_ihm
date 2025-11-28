import { PlannedMeal } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { ShoppingCart, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface ShoppingListProps {
  plannedMeals: PlannedMeal[];
}

interface IngredientItem {
  name: string;
  recipes: string[];
  checked: boolean;
}

export function ShoppingList({ plannedMeals }: ShoppingListProps) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  // Generate consolidated shopping list
  const ingredients = plannedMeals.reduce((acc, meal) => {
    meal.recipe.ingredients.forEach(ingredient => {
      if (acc[ingredient]) {
        acc[ingredient].recipes.push(meal.recipe.title);
      } else {
        acc[ingredient] = {
          name: ingredient,
          recipes: [meal.recipe.title],
          checked: checkedItems[ingredient] || false
        };
      }
    });
    return acc;
  }, {} as Record<string, IngredientItem>);

  const ingredientList = Object.values(ingredients).sort((a, b) => a.name.localeCompare(b.name));

  const toggleItem = (ingredient: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [ingredient]: !prev[ingredient]
    }));
  };

  if (plannedMeals.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Lista de Compras
          </h2>
          <p className="text-muted-foreground">Sua lista de compras aparecerá aqui baseada no seu planejamento</p>
        </div>
        
        <Card className="border-dashed border-2 border-muted-foreground/20">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            {/* Ilustração SVG de estado vazio */}
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-secondary/10 rounded-full blur-2xl animate-pulse" />
              <div className="relative p-6 rounded-full bg-gradient-to-br from-secondary/20 to-primary/10">
                <ShoppingCart size={64} className="text-muted-foreground/40" strokeWidth={1.5} />
              </div>
            </div>
            
            <h3 className="text-lg font-medium text-muted-foreground mb-2">
              Sua lista de compras está vazia
            </h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Adicione receitas ao seu planejamento semanal e os ingredientes necessários aparecerão automaticamente aqui
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalItems = ingredientList.length;
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const progress = totalItems > 0 ? (checkedCount / totalItems) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Lista de Compras
          </h2>
          <p className="text-muted-foreground">
            {checkedCount} de {totalItems} itens marcados
          </p>
        </div>
        <Badge variant="secondary" className="shadow-sm">
          <ShoppingCart size={12} />
          {totalItems} itens
        </Badge>
      </div>

      {/* Progress bar */}
      {totalItems > 0 && (
        <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full transition-all duration-500 ease-out"
                    style={{ 
                      width: `${progress}%`, 
                      minWidth: progress > 0 ? '4px' : '0px',
                      background: 'linear-gradient(to right, var(--primary), var(--secondary))'
                    }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm font-medium">
                {progress === 100 && <CheckCircle2 size={16} className="text-primary animate-bounce" />}
                <span>{Math.round(progress)}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Ingredientes Necessários</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {ingredientList.map((item) => {
              const isChecked = checkedItems[item.name] || false;
              return (
                <div
                  key={item.name}
                  className={`flex items-start gap-3 p-3 rounded-lg border transition-all duration-200 ${
                    isChecked 
                      ? 'bg-muted/50 border-muted-foreground/20' 
                      : 'bg-card hover:bg-accent/50 border-border'
                  }`}
                >
                  <Checkbox
                    id={item.name}
                    checked={isChecked}
                    onCheckedChange={() => toggleItem(item.name)}
                    className="mt-1"
                  />
                  <label
                    htmlFor={item.name}
                    className="flex-1 cursor-pointer"
                  >
                    <div className={`font-medium capitalize transition-all ${
                      isChecked ? 'line-through text-muted-foreground' : ''
                    }`}>
                      {item.name}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {item.recipes.map((recipe, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {recipe}
                        </Badge>
                      ))}
                    </div>
                  </label>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}