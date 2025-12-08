export interface Action<T = any> {
  payload?: T;
  type: string;
}

export interface ListItem {
  id: number;
  name: string;
}

export interface Amount {
  _id?: string;
  cantidad: string;
  medida: string;
  tags: Array<string>;
  tipo: string;
  unidad: string;
}

export interface Bookmark {
  _id?: string;
  articulo?: string;
  best_price?: number;
  best_proveedor?: string;
  brand?: string;
  descripcion: string;
  product?: Product;
  product_master_id?: string;
}

export interface Brand {
  _id?: string;
  nombre: string;
  tags?: Array<string>;
}

export interface CategoriesStock {
  category: string;
  products: ProductStock[];
}

export interface List {
  _id?: string;
  articulo: string;
  bookmark?: boolean;
  cantidad?: string;
  categoria?: string;
  fecha?: string;
  marca?: string;
  medida?: string;
  precio?: number;
  precioSinIva?: number;
  product_id?: string;
  productMaster?: string;
  proveedor?: string;
  subcategoria?: string;
  tipo?: string;
  unidad?: string;
  vigente?: boolean;
}

export interface ListFilter {
  proveedor?: string;
}

export interface ListImport {
  articulo: string;
  precio?: number;
  precioSinIva: number;
  proveedor: string;
  nuevo: boolean;
}

export interface Pagination {
  current_page: number;
  total_pages: number;
  total_items: number;
  items_per_page: number;
  has_next_page: boolean;
  has_prev_page: boolean;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: Pagination;
  status: string;
}

export interface Locality {
  _id: string;
  localidad_nombre: string;
  municipio_nombre: string;
  provincia_nombre: string;
}

export interface Navigation {
  amount?: Amount;
  brand?: string;
  orderBy?: string;
  productMaster: string;
  productFilter?: string;
  provider?: string;
}

export interface Order {
  _id?: string;
  fecha: string;
  order_id?: number;
  productsList: List[];
  proveedor: string;
  telefono?: string;
  total: number;
}

export interface Product {
  best_description?: string;
  best_marca?: string;
  best_price?: number;
  best_proveedor?: string;
  bookmark?: boolean;
  categoria?: string;
  descripcion: string;
  product_base?: boolean;
  product_master_id?: string;
  stock?: boolean;
  subcategoria?: string;
  tags?: Array<string>;
}

export interface ProductStock {
  cantidad: string | number;
  categoria?: string;
  descripcion: string;
  marca?: string;
  medida?: string;
  product_master_id: string;
  tipo?: string;
  unidad?: string;
}

export interface Provider {
  _id?: string;
  condicion_iva?: string;
  email?: string;
  razon_social: string;
  telefono?: string;
  tipo_precio?: string;
}

export interface Province {
  id: number;
  nombre: string;
}

export interface RowProduct {
  cantidad: number;
  id: number;
  lista: string;
  precio: number;
  producto: string;
}

export interface SearchItem {
  name: string;
  type: string;
}

export interface SearchListItems {
  articulo?: string;
  marca?: string;
  productMaster?: string;
  withoutAmount?: boolean;
  withoutBrand?: boolean;
  withoutMaster?: boolean;
}

export interface StockOrder {
  _id?: string;
  categories: CategoriesStock[];
  fecha: string;
  order_id?: number;
}

export interface User {
  email?: string | undefined;
  name?: string | undefined;
  password: string;
  role: string;
  status?: boolean | undefined;
  surname?: string | undefined;
  username: string;
}
