import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './Views/NavBar';
import Home from "../src/Views/Home.js";
import Films from "../src/Views/Films.js";
import FilmsParGenres from "../src/Views/FilmsParGenres.js";
import PageFilm from "./Views/PageFilmView.js";
import Profile from "../src/Views/Profile.js";
import Inscription from './Views/Inscription';
import ForgottenPassword from './Components/ForgottenPassword';

import Footer from './Components/Footer.js'
import Connexion from './Views/Connexion';
import Conditions from './Views/Conditions';
import Mentions from './Views/Mentions';
import Politiques from './Views/Politiques';
import Contact from './Views/Contact';
import NotFound from './Views/NotFound';
import NewFooter from './Components/NewFooter';
import GenresMobile from './Views/GenresMobile';
import { UserContext } from './UserContext';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser, getUser, subscribedUser } from './features/users/userSlice';

function App() {

  const currentUserData = useSelector(currentUser);
  console.log(Object.keys(currentUserData).length)
  const dispatch = useDispatch();

  const [userData, setUserData] = useState()
  console.log(userData)

  // window.localStorage.setItem('userData', Object.keys(currentUserData).length ? JSON.stringify(currentUserData.user) : null);
  // const user = JSON.parse(localStorage.getItem('userData'));
  // console.log(user)

useEffect(() => {
  // getUser();
  // dispatch(getUser(5))
  window.localStorage.setItem('userData', Object.keys(currentUserData).length ? JSON.stringify(currentUserData.user) : null);
  setUserData(JSON.parse(localStorage.getItem('userData')));
}, [])

  return (
    <div className="App">
      {/* <UserContext.Provider value={[context, setContext]}> */}
      <UserContext.Provider value={Object.keys(currentUserData).length ? currentUserData : null}>
        <BrowserRouter>
        
          <NavBar />

          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Connexion />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/films" element={<Films />} />
            <Route path="/genres" element={<FilmsParGenres />} />
            <Route path="/genres-mobile" element={<GenresMobile />} />
            <Route path="/genres/:id" element={<FilmsParGenres />} />
            <Route path="/page-film/:id" element={<PageFilm />} />
            <Route path="/page-film" element={<PageFilm />} />
            <Route path="/inscription" element={<Inscription />} />
            <Route path="/forgotten-pass" element={<ForgottenPassword />} />
            <Route exact path="/conditions" element={<Conditions />} />
            <Route exact path="/mentions" element={<Mentions />} />
            <Route exact path="/politiques" element={<Politiques />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route path='*' element={<NotFound />} />

          </Routes>

          <NewFooter />

        </BrowserRouter>
      </UserContext.Provider>

    </div>
  );
}

export default App;