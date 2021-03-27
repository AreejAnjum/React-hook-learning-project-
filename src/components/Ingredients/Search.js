import React, {useState, useEffect, useRef} from 'react';
import axios from '../../axios/axiosInstance/axiosInstance'
import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const {onLoadingIngredients}= props
  const [enteredFilter, setEnteredFilter]= useState('')
  const inputRef= useRef();
    
  //useEffect = componentDidMount and DidUpdate
  useEffect( 
    ()=>{
      // using setimeout to reduce unessary network posts thats was sent on each word type
     const timer= setTimeout(
        ()=>{
          if(enteredFilter===inputRef.current.value){
            const query=enteredFilter.length===0 ? ' ':
      `?orderBy="title"&equalTo="${enteredFilter}"`

   axios.get('/ingredients.json'+query)
  .then(res=>{
    const loadedIngre=[];
    for(let key in res.data)
    {loadedIngre.push({
      id: key,
      title: res.data[key].title, 
      amount: res.data[key].amount})}

      onLoadingIngredients(loadedIngre)// not using props bcz above we destructured it 
  })

  .catch(err=>{
    console.log("Error on get request", err);
  })} }
        
      ,500)
    
    //it must return func, useeffect will run first, not cleartimeout then 2nd time
    //before runing useffect clearout will run and clean the timer so it will increase 
    //speed and it will take much memory
    return()=>{
      clearTimeout(timer)
    }
    }

      , [enteredFilter,onLoadingIngredients ]) 
      
 


  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" value={enteredFilter}
          ref={inputRef}
          onChange={(event)=>setEnteredFilter(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
