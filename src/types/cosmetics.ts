
export interface Ingredient {
  name: string;
  purpose: string;
  benefits: string[];
  concerns: string[];
  rating: 'safe' | 'caution' | 'avoid';
}

export interface AnalysisResult {
  productName: string;
  brand: string;
  category: string;
  description: string;
  rating: number;
  reviewCount: number;
  keyBenefits: string[];
  skinTypes: string[];
  texture: string;
  scent: string;
  priceRange: string;
  availability: string;
  ingredients: Ingredient[];
  warnings: string[];
  usage: string;
  formula: string[];
}
