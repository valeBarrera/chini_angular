import { ImageType } from './image-type';
import { TypeCharactCategory } from './type-charact-category';
import { Category } from './category';
export class CharactCategory {
  id: number;
  name: string;
  description: string;
  category_id: number;
  image_type_id: number;
  is_optional: boolean;
  is_custom: boolean;
  is_image: boolean;
  is_design: boolean;
  price: number;
  state: boolean;
  category: Category;
  type_charact_categorys: TypeCharactCategory[];
  imageType: ImageType;
}
