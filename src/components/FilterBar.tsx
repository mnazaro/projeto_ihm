import { FilterType } from '../types';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface FilterBarProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  recipeCount: number;
}

const FILTERS: { value: FilterType; label: string; variant?: 'vegetarian' | 'quick' | 'gluten-free' | 'dairy' | 'healthy' | 'dessert' }[] = [
  { value: 'all', label: 'Todas as Receitas' },
  { value: 'quick', label: 'Rápido (< 30min)', variant: 'quick' },
  { value: 'vegetarian', label: 'Vegetariano', variant: 'vegetarian' },
  { value: 'gluten-free', label: 'Sem Glúten', variant: 'gluten-free' },
  { value: 'dairy-free', label: 'Sem Lactose', variant: 'dairy' },
  { value: 'easy', label: 'Fácil', variant: 'healthy' },
  { value: 'desserts', label: 'Sobremesas', variant: 'dessert' }
];

export function FilterBar({ activeFilter, onFilterChange, recipeCount }: FilterBarProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Descobrir Receitas
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Explore nossa coleção de receitas deliciosas
          </p>
        </div>
        <Badge variant="secondary" className="shadow-sm">
          {recipeCount} receitas
        </Badge>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((filter) => {
          const isActive = activeFilter === filter.value;
          
          return (
            <Button
              key={filter.value}
              variant={isActive ? 'default' : 'outline'}
              size="sm"
              onClick={() => onFilterChange(filter.value)}
              className={`transition-all duration-200 ${
                isActive && filter.variant 
                  ? 'shadow-lg' 
                  : ''
              }`}
              style={
                isActive && filter.variant
                  ? {
                      background: `var(--color-${filter.variant})`,
                      borderColor: 'transparent',
                      color: filter.variant === 'quick' || filter.variant === 'dairy' 
                        ? 'oklch(0.30 0.08 65)' 
                        : 'white'
                    }
                  : undefined
              }
            >
              {filter.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}