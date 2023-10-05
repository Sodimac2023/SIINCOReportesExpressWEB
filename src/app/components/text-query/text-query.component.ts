import { Component, OnInit } from '@angular/core';
import { ServicesQueryService } from 'src/app/services/services-query.service';
import * as XLSX from 'xlsx';
import * as Papa from 'papaparse';

@Component({
  selector: 'app-text-query',
  templateUrl: './text-query.component.html',
  styleUrls: ['./text-query.component.css'],
})
export class TextQueryComponent implements OnInit {
  resultado: any[] = [];
  textoQuery: string = '';
  textareaVacio: boolean = false;
  errorEnPeticion: boolean = false;
  msgError: string = '';
  cargando: boolean = false;
  lineNumbers: number[] = [];
  tipoConsultaSeleccionada: string = 'Selecciona una opcion';
  tipoFiltroSeleccionado: string = 'Selecciona una opcion';
  paginaActual: number = 1;
  elementosPorPagina: number = 10;
  filtroSeleccionado: string = ''; // Almacenará la opción seleccionada en el select
  filtroNumeroTienda: string = ''; // Almacenará el número de tienda
  filtroNumeroProducto: string = ''; // Almacenará el número de producto
  filtroFechaInicio: string = ''; // Almacenará la fecha de inicio
  filtroFechaFin: string = ''; // Almacenará la fecha de fin
  rangoFecha: string = '';
  banFiltroNumeroTienda: boolean = false;
  banFiltroNumeroProducto: boolean = false;
  banFiltroRangoFecha: boolean = false;

  // Define las opciones de tipoConsulta como un arreglo de objetos con título y valor
  tipoConsulta: { titulo: string; valor: string }[] = [
    { titulo: 'Selecciona una opcion', valor: 'Selecciona una opcion' },
    {
      titulo: 'Consulta tabla 1 aborrar_78',
      valor: 'select * from aborrar_78',
    },
    {
      titulo: 'Consulta tabla 2 aborrar_78_2',
      valor: 'select * from aborrar_78_2',
    },
    {
      titulo: 'Consulta invaudee',
      valor: `select 
      a.audit_number,
      c.org_lvl_number, 
      c.org_name_full,
      b.prd_lvl_number, 
      b.prd_name_full,
      a.trans_date,
      a.trans_trn_code,
      d.inv_drpt_desc, 
      a.trans_ref, 
      a.trans_ref2,
      a.inv_eff_ret,
      a.inv_eff_bal,
      a.trans_type_code,
      a.inv_drpt_code,
      (a.trans_qty) as qty,
      (a.trans_ext_cost) as Costo,
      (a.trans_ext_retl) as Venta,
      (a.trans_ext_vat) as IVA, 
      a.trans_session,
      a.reslt_oh_qty, 
      a.reslt_oh_cost
   from uniprod.invaudee a, uniprod.prdmstee b, uniprod.orgmstee c, uniprod.invtrdee d
   where a.trans_prd_child = b.prd_lvl_child
   and a.trans_org_child = c.org_lvl_child
   and a.trans_date between '01-09-2023' and '30-09-2023'
   and a.inv_mrpt_code in ('SS')
   and a.trans_type_code = d.inv_type_code
   and a.trans_trn_code = d.inv_trn_code
   and a.inv_mrpt_code = d.inv_mrpt_code`,
    },
  ];
  tipoFiltro: { titulo: string; valor: string }[] = [
    {
      titulo: 'Numero de Tienda',
      valor: '',
    },
    {
      titulo: 'Numero de Producto',
      valor: '',
    },
    {
      titulo: 'Rango de fechas',
      valor: '',
    },
  ];
  constructor(private queryService: ServicesQueryService) {}

  ngOnInit(): void {}

