import { Recipe } from '../types';

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Massa Cremosa Primavera',
    description: 'Vegetais frescos com massa cremosa em molho leve de alho',
    image: 'https://images.unsplash.com/photo-1619568767436-645129f006d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGRpc2glMjBmb29kfGVufDF8fHx8MTc1NTgxOTU1Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    cookTime: 25,
    difficulty: 'Fácil',
    tags: ['vegetariano', 'rápido'],
    ingredients: ['massa', 'pimentões', 'abobrinha', 'creme de leite', 'alho', 'parmesão'],
    servings: 4,
    calories: 420,
    price: 18.50
  },
  {
    id: '2',
    title: 'Salada Mediterrânea',
    description: 'Mix de folhas frescas com azeitonas, tomates e queijo feta',
    image: 'https://images.unsplash.com/photo-1555057949-7e4a30956f1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxhZCUyMGhlYWx0aHklMjB2ZWdldGFibGVzfGVufDF8fHx8MTc1NTgxOTU1Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    cookTime: 15,
    difficulty: 'Fácil',
    tags: ['vegetariano', 'sem glúten', 'rápido'],
    ingredients: ['folhas verdes', 'tomates', 'azeitonas', 'queijo feta', 'azeite', 'limão'],
    servings: 2,
    calories: 280,
    price: 12.90
  },
  {
    id: '3',
    title: 'Frango Grelhado com Ervas',
    description: 'Peito de frango suculento grelhado com ervas aromáticas',
    image: 'https://images.unsplash.com/photo-1496074620649-6b1b02e5c1c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwY2hpY2tlbiUyMGRpbm5lcnxlbnwxfHx8fDE3NTU4MTk1NTd8MA&ixlib-rb-4.1.0&q=80&w=1080',
    cookTime: 30,
    difficulty: 'Médio',
    tags: ['sem glúten', 'sem lactose'],
    ingredients: ['peito de frango', 'ervas', 'azeite', 'alho', 'limão', 'pimenta do reino'],
    servings: 4,
    calories: 320,
    price: 22.00
  },
  {
    id: '4',
    title: 'Sopa de Legumes',
    description: 'Sopa reconfortante repleta de legumes da estação',
    image: 'https://images.unsplash.com/photo-1665594051407-7385d281ad76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3VwJTIwYm93bCUyMGNvbWZvcnQlMjBmb29kfGVufDF8fHx8MTc1NTgwNDI2Nnww&ixlib-rb-4.1.0&q=80&w=1080',
    cookTime: 45,
    difficulty: 'Fácil',
    tags: ['vegetariano', 'sem glúten', 'sem lactose'],
    ingredients: ['cenouras', 'aipo', 'cebolas', 'caldo de legumes', 'batatas', 'ervas'],
    servings: 6,
    calories: 180,
    price: 8.50
  },
  {
    id: '5',
    title: 'Legumes Salteados Asiáticos',
    description: 'Vegetais coloridos refogados em molho saboroso',
    image: 'https://images.unsplash.com/photo-1599297915779-0dadbd376d49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGlyJTIwZnJ5JTIwdmVnZXRhYmxlc3xlbnwxfHx8fDE3NTU4MTk1NTd8MA&ixlib-rb-4.1.0&q=80&w=1080',
    cookTime: 20,
    difficulty: 'Fácil',
    tags: ['vegetariano', 'sem lactose', 'rápido'],
    ingredients: ['brócolis', 'pimentões', 'ervilhas tortas', 'molho shoyu', 'gengibre', 'alho'],
    servings: 3,
    calories: 150,
    price: 11.80
  },
  {
    id: '6',
    title: 'Filé de Salmão Glaceado',
    description: 'Salmão perfeitamente preparado com glaceado de mel e ervas',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUkUg5n9XO4VxDqpAHhhRRU5AdyKv_aKIlZQ&s', // Imagem mantida
    cookTime: 25,
    difficulty: 'Médio',
    tags: ['sem glúten', 'sem lactose', 'rápido'], // Tag 'rápido' adicionada
    ingredients: ['filé de salmão', 'mel', 'molho shoyu', 'gengibre', 'alho', 'limão'],
    servings: 2,
    calories: 450,
    price: 35.00
  },
  {
    id: '7',
    title: 'Pão de Queijo',
    description: 'Bolinhos de queijo mineiros, crocantes por fora e macios por dentro.',
    image: 'https://amopaocaseiro.com.br/wp-content/uploads/2022/08/yt-069_pao-de-queijo_receita-840x560.jpg', // Imagem mantida
    cookTime: 40,
    difficulty: 'Fácil',
    tags: ['vegetariano', 'sem glúten'],
    ingredients: ['polvilho azedo', 'polvilho doce', 'queijo minas', 'ovos', 'leite', 'óleo'],
    servings: 12,
    calories: 85,
    price: 2.50
  },
  {
    id: '8',
    title: 'Feijoada Completa',
    description: 'A tradicional feijoada brasileira com feijão preto e carnes de porco.',
    image: 'https://swiftbr.vteximg.com.br/arquivos/617844-kit-feijoada_3.jpg', // Imagem mantida
    cookTime: 180,
    difficulty: 'Médio',
    tags: ['sem glúten', 'sem lactose'],
    ingredients: ['feijão preto', 'carne seca', 'costelinha de porco', 'paio', 'bacon', 'cebola', 'alho', 'laranja', 'couve'],
    servings: 8,
    calories: 520,
    price: 28.00
  },
  {
    id: '10',
    title: 'Brigadeiro',
    description: 'O doce de festa mais amado do Brasil, feito com leite condensado e chocolate.',
    image: 'https://uploads.ric.com.br/uploads/2023/03/brigadeiro-1.png', // Imagem mantida
    cookTime: 25,
    difficulty: 'Fácil',
    tags: ['vegetariano', 'sem glúten', 'rápido', 'sobremesa'], // Tag 'Sobremesa' adicionada
    ingredients: ['leite condensado', 'chocolate em pó', 'manteiga', 'chocolate granulado'],
    servings: 20,
    calories: 120,
    price: 1.80
  },
  // --- Novas Receitas Adicionadas ---
  {
    id: '11',
    title: 'Strogonoff de Frango',
    description: 'Creme de leite, frango em cubos e champignon. O clássico brasileiro.',
    image: 'https://melepimenta.com/wp-content/uploads/2020/06/Estrogonofe-frango-Baixa-2.jpg.webp',
    cookTime: 25,
    difficulty: 'Fácil',
    tags: ['sem glúten', 'rápido'],
    ingredients: ['peito de frango', 'creme de leite', 'ketchup', 'mostarda', 'champignon', 'cebola', 'alho', 'batata palha'],
    servings: 4,
    calories: 380,
    price: 24.00
  },
  {
    id: '12',
    title: 'Macarrão à Bolonhesa',
    description: 'O clássico molho de carne moída com tomate, servido sobre espaguete.',
    image: 'https://areademulher.r7.com/wp-content/uploads/2022/04/macarrao-a-bolonhesa-receita-simples-e-facil-de-fazer.jpeg',
    cookTime: 50,
    difficulty: 'Fácil',
    tags: ['sem lactose'],
    ingredients: ['espaguete', 'carne moída', 'tomate pelado', 'cebola', 'alho', 'cenoura', 'manjericão'],
    servings: 4,
    calories: 450,
    price: 19.50
  },
  {
    id: '13',
    title: 'Tapioca de Frango e Queijo',
    description: 'Goma de tapioca crocante recheada com frango desfiado e queijo derretido.',
    image: 'https://images.rappi.com.br/products/1720887229566_e8d0dba1-5257-4627-8f02-d8d9a626bf3e_93feafe986e5ab3eb9fdea24d15a0059.jpg',
    cookTime: 15,
    difficulty: 'Fácil',
    tags: ['sem glúten', 'rápido'],
    ingredients: ['goma de tapioca', 'frango desfiado', 'queijo mussarela', 'requeijão (opcional)', 'tomate'],
    servings: 1,
    calories: 320,
    price: 8.00
  }
];