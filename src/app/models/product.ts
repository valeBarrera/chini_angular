import { CharactNative } from './charact-native';
import { Brand } from './brand';
import { Category } from './category';
export class Product {
  id: number;
  name: string;
  description: string;
  img: string;
  rating: number;
  price: number;
  stock: number;
  state: number;
  has_color: boolean;
  is_custom: boolean;
  color: string;
  brand_id: number;
  category_id: number;
  brand: Brand;
  category: Category;
  characteristics_native: CharactNative[];
}
