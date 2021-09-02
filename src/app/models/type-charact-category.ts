import { CharactCategory } from './charact-category';
export class TypeCharactCategory {
  id: number;
  name: string;
  description: string;
  extra_price: number;
  has_color: boolean;
  has_img: boolean;
  state: boolean;
  color: string;
  img: string;
  characteristic_categories_id: number;
  charact_category: CharactCategory;
}
