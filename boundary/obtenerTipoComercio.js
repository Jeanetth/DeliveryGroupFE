import { clasificarCategorias, ordenarTipoComercios } from "../control/ordenarCategorias.js";


async function getTipoComercios() { 
    return fetch("http://20.14.165.228:8282/deliveryApp/tipocomercio/all") 
    .then(response => { 
      if (response.ok) { 
        return response.json(); 
      } else { 
        throw new Error('Error al obtener los datos del servidor.'); 
      } 
    }) 
    .then(data => { 
       const categorias =ordenarTipoComercios(data) 

        return categorias; // Devolver los datos obtenidos 
       
    }) 
    .catch(error => { 
      //console.error(error); 
    }); 
} 

async function getAllComercios() { 
  return fetch("http://20.14.165.228:8080/Delivery-1.0.0-SNAPSHOT/comercio_tipocomercio/all") 
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
export {getTipoComercios,getAllComercios};