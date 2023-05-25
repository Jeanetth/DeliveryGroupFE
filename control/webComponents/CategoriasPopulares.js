export function getCategoriasPopulares(data) {
    const categoriasCount = new Map();
    if (data) {
      data.forEach(item => {
        const comercioNombre = item.tipoComercio.nombre;
        if (categoriasCount.has(comercioNombre)) {
          categoriasCount.set(comercioNombre, categoriasCount.get(comercioNombre) + 1);
        } else {
          categoriasCount.set(comercioNombre, 1);
        }
      });
    }
    const categoriasSorted = Array.from(categoriasCount.entries()).sort((a, b) => b[1] - a[1]);
    return categoriasSorted.slice(0, 6).map(entry => entry[0]);
  }