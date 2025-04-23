export type Category = 'Food' | 'Furniture' | 'Accessory';

export interface ExpenseItem {
  id: string;
  name: string;
  category: Category;
  amount: number;
}