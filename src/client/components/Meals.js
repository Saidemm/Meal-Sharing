import React, { useContext } from 'react';
// import DisplayUser from './DisplayUser.jsx';
import {MealsContext} from './MealsProvider.js';

function MealsSearcher(){
    const mealsContext = useContext(MealsContext);
    console.log('2. Rendering and loading value is: ', mealsContext.loading);

    return(
        <div>
            {mealsContext.title}
        </div> 
    )
}

export default MealsSearcher;