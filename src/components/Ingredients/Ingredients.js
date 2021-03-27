import React, {useState,useCallback, useReducer, useRef} from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from '../Ingredients/IngredientList'
import axios from '../../axios/axiosInstance/axiosInstance'
import ErrorModal from '../UI/ErrorModal'

//use redux outside to avoid re-rendering
const ingredientReducer= (state, action)=>{
  switch(action.type)
  {
    case "SET":
      return action.ingredients

    case "ADD":
      return [...state, action.ingredients]

    case "DELETE": 
    return [...state.filter(ing=>action.id !== ing.id)]
    
    default:
      throw new Error('should not get there')
  }
}


const httpReducer= (state, action) => {
  switch (action.type) {

  case "SEND":
    return { loading: true, error: false }

  case "RESPONSE":
    return { ...state, loading: false }

  case "ERROR":
    return { loading: false, error: action.error}

  case "CLEAR":
    return { ...state,error: null }
      

  default:
    throw new Error("Something went wrong")
  }
}



const Ingredients=() =>{

  const [userIngredients, dispatch] = useReducer(ingredientReducer, [])
  const [httpState, dispatchHttp] = useReducer(httpReducer, {loading: false, error: false})
  // const [isloading, setIsLoading]= useState(false)
  // const [error, setError]= useState(null)
  // const [error,setError] = useState(null);
  
  

 
  const addIngredientsHandler=useCallback((ingredient)=>{
  dispatchHttp({type: "SEND"})
  //ingredient is internal dependency so no need to add
  //dispatchHttp is redux based so no need to add in dependncy
  axios.post('/ingredients.json', ingredient)
  .then(res=>{
    dispatchHttp({type: "RESPONSE"})
    // console.log(res);

    // setUserIngredients(prevState=>
    // [...prevState, { id: res.data.name, ...ingredient}],  
    // )

    dispatch({type: 'ADD', ingredients:{...ingredient, id: res.data.name}})
  //prestate is latest state of all elements of array

  })
  .catch(err=>{
    
    dispatchHttp({type: "ERROR", error: err})
      
  })
}, [])


  const filteredIngreHandler=useCallback((filteredIngre)=>{
  //setUserIngredients(filteredIngre)
  
  dispatch({type: 'SET', ingredients: filteredIngre})

}, [])  //filteredIngre is internal dependency so no need to add


  const removeIngreHandler=useCallback((ingreId)=>{
    dispatchHttp({type: "SEND"})
  axios.delete(`/ingredients/${ingreId}.json`)
  .then(res=>{
    dispatchHttp({type: "RESPONSE"})
  //   setUserIngredients(preIngredients=>{
  //     return preIngredients.filter(eachEle=>eachEle.id !==ingreId)
  // })

  dispatch({type: 'DELETE', id: ingreId})
})
  .catch(err=>{
    // console.log("this is error", err)
    dispatchHttp({type: "ERROR", error: err.message})
  })
  }, [])


  const clearErrorHandler=useCallback(()=>{
    dispatchHttp({type: "CLEAR"})
    //setError(null)
  }, [])  //to avoid unnessary rendering


  return (
    <div className="App">
      {httpState.error && <ErrorModal onClose={clearErrorHandler}>{httpState.error}</ErrorModal>}
      <IngredientForm onAddIngredients={addIngredientsHandler} onLoading={httpState.loading} />

      <section>
        <Search onLoadingIngredients={filteredIngreHandler}/>
        <IngredientList ingredients={userIngredients} 
        onRemoveItem={removeIngreHandler}/>
      </section>

      {/* {error && <p style={{textAlign: 'center'}}>Error: {error.message}</p>} */}

    </div>
  );
}

export default Ingredients;
