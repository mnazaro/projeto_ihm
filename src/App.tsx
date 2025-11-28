import { useState } from 'react';
import { Recipe, PlannedMeal, FilterType, PantryItem } from './types';
import { mockRecipes } from './data/recipes';
import { Navigation } from './components/Navigation';
import { FilterBar } from './components/FilterBar';
import { RecipeGrid } from './components/RecipeGrid';
import { WeeklyPlanner } from './components/WeeklyPlanner';
import { ShoppingList } from './components/ShoppingList';
import { PantryManager } from './components/PantryManager';
import { PantryRecipes } from './components/PantryRecipes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { toast } from 'sonner@2.0.3';

export default function App() {
  const [activeView, setActiveView] = useState<'recipes' | 'planner' | 'shopping' | 'pantry'>('recipes');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [plannedMeals, setPlannedMeals] = useState<PlannedMeal[]>([]);
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([]);
  const [pantryTab, setPantryTab] = useState<'ingredients' | 'recipes'>('ingredients');

  // Filter recipes based on active filter
  const filteredRecipes = mockRecipes.filter((recipe) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'quick') return recipe.cookTime <= 30;
    if (activeFilter === 'easy') return recipe.difficulty === 'Fácil';
    
    // Map English filter values to Portuguese tags
    const filterTagMap: Record<string, string> = {
      'vegetarian': 'vegetariano',
      'gluten-free': 'sem glúten',
      'dairy-free': 'sem lactose',
      'desserts': 'sobremesa'
    };
    
    const tagToMatch = filterTagMap[activeFilter] || activeFilter;
    return recipe.tags.includes(tagToMatch);
  });

  const addToWeeklyPlan = (recipe: Recipe) => {
    const newMeal: PlannedMeal = {
      id: `meal-${Date.now()}-${Math.random()}`,
      recipe,
      day: 'Segunda', // Default to Monday
      mealType: 'jantar' // Default to dinner
    };
    
    setPlannedMeals(prev => [...prev, newMeal]);
    toast.success(`${recipe.title} adicionada ao seu planejamento!`);
  };

  const removeMealFromPlan = (mealId: string) => {
    setPlannedMeals(prev => prev.filter(meal => meal.id !== mealId));
    toast.success('Refeição removida do planejamento');
  };

  const moveMeal = (mealId: string, newDay: string) => {
    setPlannedMeals(prev => 
      prev.map(meal => 
        meal.id === mealId ? { ...meal, day: newDay } : meal
      )
    );
  };

  const changeMealType = (mealId: string, newMealType: 'café da manhã' | 'almoço' | 'jantar') => {
    setPlannedMeals(prev => 
      prev.map(meal => 
        meal.id === mealId ? { ...meal, mealType: newMealType } : meal
      )
    );
  };

  const addPantryItem = (name: string, category: string) => {
    const newItem: PantryItem = {
      id: `pantry-${Date.now()}-${Math.random()}`,
      name: name.toLowerCase(),
      category,
      addedDate: new Date()
    };
    
    setPantryItems(prev => [...prev, newItem]);
  };

  const removePantryItem = (itemId: string) => {
    setPantryItems(prev => prev.filter(item => item.id !== itemId));
    toast.success('Ingrediente removido da despensa');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        activeView={activeView}
        onViewChange={setActiveView}
        plannedMealsCount={plannedMeals.length}
        pantryItemsCount={pantryItems.length}
      />
      
      <main className="container mx-auto px-4 py-8">
        {activeView === 'recipes' && (
          <div className="space-y-6">
            <FilterBar
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              recipeCount={filteredRecipes.length}
            />
            <RecipeGrid
              recipes={filteredRecipes}
              onAddToWeek={addToWeeklyPlan}
            />
          </div>
        )}

        {activeView === 'pantry' && (
          <Tabs value={pantryTab} onValueChange={(value) => setPantryTab(value as 'ingredients' | 'recipes')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="ingredients">Meus Ingredientes</TabsTrigger>
              <TabsTrigger value="recipes">Sugestões de Receitas</TabsTrigger>
            </TabsList>
            
            <TabsContent value="ingredients" className="mt-6">
              <PantryManager
                pantryItems={pantryItems}
                onAddItem={addPantryItem}
                onRemoveItem={removePantryItem}
              />
            </TabsContent>
            
            <TabsContent value="recipes" className="mt-6">
              <PantryRecipes
                recipes={mockRecipes}
                pantryItems={pantryItems}
                onAddToWeek={addToWeeklyPlan}
              />
            </TabsContent>
          </Tabs>
        )}
        
        {activeView === 'planner' && (
          <WeeklyPlanner
            plannedMeals={plannedMeals}
            onRemoveMeal={removeMealFromPlan}
            onMoveMeal={moveMeal}
            onChangeMealType={changeMealType}
          />
        )}
        
        {activeView === 'shopping' && (
          <ShoppingList plannedMeals={plannedMeals} />
        )}
      </main>
    </div>
  );
}