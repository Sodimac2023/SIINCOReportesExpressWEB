export interface ICostoImportados {
  skusaconsultar: ISkusAConsultar[];
}

export interface ISkusAConsultar {
  sku: string;
  tienda?: string;
}
