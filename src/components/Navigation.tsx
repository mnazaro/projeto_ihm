import { Button } from './ui/button';
import { Calendar, ChefHat, ShoppingCart, Package, Moon, Sun } from 'lucide-react';
import { useTheme } from './ui/theme-provider';

interface NavigationProps {
  activeView: 'recipes' | 'planner' | 'shopping' | 'pantry';
  onViewChange: (view: 'recipes' | 'planner' | 'shopping' | 'pantry') => void;
  plannedMealsCount: number;
  pantryItemsCount: number;
}

export function Navigation({ activeView, onViewChange, plannedMealsCount, pantryItemsCount }: NavigationProps) {
  const { theme, setTheme } = useTheme();
  
  const navItems = [
    {
      id: 'recipes' as const,
      label: 'Descobrir',
      icon: ChefHat,
      description: 'Navegar receitas'
    },
    {
      id: 'pantry' as const,
      label: 'Despensa',
      icon: Package,
      description: 'Seus ingredientes',
      badge: pantryItemsCount > 0 ? pantryItemsCount : undefined
    },
    {
      id: 'planner' as const,
      label: 'Semana',
      icon: Calendar,
      description: 'Planejamento semanal',
      badge: plannedMealsCount > 0 ? plannedMealsCount : undefined
    },
    {
      id: 'shopping' as const,
      label: 'Lista',
      icon: ShoppingCart,
      description: 'Lista de compras'
    }
  ];

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const isDark = theme === 'dark';

  return (
    <div className="border-b bg-gradient-to-r from-background via-background/95 to-primary/5 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <ChefHat size={24} />
            </div>
            <div>
              <h1 className="text-lg font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                RecipeWeek
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Planeje suas refeições com facilidade
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <nav className="flex gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? 'default' : 'ghost'}
                    onClick={() => onViewChange(item.id)}
                    className="relative flex items-center gap-2"
                  >
                    <Icon size={16} />
                    <span className="hidden sm:inline">{item.label}</span>
                    {item.badge !== undefined && (
                      <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow-sm animate-pulse">
                        {item.badge}
                      </span>
                    )}
                  </Button>
                );
              })}
            </nav>

            {/* Botão de alternância de tema */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="ml-2"
              title={isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}