import { useState } from 'react';
import { PantryItem, INGREDIENT_CATEGORIES } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Package, 
  Plus, 
  Trash2, 
  Search,
  Beef,
  Carrot,
  Apple,
  Wheat,
  Milk,
  Sparkles,
  Cookie,
  Soup
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface PantryManagerProps {
  pantryItems: PantryItem[];
  onAddItem: (name: string, category: string) => void;
  onRemoveItem: (itemId: string) => void;
}

// Safe fallback for categories in case of import issues
const FALLBACK_CATEGORIES = [
  'Proteínas',
  'Vegetais',
  'Frutas',
  'Grãos',
  'Laticínios',
  'Especiarias e Ervas',
  'Itens da Despensa',
  'Outros'
];

// Ícones coloridos por categoria
const categoryIcons: Record<string, { icon: typeof Beef; color: string; bgColor: string }> = {
  'Proteínas': { icon: Beef, color: 'text-[oklch(0.52_0.20_25)]', bgColor: 'bg-[oklch(0.52_0.20_25)]/10' },
  'Vegetais': { icon: Carrot, color: 'text-[oklch(0.62_0.18_145)]', bgColor: 'bg-[oklch(0.62_0.18_145)]/10' },
  'Frutas': { icon: Apple, color: 'text-[oklch(0.48_0.12_340)]', bgColor: 'bg-[oklch(0.48_0.12_340)]/10' },
  'Grãos': { icon: Wheat, color: 'text-[oklch(0.70_0.10_50)]', bgColor: 'bg-[oklch(0.70_0.10_50)]/10' },
  'Laticínios': { icon: Milk, color: 'text-[oklch(0.72_0.16_65)]', bgColor: 'bg-[oklch(0.72_0.16_65)]/10' },
  'Especiarias e Ervas': { icon: Sparkles, color: 'text-[oklch(0.58_0.15_130)]', bgColor: 'bg-[oklch(0.58_0.15_130)]/10' },
  'Itens da Despensa': { icon: Cookie, color: 'text-[oklch(0.50_0.08_35)]', bgColor: 'bg-[oklch(0.50_0.08_35)]/10' },
  'Outros': { icon: Soup, color: 'text-muted-foreground', bgColor: 'bg-muted' }
};

export function PantryManager({ pantryItems, onAddItem, onRemoveItem }: PantryManagerProps) {
  const categories = INGREDIENT_CATEGORIES && INGREDIENT_CATEGORIES.length > 0 ? INGREDIENT_CATEGORIES : FALLBACK_CATEGORIES;
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState(categories[0] || 'Other');
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddItem = () => {
    if (!newItemName.trim()) {
      toast.error('Por favor, insira o nome do ingrediente');
      return;
    }

    // Check if item already exists
    const exists = pantryItems.some(item => 
      item.name.toLowerCase() === newItemName.toLowerCase()
    );

    if (exists) {
      toast.error('Este ingrediente já está na sua despensa');
      return;
    }

    onAddItem(newItemName.trim(), newItemCategory);
    setNewItemName('');
    toast.success(`${newItemName} adicionado à sua despensa!`, {
      icon: '✨',
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddItem();
    }
  };

  // Filter items by search term
  const filteredItems = pantryItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Group items by category
  const itemsByCategory = filteredItems.reduce((acc, item) => {
    const category = item.category || 'Outros';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, PantryItem[]>);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Minha Despensa
        </h2>
        <p className="text-muted-foreground">
          Adicione ingredientes que você tem em casa para descobrir receitas que pode fazer
        </p>
      </div>

      {/* Add new item form */}
      <Card className="border-primary/20 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
          <CardTitle className="flex items-center gap-2 text-base">
            <div className="p-1.5 rounded-md bg-primary/10 text-primary">
              <Plus size={16} />
            </div>
            Adicionar Ingrediente
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="flex gap-2 flex-wrap sm:flex-nowrap">
            <Input
              placeholder="Digite o nome do ingrediente..."
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 min-w-[200px]"
            />
            <Select value={newItemCategory} onValueChange={setNewItemCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => {
                  const categoryConfig = categoryIcons[category] || categoryIcons['Outros'];
                  const Icon = categoryConfig.icon;
                  return (
                    <SelectItem key={category} value={category}>
                      <div className="flex items-center gap-2">
                        <Icon size={14} className={categoryConfig.color} />
                        {category}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <Button onClick={handleAddItem} className="whitespace-nowrap">
              <Plus size={14} className="sm:mr-2" />
              <span className="hidden sm:inline">Adicionar</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search and filter */}
      {pantryItems.length > 0 && (
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Pesquisar na sua despensa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      )}

      {/* Pantry items */}
      {pantryItems.length === 0 ? (
        <Card className="border-dashed border-2 border-muted-foreground/20">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            {/* Ilustração SVG de estado vazio */}
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl animate-pulse" />
              <div className="relative p-6 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10">
                <Package size={64} className="text-muted-foreground/40" strokeWidth={1.5} />
              </div>
            </div>
            
            <h3 className="text-lg font-medium text-muted-foreground mb-2">
              Sua despensa está vazia
            </h3>
            <p className="text-sm text-muted-foreground max-w-md mb-6">
              Adicione ingredientes que você tem em casa para receber sugestões personalizadas de receitas
            </p>
            
            {/* Sugestões de categorias */}
            <div className="flex flex-wrap gap-2 justify-center max-w-lg">
              {categories.slice(0, 4).map((category) => {
                const categoryConfig = categoryIcons[category] || categoryIcons['Outros'];
                const Icon = categoryConfig.icon;
                return (
                  <Badge 
                    key={category} 
                    variant="outline" 
                    className="cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => setNewItemCategory(category)}
                  >
                    <Icon size={12} className={categoryConfig.color} />
                    {category}
                  </Badge>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="shadow-sm">
              <Package size={12} />
              {pantryItems.length} ingredientes
            </Badge>
            {filteredItems.length !== pantryItems.length && (
              <span className="text-sm text-muted-foreground">
                Mostrando {filteredItems.length} de {pantryItems.length}
              </span>
            )}
          </div>

          {Object.entries(itemsByCategory).map(([category, items]) => {
            const categoryConfig = categoryIcons[category] || categoryIcons['Outros'];
            const Icon = categoryConfig.icon;
            
            return (
              <Card key={category} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <div className={`p-2 rounded-lg ${categoryConfig.bgColor}`}>
                      <Icon size={18} className={categoryConfig.color} />
                    </div>
                    {category}
                    <Badge variant="outline" className="ml-auto">
                      {items.length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="group flex items-center gap-2 bg-gradient-to-r from-secondary to-secondary/50 hover:from-secondary/80 hover:to-secondary/30 rounded-lg px-3 py-2 transition-all duration-200 hover:shadow-md"
                      >
                        <span className="text-sm capitalize font-medium">{item.name}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            onRemoveItem(item.id);
                            toast.success(`${item.name} removido da despensa`, {
                              icon: '🗑️',
                            });
                          }}
                          className="p-1 h-auto text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 size={12} />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}