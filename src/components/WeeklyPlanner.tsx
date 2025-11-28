import { PlannedMeal, DAYS_OF_WEEK, MEAL_TYPES } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Trash2, 
  Clock, 
  GripVertical, 
  Calendar, 
  Plus,
  Users,
  UtensilsCrossed,
  Sun,
  Sunrise,
  Moon as MoonIcon
} from 'lucide-react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useState } from 'react';

interface WeeklyPlannerProps {
  plannedMeals: PlannedMeal[];
  onRemoveMeal: (mealId: string) => void;
  onMoveMeal: (mealId: string, newDay: string) => void;
  onChangeMealType?: (mealId: string, newMealType: 'café da manhã' | 'almoço' | 'jantar') => void;
}

interface DraggableMealProps {
  meal: PlannedMeal;
  onRemove: (mealId: string) => void;
  onChangeDay: (mealId: string, newDay: string) => void;
  onChangeMealType?: (mealId: string, newMealType: 'café da manhã' | 'almoço' | 'jantar') => void;
}

interface DropZoneProps {
  day: string;
  meals: PlannedMeal[];
  onDrop: (mealId: string, newDay: string) => void;
  onRemove: (mealId: string) => void;
  onChangeDay: (mealId: string, newDay: string) => void;
  onChangeMealType?: (mealId: string, newMealType: 'café da manhã' | 'almoço' | 'jantar') => void;
}

// Safe fallbacks in case of import issues
const FALLBACK_DAYS = [
  'Segunda',
  'Terça', 
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
  'Domingo'
];

const FALLBACK_MEAL_TYPES = ['café da manhã', 'almoço', 'jantar'] as const;

const ItemTypes = {
  MEAL: 'meal',
};

// Ícones e cores por tipo de refeição
const mealTypeConfig = {
  'café da manhã': {
    icon: Sunrise,
    color: 'text-[oklch(0.72_0.16_65)]',
    bgColor: 'bg-[oklch(0.72_0.16_65)]/10',
    label: 'Café da Manhã'
  },
  'almoço': {
    icon: Sun,
    color: 'text-[oklch(0.70_0.10_50)]',
    bgColor: 'bg-[oklch(0.70_0.10_50)]/10',
    label: 'Almoço'
  },
  'jantar': {
    icon: MoonIcon,
    color: 'text-[oklch(0.48_0.12_340)]',
    bgColor: 'bg-[oklch(0.48_0.12_340)]/10',
    label: 'Jantar'
  }
};

