export class ResultSeguridad {
  EstadoProceso: boolean = false;
  Mensaje: string = '';
  Data: Data | null = null;
}

export class Data {
  LoginName: string = '';
  Name: string = '';
  Mail: string = '';
  Cargo: string = '';
  Token: string = '';
  TokenExpiration: Date | null = null;
}

export function EmptyResultSeguridad(): ResultSeguridad {
  let result = new ResultSeguridad();
  result.EstadoProceso = false;
  return result;
}
