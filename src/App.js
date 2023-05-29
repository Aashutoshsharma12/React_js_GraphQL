import logo from './logo.svg';
import './App.css';
// import { Routes, Route } from "react-router-dom"
import Login from './component/Auth/SignIn';
import Profile from './component/Auth/profile';
import { BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import UserList from './component/user/userList';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, from } from '@apollo/client';
import { onError} from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context';

const errorLink = onError(({
  graphqlErrors,networkError}) =>{
    if(graphqlErrors) {
      graphqlErrors.map(({message,location,path}) =>{
        alert(`Graphql erro ${message}`)
      })
    }
  })
  // const authLink = setContext((_, { headers }) => {
  //   const token = localStorage.getItem(token);
  //   return {
  //     headers: {
  //       ...headers,
  //       authorization: token ?token : ''
  //     }
  //   };
  // });
const link = from([
  errorLink,
  new HttpLink({uri:"https://node-graphql-five.vercel.app/graphql"})
])

const client = new ApolloClient({
  cache:new InMemoryCache(),
  link:link
})


function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path='/userList' element={<UserList/>}/>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
