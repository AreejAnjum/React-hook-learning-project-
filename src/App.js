import React, {useContext} from 'react';
import Auth from './components/Auth';
import Ingredients from './components/Ingredients/Ingredients';
import {AuthContext} from './components/UI/context/auth-context'

const App = props => {

  const authContext= useContext(AuthContext)
  let content= <Auth/>;

  if(authContext.isAuth){
    content= <Ingredients/>
  }

  //return  ({content})  was giving error to not pass obj in return 
  //return content   //not error bcz here it will take it as variable
  
  return (
    <>
      {content}
    </>
  )
 
  
};

export default App;






// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       count: 0
//     };
//   }

  

  // componentDidMount() {
  //   document.title = `You clicked cdm ${this.state.count} times`;
  //   console.log(`You clicked cdm ${this.state.count} times`)
  // }

  // componentWillUpdate() {
  //   document.title = `You clicked ${this.state.count} times`;
  //   console.log(`You clicked will update ${this.state.count} times`)
  // }
  // componentDidUpdate() {
  //   document.title = `You clicked ${this.state.count} times`;
  //   console.log(`You clicked ${this.state.count} times`)
  // }

//   render() {
//     return (
//       <div>
//         <p>You clicked {this.state.count} times</p>
//         <button onClick={() => this.setState({ count: this.state.count + 1 })}>
//           Click me
//         </button>
//       </div>
//     );
//   }
// }


// import {useEffect, useState} from 'react'

// const App = () => {

//   const [count, setcount] = useState(0)

//   useEffect(() => {
//   console.log(`you entered ${count}`)

//   })

//   return (
//     <div>
//         <button onClick={() => setcount(count+1)}>
//           Click me
//        </button>
//     </div>
//   )
// }

// export default App


