import { ImageSide } from './image-side';
export class ImageType {
  id: number;
  name: string;
  description: string;
  extra_price: number;
  image_side_id: number;
  side: ImageSide;
}
