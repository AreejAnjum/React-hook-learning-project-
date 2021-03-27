import React, {useState} from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';
import LoadingIndicator from '../UI/LoadingIndicator'

const IngredientForm = React.memo(props => {


// const [state, setState] = useState({
//   amount: '',
//   title: ''

// })

const [title, setTitle]= useState('')

const [amount, setAmount]= useState('')

  const submitHandler = event => {
    event.preventDefault();
    props.onAddIngredients({title: title, amount: amount})
  };

  // const titleHandler = (event) => {
  //   setState({...state,title: event.target.value})
  // }

  // const amountHandler = (event) => {
  //   setState({...state,amount: event.target.value})
  // }

  // const titleHandler = (event) => {
  //   const title=event.target.value
  //   setState(prevState=>({amount: prevState.amount,title: title}))
  // }

  // const amountHandler = (event) => {
  //   const amount=event.target.value
  //   setState(prevState=>({title: prevState.title,amount: amount}))
  // }


  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input type="text" id="title"
            // onChange={titleHandler}
            onChange={(event)=>setTitle(event.target.value)}
            value={title} />
          </div>

          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="number"
            value={amount}
            // onChange={amountHandler}
            onChange={(event)=>setAmount(event.target.value)}
            id="amount" />
          </div>

          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {/* {props.onLoading ? <LoadingIndicator/>: null} */}
            {props.onLoading && <LoadingIndicator/>}
          </div>

        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;


