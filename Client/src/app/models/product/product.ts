export interface Product {
  id?: number;
  name: string;
  categoryId: number | null;
  description: string;
  directions: string;
  price: number;
  in_stock: number;
  categoryName: string;
  image_url?: string;
  imageFile?: any;
}
