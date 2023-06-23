function ordenarTipoComercios(listaObjetos){
  // Objeto para almacenar la frecuencia de cada tipo de comercio
const frecuenciaTipoComercio = {};

// Calcular la frecuencia de cada tipo de comercio
for (const objeto of listaObjetos) {
const tipoComercio = objeto.tipoComercio.nombre;
frecuenciaTipoComercio[tipoComercio] = (frecuenciaTipoComercio[tipoComercio] || 0) + 1;
}

// Obtener los tipos de comercio más repetidos
const tiposComercioMasRepetidos = Object.entries(frecuenciaTipoComercio)
.sort((a, b) => b[1] - a[1])
.slice(0, 6)
.map(([nombreTipoComercio, frecuencia]) => {
  const objetoTipoComercio = listaObjetos.find(objeto => objeto.tipoComercio.nombre === nombreTipoComercio);
  return {
  nombre: nombreTipoComercio,
  frecuencia,
  url: objetoTipoComercio.tipoComercio.comentarios
  };
});

return tiposComercioMasRepetidos

}

function clasificarCategorias(listaObjetos){
  const frecuenciaTipoComercio = {};

  // Calcular la frecuencia de cada tipo de comercio
  for (const objeto of listaObjetos) {
    const tipoComercio = objeto.tipoComercio.nombre;
    frecuenciaTipoComercio[tipoComercio] = (frecuenciaTipoComercio[tipoComercio] || 0) + 1;
  }
  
  // Obtener los tipos de comercio más repetidos, ordenados por nombre
  const tiposComercioMasRepetidos = Object.entries(frecuenciaTipoComercio)
    .sort((a, b) => a[0].localeCompare(b[0])) // Ordenar por nombre en orden alfabético
    .sort((a, b) => b[1] - a[1]) // Ordenar por frecuencia de mayor a menor
    .map(([nombreTipoComercio, frecuencia]) => {
      const objetoTipoComercio = listaObjetos.find(objeto => objeto.tipoComercio.nombre === nombreTipoComercio);
      return {
        nombre: nombreTipoComercio,
        frecuencia,
        url: objetoTipoComercio.tipoComercio.comentarios
      };
    });
    const originalArray = tiposComercioMasRepetidos
    const sortedArray = [...originalArray].sort((a, b) => {
      const nameA = a.nombre.toUpperCase();
      const nameB = b.nombre.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  
  return sortedArray;  
  
}


export { ordenarTipoComercios,clasificarCategorias }