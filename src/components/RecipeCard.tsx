import { Recipe } from '../types';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Clock, Plus, Users, Flame, DollarSign } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner';

interface RecipeCardProps {
  recipe: Recipe;
  onAddToWeek: (recipe: Recipe) => void;
}

// Mapeamento de dificuldade para cores
const difficultyVariant = {
  'Fácil': 'healthy' as const,
  'Médio': 'quick' as const,
  'Difícil': 'protein' as const,
};

// Mapeamento de tags para variantes de badge
const tagVariants: Record<string, 'vegetarian' | 'quick' | 'dessert' | 'gluten-free' | 'dairy' | 'healthy' | 'comfort' | 'outline'> = {
  'vegetariano': 'vegetarian',
  'rápido': 'quick',
  'sobremesa': 'dessert',
  'sem glúten': 'gluten-free',
  'sem lactose': 'dairy',
  'saudável': 'healthy',
  'comfort food': 'comfort',
};

export function RecipeCard({ recipe, onAddToWeek }: RecipeCardProps) {
  const difficultyBadgeVariant = difficultyVariant[recipe.difficulty as keyof typeof difficultyVariant] || 'outline';
  
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-border/50 hover:border-primary/20">
      <div className="relative overflow-hidden">
        {/* Gradiente sutil sobre a imagem */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
        
        <ImageWithFallback
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        <div className="absolute top-2 right-2 z-20">
          <Badge variant={difficultyBadgeVariant} className="shadow-lg backdrop-blur-sm">
            {recipe.difficulty}
          </Badge>
        </div>
        
        {/* Badge de tempo de preparo rápido */}
        {recipe.cookTime <= 30 && (
          <div className="absolute top-2 left-2 z-20">
            <Badge variant="quick" className="shadow-lg backdrop-blur-sm">
              <Clock size={12} />
              Rápido
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-4 bg-gradient-to-b from-card to-card/50">
        <h3 className="mb-2 group-hover:text-primary transition-colors duration-200">{recipe.title}</h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {recipe.description}
        </p>
        
        <div className="flex items-center justify-between mb-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock size={14} className="text-primary" />
            <span>{recipe.cookTime} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={14} className="text-primary" />
            <span>{recipe.servings} porções</span>
          </div>
          <div className="flex items-center gap-1">
            <Flame size={14} className="text-orange-500" />
            <span>{recipe.calories} kcal</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign size={14} className="text-green-600" />
            <span>R$ {recipe.price.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {recipe.tags.slice(0, 3).map((tag) => {
            const variant = tagVariants[tag.toLowerCase()] || 'outline';
            return (
              <Badge key={tag} variant={variant} className="text-xs">
                {tag}
              </Badge>
            );
          })}
        </div>
        
        <Button 
          onClick={() => {
            onAddToWeek(recipe);
            // toast.success(`${recipe.title} adicionada à semana!`, {
            //   icon: '🍽️',
            //   duration: 3000,
            // });
          }}
          className="w-full group-hover:shadow-lg transition-shadow duration-200"
          size="sm"
        >
          <Plus size={14} className="mr-1" />
          Adicionar à Semana
        </Button>
      </CardContent>
    </Card>
  );
}