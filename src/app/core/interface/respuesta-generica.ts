export class RespuestaGenerica {
    Trama_Control?: RespuestaControl;
    Trama_Util?: RespuestaUtil;
  }
  
  export class RespuestaControl {
    Control?: boolean;
    Id?: number;
    Codigo?: number;
    Respuesta?: string;
  }
  
  export class RespuestaUtil {
    Objeto?: any;
  }