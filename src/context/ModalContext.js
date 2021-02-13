import React, {createContext, useEffect, useState} from 'react';
import axios from 'axios';

export const ModalContext = createContext();

const ModalProvider = (props) => {
    
    //state del provider

    const [idReceta, guardarIdReceta] = useState(null);
    const [receta, guardarReceta] = useState({});

    //una vez que tenemos a una receta llamamos a la API

    useEffect(() => {
       const obtenerReceta = async ()=> {
           if(!idReceta) return;

           const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceta}`;
           const resultado = await axios.get(url);
           guardarReceta(resultado.data.drinks[0]);
       }
       obtenerReceta();
    }, [idReceta])
    return (  
        <ModalContext.Provider
            value={{
                guardarIdReceta
            }}
        >
            {props.children}
        </ModalContext.Provider>
    );
}
 
export default ModalProvider;