function DraggableMeal({ meal, onRemove, onChangeDay, onChangeMealType }: DraggableMealProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.MEAL,
    item: { id: meal.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [isExpanded, setIsExpanded] = useState(false);
  const daysOfWeek = DAYS_OF_WEEK && DAYS_OF_WEEK.length > 0 ? DAYS_OF_WEEK : FALLBACK_DAYS;
  const mealTypes = MEAL_TYPES && MEAL_TYPES.length > 0 ? MEAL_TYPES : FALLBACK_MEAL_TYPES;
  
  const mealConfig = mealTypeConfig[meal.mealType] || mealTypeConfig['almoço'];
  const MealIcon = mealConfig.icon;

  return (
    <div
      ref={drag}
      className={`group relative bg-card rounded-xl border-2 border-border/50 shadow-sm transition-all duration-300 overflow-hidden ${
        isDragging 
          ? 'opacity-40 scale-95 rotate-2' 
          : 'opacity-100 hover:shadow-lg hover:border-primary/30'
      }`}
    >
      {/* Gradiente de fundo sutil */}
      <div className={`absolute inset-0 ${mealConfig.bgColor} opacity-50`} />
      
      {/* Header colorido por tipo de refeição */}
      <div className={`relative ${mealConfig.bgColor} px-4 py-3 border-b border-border/30`}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="cursor-move p-1.5 rounded-lg bg-background/50 backdrop-blur-sm hover:bg-background transition-colors">
              <GripVertical size={16} className={`${mealConfig.color} transition-transform group-hover:scale-110`} />
            </div>
            <div className={`p-1.5 rounded-lg ${mealConfig.bgColor}`}>
              <MealIcon size={14} className={mealConfig.color} />
            </div>
            <div className="flex-1 min-w-0">
              <Badge variant="outline" className="text-xs capitalize font-medium border-current/20">
                {meal.mealType}
              </Badge>
            </div>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onRemove(meal.id)}
            className="p-1.5 h-auto rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all flex-shrink-0"
          >
            <Trash2 size={14} />
          </Button>
        </div>
      </div>

      {/* Conteúdo do card */}
      <div className="relative p-4 space-y-3">
        {/* Título da receita */}
        <div>
          <h4 className="text-base font-semibold line-clamp-2 leading-snug mb-2">
            {meal.recipe.title}
          </h4>
          
          {/* Info da receita */}
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-primary" />
              <span className="font-medium">{meal.recipe.cookTime} min</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users size={14} className="text-primary" />
              <span className="font-medium">{meal.recipe.servings}p</span>
            </div>
            <div className="flex items-center gap-1.5">
              <UtensilsCrossed size={14} className="text-primary" />
              <span className="font-medium">{meal.recipe.difficulty}</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        {meal.recipe.tags && meal.recipe.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {meal.recipe.tags.slice(0, 2).map((tag, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {meal.recipe.tags.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{meal.recipe.tags.length - 2}
              </Badge>
            )}
          </div>
        )}

        {/* Controles expansíveis */}
        <div className="pt-2 border-t border-border/30">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full text-xs h-7 text-muted-foreground hover:text-foreground"
          >
            {isExpanded ? 'Menos opções' : 'Mais opções'}
          </Button>
        </div>

        {/* Controles expandidos */}
        {isExpanded && (
          <div className="space-y-3 pt-2 animate-in slide-in-from-top-2 duration-300">
            {/* Day selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                Dia da semana
              </label>
              <Select
                value={meal.day}
                onValueChange={(newDay) => onChangeDay(meal.id, newDay)}
              >
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {daysOfWeek.map((day) => (
                    <SelectItem key={day} value={day} className="text-sm">
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Meal type selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                Tipo de refeição
              </label>
              <Select
                value={meal.mealType}
                onValueChange={(newMealType) => 
                  onChangeMealType && onChangeMealType(meal.id, newMealType as 'café da manhã' | 'almoço' | 'jantar')
                }
              >
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {mealTypes.map((mealType) => {
                    const config = mealTypeConfig[mealType] || mealTypeConfig['almoço'];
                    const Icon = config.icon;
                    return (
                      <SelectItem key={mealType} value={mealType} className="text-sm">
                        <div className="flex items-center gap-2">
                          <Icon size={14} className={config.color} />
                          <span className="capitalize">{mealType}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DropZone({ day, meals, onDrop, onRemove, onChangeDay, onChangeMealType }: DropZoneProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.MEAL,
    drop: (item: { id: string }) => {
      onDrop(item.id, day);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  // Use fallback meal types if import fails
  const mealTypes = MEAL_TYPES && MEAL_TYPES.length > 0 ? MEAL_TYPES : FALLBACK_MEAL_TYPES;

  // Group meals by meal type for better organization
  const mealsByType = meals.reduce((acc, meal) => {
    if (!acc[meal.mealType]) {
      acc[meal.mealType] = [];
    }
    acc[meal.mealType].push(meal);
    return acc;
  }, {} as Record<string, PlannedMeal[]>);

  return (
    <Card className={`flex flex-col h-full min-h-[400px] transition-all duration-300 ${
      isOver 
        ? 'border-primary border-2 bg-primary/5 shadow-xl scale-[1.02] ring-2 ring-primary/20' 
        : 'border-border/50 hover:shadow-lg hover:border-primary/20'
    }`}>
      <CardHeader className="pb-4 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b border-border/30">
        <CardTitle className="text-lg font-bold flex items-center justify-between">
          <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            {day}
          </span>
          {meals.length > 0 && (
            <Badge 
              variant="default" 
              className="text-xs font-semibold shadow-sm animate-pulse"
            >
              {meals.length} {meals.length === 1 ? 'refeição' : 'refeições'}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <div 
          ref={drop}
          className="h-full p-4 space-y-4"
        >
          {meals.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center space-y-3">
              <div className={`p-4 rounded-full transition-all duration-300 ${
                isOver 
                  ? 'bg-primary/20 scale-110' 
                  : 'bg-muted'
              }`}>
                <Plus size={32} className={`transition-colors ${
                  isOver ? 'text-primary' : 'text-muted-foreground/40'
                }`} />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  {isOver ? 'Solte aqui!' : 'Dia livre'}
                </p>
                <p className="text-xs text-muted-foreground/60">
                  Arraste uma refeição
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Show meals grouped by type */}
              {mealTypes.map((mealType) => {
                const mealsOfType = mealsByType[mealType] || [];
                if (mealsOfType.length === 0) return null;
                
                const config = mealTypeConfig[mealType] || mealTypeConfig['almoço'];
                const Icon = config.icon;
                
                return (
                  <div key={mealType} className="space-y-3">
                    {mealsOfType.length > 1 && (
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-lg ${config.bgColor}`}>
                          <Icon size={14} className={config.color} />
                        </div>
                        <Badge variant="secondary" className="text-xs font-medium capitalize">
                          {mealType} ({mealsOfType.length})
                        </Badge>
                      </div>
                    )}
                    {mealsOfType.map((meal) => (
                      <DraggableMeal
                        key={meal.id}
                        meal={meal}
                        onRemove={onRemove}
                        onChangeDay={onChangeDay}
                        onChangeMealType={onChangeMealType}
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function WeeklyPlanner({ plannedMeals, onRemoveMeal, onMoveMeal, onChangeMealType }: WeeklyPlannerProps) {
  // Use fallback if DAYS_OF_WEEK is undefined or empty
  const daysOfWeek = DAYS_OF_WEEK && DAYS_OF_WEEK.length > 0 ? DAYS_OF_WEEK : FALLBACK_DAYS;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Planejamento Semanal
            </h2>
            {plannedMeals.length > 0 && (
              <Badge variant="secondary" className="shadow-sm">
                <Calendar size={12} />
                {plannedMeals.length} {plannedMeals.length === 1 ? 'refeição planejada' : 'refeições planejadas'}
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground">
            Arraste e solte refeições para organizar sua semana de forma prática
          </p>
        </div>
        
        {/* Weekly Grid View - Static for all screen sizes */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4">
          {daysOfWeek.map((day) => {
            const dayMeals = plannedMeals.filter(meal => meal.day === day);
            return (
              <DropZone
                key={day}
                day={day}
                meals={dayMeals}
                onDrop={onMoveMeal}
                onRemove={onRemoveMeal}
                onChangeDay={onMoveMeal}
                onChangeMealType={onChangeMealType}
              />
            );
          })}
        </div>
        
        {/* Empty State */}
        {plannedMeals.length === 0 && (
          <Card className="border-dashed border-2 border-muted-foreground/20 mt-6">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              {/* Ilustração SVG de estado vazio */}
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl animate-pulse" />
                <div className="relative p-8 rounded-full bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
                  <Calendar size={72} className="text-muted-foreground/40" strokeWidth={1.5} />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                Nenhuma refeição planejada ainda
              </h3>
              <p className="text-sm text-muted-foreground max-w-md mb-6">
                Visite a página de <span className="font-medium text-primary">Descobrir</span> e adicione receitas deliciosas ao seu planejamento semanal
              </p>
              
              {/* Dica visual */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 px-4 py-2 rounded-lg">
                <GripVertical size={14} />
                <span>Dica: Você pode arrastar e soltar para reorganizar</span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DndProvider>
  );
}