  validarConsulta(query: string): boolean {
    // Utiliza una expresión regular para buscar la sentencia SELECT en el query sin espacios
    const regex1 =
      /^SELECT\s[\w\.,\s\n\r]+FROM\s[\w]+\sWHERE\s[\w\.\s=\-'()&]+$/i;
    // expresion que valida saltos de linea
    const regex2 = /^SELECT[\s\S]*FROM[\s\S]*WHERE[\s\S]*$/i;

    const regex3 = /^SELECT\s+[\w,\s]*\s+FROM\s+[\w]+\s+WHERE\s+[\w\s=']+;$/i;

    const regex4 =
      /^SELECT\s(?:\w+\s*(?:,\s*\w+\s*)*)\s*FROM\s\w+\s*(?:WHERE\s[\s\S]*)?;$/i;
    const regex5 = /^\s*SELECT\s+.*\s+FROM\s+.*$/i;

    return (
      regex1.test(query) ||
      regex2.test(query) ||
      regex3.test(query) ||
      regex4.test(query) ||
      regex5.test(query)
    );
  }

  enviarQuery() {
    if (this.textoQuery.trim() === '') {
      this.textareaVacio = true;
      this.errorEnPeticion = false;
    } else if (!this.validarConsulta(this.textoQuery)) {
      this.textareaVacio = false;
      this.errorEnPeticion = true;
      this.resultado = [];
      this.msgError = 'La consulta debe contener la sentencia SELECT.';
    } else {
      this.textareaVacio = false;
      this.cargando = true; // Inicia la animación de carga
      this.queryService.obtenerDatosDeAPI(this.textoQuery).subscribe(
        (data) => {
          this.resultado = this.procesarValores(data);
          this.cargando = false; // Detiene la animación de carga
        },
        (error) => {
          this.cargando = false; // Detiene la animación de carga en caso de error
          this.errorEnPeticion = true;
          this.resultado = [];
          this.msgError = 'Error al obtener datos:  ' + error.error;
          console.error('Error al obtener datos:', error);
        }
      );
    }
  }

  cerrarModal() {
    this.errorEnPeticion = false;
    this.textareaVacio = false;
  }

  obtenerNombresColumnas(objeto: any): string[] {
    return Object.keys(objeto);
  }
  // Función para procesar los valores antes de mostrarlos
  procesarValores(data: any[]): any[] {
    return data.map((item) => {
      const processedItem: any = {};
      for (const key in item) {
        if (item[key] === null || typeof item[key] === 'object') {
          processedItem[key] = 'null';
        } else {
          processedItem[key] = item[key];
        }
      }
      return processedItem;
    });
  }

  // Función para seleccionar una opción del select
  seleccionarOpcion(opcion: string) {
    // Encuentra la opción seleccionada en el arreglo tipoConsulta
    const seleccion = this.tipoConsulta.find((item) => item.valor === opcion);
    if (seleccion) {
      // Establece el textoQuery con la opción seleccionada
      this.textoQuery = seleccion.valor;
      this.updateLineNumbers();
    }
  }
  seleccionarOpcionFiltro(opcion: any) {
    switch (opcion.titulo) {
      case 'Numero de Tienda':
        this.banFiltroNumeroTienda = opcion.valor;
        break;
      case 'Numero de Producto':
        this.banFiltroNumeroProducto = opcion.valor;
        break;
      case 'Rango de fechas':
        this.banFiltroRangoFecha = opcion.valor;
        break;
    }
  }

  // Función para exportar los datos a un archivo Excel
  exportarExcel() {
    // if (this.resultado.length > 0) {
    //   const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.resultado);
    //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
    //   XLSX.utils.book_append_sheet(wb, ws, 'Datos'); // 'Datos' es el nombre de la hoja

    //   // Genera el archivo Excel y lo descarga
    //   XLSX.writeFile(wb, 'datos.xlsx');
    // }
    if (this.resultado.length > 0) {
      // Convierte los datos a formato CSV usando papaparse
      const csvData = Papa.unparse(this.resultado);

      // Crea un Blob con los datos CSV y el tipo de archivo
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });

      // Crea una URL para el Blob
      const url = window.URL.createObjectURL(blob);

      // Crea un enlace (link) para descargar el archivo CSV
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'datos.csv'); // Nombre del archivo CSV

      // Simula un clic en el enlace para descargar el archivo
      link.click();

      // Libera la URL del Blob
      window.URL.revokeObjectURL(url);
    }
  }

  // Función para actualizar los números de línea
  updateLineNumbers() {
    const lines = this.textoQuery.split('\n');
    this.lineNumbers = Array.from(
      { length: lines.length },
      (_, index) => index + 1
    );
  }

  cambiarPagina(event: number): void {
    this.paginaActual = event;
  }

  borrarFiltro() {
    // Aquí puedes borrar los valores de los filtros y resetear los campos
    this.filtroNumeroTienda = '';
    this.filtroNumeroProducto = '';
    this.filtroFechaInicio = '';
    this.filtroFechaFin = '';
  }
}
