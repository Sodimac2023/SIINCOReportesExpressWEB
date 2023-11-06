export const TRANSLATE_CALENDAR = {
  dayNames: [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ],
  dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Sab', 'Dom'],
  dayNamesMin: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  monthNamesShort: [
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dic',
  ],
  today: 'Hoy',
  clear: 'Limpiar',
  dateFormat: 'mm/dd/yy',
  weekHeader: 'Wk',
  firstDayOfWeek: 0,
};

export const regex = {
  soloNumeros: '[0-9]*',
  sinCaracteresEspeciales: '[A-Za-z0-9]*',
  letrasAcentosYnumeros:
    '^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]+[a-zA-Z0-9áéíóúÁÉÍÓÚñÑÚüÜ ]*',
  soloLetras: '^[a-zA-Z]+[a-zA-Z ]*',
};
export const SodimacConstant = {
  headers: {
    userHeaderName: "SmcAthUs",
    tokenHeaderName: "SmcAthTkn",
  },
  localStorageSet: {
    userHeaderName: "UsuarioSesion",
    tokenHeaderName: "Usuario",
    releaseVersion: "SMAC_VER_RELEASE",
    developmentVersion: "SMAC_VER_DEV",
  },
};
