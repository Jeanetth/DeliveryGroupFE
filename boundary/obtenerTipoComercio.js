import { clasificarCategorias,  } from "../control/ordenarCategorias.js";


async function getTipoComercios() { 
  try {
    const response = await fetch("http://20.14.165.228:8282/deliveryApp/tipocomercio/al");
    if (response.ok) { 
      const data = await response.json();
      return data; // Devolver los datos obtenidos 
    } else { 
      throw new Error('Error al obtener los datos del servidor.'); 
    } 
  } catch (error) {
    //console.error(error);
    throw error; // Propagar el error hacia arriba
  }
}

async function getAllComercios() { 
  return fetch("http://20.14.165.228:8282/deliveryApp/comercio_tipocomercio/all") 
  .then(response => { 
    if (response.ok) { 
      return response.json(); 
    } else { 
      throw new Error('Error al obtener los datos del servidor.'); 
    } 
  }) 
  .then(data => { 
     const categorias =clasificarCategorias(data) 

      return categorias; // Devolver los datos obtenidos 
     
  }) 
  .catch(error => { 
    console.error(error); 
  }); 
} 
async function getComercioProducto() { 
  try {
    const response = await fetch("http://20.14.165.228:8282/deliveryApp/comercio_productos/all");
    if (response.ok) { 
      const data = await response.json();
      return data; // Devolver los datos obtenidos 
    } else { 
      throw new Error('Error al obtener los datos del servidor.'); 
    } 
  } catch (error) {
    //console.error(error);
    throw error; // Propagar el error hacia arriba
  }
}
async function getComercioSucursales() { 
  try {
    const response = await fetch("http://20.14.165.228:8282/deliveryApp/comercio_sucursales/all");
    if (response.ok) { 
      const data = await response.json();
      return data; // Devolver los datos obtenidos 
    } else { 
      throw new Error('Error al obtener los datos del servidor.'); 
    } 
  } catch (error) {
    //console.error(error);
    throw error; // Propagar el error hacia arriba
  }
}
export {getTipoComercios,getAllComercios,getComercioProducto,getComercioSucursales};