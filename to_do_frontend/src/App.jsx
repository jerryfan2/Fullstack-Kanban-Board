import { useState, useEffect, createContext } from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css';
import Header from './pages/home/header';
import ListContainer from './pages/home/list-container';
import AddItemLightbox from "./pages/home/add-item-lightbox";
import LoginPage from "./pages/login/login-page"
import SignupPage from "./pages/signup/signup-page"

import {ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from} from "@apollo/client";
import {onError} from "@apollo/client/link/error";
import KanbanContainer from './pages/home/kanban-container';

import {useQuery} from "@apollo/client";
import { GET_ALL_TO_DOS } from "./GraphQL/Queries"

import jwt_decode from "jwt-decode";

const errorLink = onError(({graphqlErrors, networkError}) => {
  if (graphqlErrors) {
    graphqlErrors.map(({message, location, path}) => {
      alert(`Graphql error ${message}`);
    })
  }
})
const link = from([
  errorLink,
  new HttpLink({uri: "http://localhost:8080/graphql", credentials: "include"})
])

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
});

function Home() {
  const [addItemVisibility, setAddItemVisibility] = useState(false);

  const [toDoItems, setToDoItems] = useState([]);
  const {data} = useQuery(GET_ALL_TO_DOS, {
      onCompleted: fetchedData => setToDoItems(fetchedData.getAllToDos)
  });

  return (
    <>
      <div className="body-items">
        <ListContainer setAddItemVisibility={setAddItemVisibility} toDoItems={toDoItems} />
        <KanbanContainer toDoItems={toDoItems}/>
      </div>
      {addItemVisibility ? <AddItemLightbox setAddItemVisibility={setAddItemVisibility}/>: null}
    </>
  )
}

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState("");

  const getCookieValue = (name) => (
    document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
  )

  let refreshToken;
  let decodedToken;
  try {
    refreshToken = getCookieValue("refresh-token");
    decodedToken = jwt_decode(refreshToken);
  } catch {
    decodedToken = "";
  }

  useEffect(() => setUser(decodedToken["userID"]), []);

  return (
    <> 
      <ApolloProvider client={client}>
        <UserContext.Provider value={{user: user, setUser: setUser}}>
          <Header />
          <Routes>
            <Route path="/" element={<Home /> }/>
            <Route path="/user/login" element={<LoginPage />} />
            <Route path="/user/signup" element={<SignupPage />} />
          </Routes>
        </UserContext.Provider>
      </ApolloProvider>
    </>
  )
}

export default App
