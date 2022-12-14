/* eslint-disable jsx-a11y/anchor-is-valid */
import '../App.css';
import React, { useState, useEffect } from "react";
import "./Modal/Modal.css";
import "../index.css";
import axios from 'axios';
import Stars from './Stars';
import dateFormat from "dateformat"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { currentUser } from '../features/users/userSlice';


const Card = ({ id, img, alt, title, cat, resume, year, note, style, rate, click }) => {
    const navigate = useNavigate();

    const userInfosSelector = useSelector(currentUser);
    const userInfos = userInfosSelector.user; // data de l'utilisateur
    console.log(userInfos)

    const [modalDetail, setModalDetail] = useState(false);
    const toggleModalDetail = () => { setModalDetail(!modalDetail) }

    const [modalCritik, setModalCritik] = useState(false);
    const toggleModalCritik = () => { setModalCritik(!modalCritik) }

    const [modalFavoris, setModalFavoris] = useState(false);
    const toggleModalFavoris = () => {
        setModalFavoris(!modalFavoris);
    }

    const [favoris, setFavoris] = useState([]);
    const [critiks, setCritiks] = useState([]);

    //Modale de confirmation d'ajout de favoris
    let [listFavoris, setListFavoris] = useState(false);
    const toggleListFavoris = () => {
        setListFavoris(!listFavoris);
    }

    //Afficher/Masquer mes critiks
    let [listCritiks, setListCritiks] = useState(false);
    const toggleListCritiks = () => {
        setListCritiks(!listCritiks);
    }

    //Modale de confirmation d'ajout de critik
    let [modalConfirmationCritik, setModalConfirmationCritik] = useState(false);
    const toggleModalConfirmationCritik = () => {
        setModalConfirmationCritik(!modalConfirmationCritik);
    }

    if (modalDetail) { document.body.classList.add('active-modal') }
    else { document.body.classList.remove('active-modal') }

    const api_url = "http://localhost:3001/comments";
    const createCritik = async (critik) => {
        //await axios.post(api_url+'?filmId='+critik.filmId+'&commentaire='+critik.comment+'&note='+critik.note, critik)
        await axios.post(api_url, critik)
            .then(console.log('Nouvelle critique de l utilisateur n??... cr??e'))
            .catch(err => {
                console.error(err);
            });
    }

    /*
   * Fonction handleSubmit (Validation de formulaire) sur la Modale "modaleCritik"
   * Ajoute 1 Critik de film 
   * Appelle les fonctions createCritik(), toggleModalCritik() et toggleModalConfirmationCritik()
   */
    const handleSubmit = (e) => {
        e.preventDefault(); //La page n'est pas charg??e
        const form = e.target; //tableau inputs
        const filmId = form[0].value;
        const comment = form[1].value;
        const note = form[2].value;
        const title = form[3].value;
        const critik = { filmId, title, comment, note, userId:userInfos.id, pseudo:userInfos.pseudo }; //Todo: R??cup??rer l'UserId et le pseudo de l'user conenct??

        //Requete HTTP en POST
        createCritik(critik);
        toggleModalCritik(); //Ferme la modale Critik
        toggleModalConfirmationCritik(); //Affiche le formulaire d'ajout de Critik
    }

    /*
    * Fonction handleClick 
    * Appelle les fonctions createFavoris et toggleModalFavoris
    */
    const handleClick = (e) => {
        e.preventDefault();
        const favori = { filmId: id, title: title, userId: userInfos.id, img: img }; //Todo: R??cup??rer l'UserId de l'user conenct??
        createFavoris(favori);
        toggleModalFavoris(); //Affiche la modale de confirmation de l'ajout des favoris
    }

    /*
    * Fonction createFavoris 
    * Ajoute 1 film en favori
    */
    const createFavoris = async (favori) => {
        let userId = userInfos.id;  //Todo: R??cup??rer l'UserId de l'user conenct??
        let filmId = id; //est r??cup??r?? dynamiquement en fonction du film mis en favori
        const api_url = "http://localhost:3001/favoris";

        await axios.post(api_url, favori)
            .then(console.log(`Nouveau favori enregistr?? pour le film ${filmId} et l utilisateur n??${userId}`))
            .catch(err => {
                console.error(err);
            });
    }

    /*
    * Fonction getFavoris 
    * Obtiens la liste des films d'1 user mis en favori
    */
    const getFavoris = async (favori) => {
        let userId = userInfos.id; //Todo: R??cup??rer l'UserId de l'user conenct??
        const api_url = `http://localhost:3001/users/${userId}/favoris`;
        await axios.get(api_url)
            .then(({ data }) => {
                setFavoris(data)
            })
            .catch(err => {
                // console.error(err);
            });
    }

    /*
    * Fonction getCritiks 
    * Obtiens la liste des films d'1 user mis en favori
    */
    const getCritiks = async (critik) => {
        let userId = 1; //Todo: R??cup??rer l'UserId de l'user conenct??
        const api_url = `http://localhost:3001/users/${userId}/comments`;
        await axios.get(api_url)
            .then(({ data }) => {
                setCritiks(data)
            })
            .catch(err => {
                // console.error(err);
            });
    }

    /*
    * Fonction toggleListeFavoris 
    * Liste les films d'1 user mis en favori
    */
    const toggleListeFavoris = (e) => {
        listFavoris = !listFavoris;
    }

    /*
    * Fonction toggleListeCritik 
    * Liste les films d'1 user mis en favori
    */
    // const toggleListeCritik = (e) => {
    //     listCritiks = !listCritiks;
    // }

    useEffect(() => {
        getFavoris();
        getCritiks();
    }, [id]);

    return (
        <>
        
            <div className="card text-white">
            <center><img className="opacity1 cursor-pointer" key={id} src={img} alt={alt} title={resume} cat={cat} note={note} style={style} onClick={click}/>       
                
                <div className="mt-4">
                    <a href="#" onClick={toggleModalDetail} title="D??tail du film" alt="D??tail du film" className="hover:text-amber-200">????D??tails</a>&nbsp;
                    <a href="#" onClick={toggleModalCritik} title="Critiker ce film !" alt="Critiker ce film !" className="hover:text-amber-200">???Critiker&nbsp;
                    </a>&nbsp;<a href="#" onClick={handleClick} title="Mettre en favoris" alt="Mettre en favoris" className="hover:text-amber-200">?????? Favoris</a><br/><br/>

                    <h2 className="title-font text-lg font-medium text-white">{title}</h2>
                    <h3 className="title-font mb-1 text-xs tracking-widest text-gray-300">{cat}</h3>
                    <p className="text-white mt-1">{dateFormat(year, 'dd/mm/yyyy')}</p>
                    
                    
         
            {modalDetail && (
                <div className="modal">
                    <div className="overlay"></div>
                        <div className="modal-content">                        
                            <button 
                            onClick={toggleModalDetail}
                            className="btn-modal text-black float-right font-black ">
                            X
                            </button>
                            <br/>                            
                            <h1 className=' bg-amber-500 py-5 px-5 title-font text-xl font-bold rounded-xl my-5 text-black '>{title}</h1>
                            Sortie : {dateFormat(year, 'dd/mm/yyyy')}
                            <br/>
                            Genre : {cat} 
                            <br/>
                            Note : {note}
                            <br/>
                            <br/>
                            <center>
                            <img src={img} width="200" alt={alt}/>
                            </center>
                            <br/>
                            <p>{resume}</p>
                            <br/>
                    </div>
                </div>
            )}
                                   

{
    modalCritik && (
        <div className="modal">
            <div className="overlay"></div>
            <div className="modal-content text-black">

                <button
                    onClick={toggleModalCritik}
                    className="btn-modal text-black float-right font-black">
                    X
                </button>
                <br />

                <form onSubmit={handleSubmit}>
                    <center>
                    <h1 className='title bg-amber-500 py-5 px-5 title-font text-xl font-bold rounded-xl mt-5'>{title}</h1>
                        <br />
                        <img src={img} width="200" alt={alt} />
                    </center>
                    {/* <br/> FilmId : {id} */}
                    <input type='hidden' size='6' defaultValue={id} />
                    <br /><br />
                    Votre commentaire : <br />
                    <textarea rows="4" className="w-full text-black  py-1 px-1 rounded-lg mt-2"></textarea>
                    <br /><br />
                    Votre note :<Stars />{/* &nbsp;{rate} */}
                    <input type='hidden' defaultValue={title}/>
                    <br />
                    <center>
                    <button type="submit" className="flex sm:block m-auto sm:m-0 py-4 mb-5 px-12 sm:py-3 sm:px-10 md:py-4 md:px-12  shadow-md shadow-stone-300/50 bg-stone-900 rounded-md text-lg
                                         text-white font-semibold border-2 border-white hover:text-amber-300 hover:border-amber-300 hover:shadow-amber-300/50  ">Critiker !</button>
                    </center>
                    <br />
                </form>

            </div>
        </div>
    )
}

{
    modalFavoris && (
        <div className="modal">
            <div className="overlay"></div>
            <div className="modal-content text-black">
                <button
                    onClick={toggleModalFavoris}
                    className="btn-modal font-black float-right">
                    X
                </button>
                <br />
                Vous avez bien ajout?? le film <br /><b>"{title}"</b><br /> ?? vos favoris
                <br /><br />
                {/* <a href="#" onClick={() => navigate('/profile')}>Acc??der ?? votre liste de favoris</a> */}
                {/* <br/>ou<br/> */}
                <a href="#" onClick={toggleListFavoris}>Afficher/masquer mes favoris</a>
                <br />
                {listFavoris ?
                    <div>
                        <br />Mes favoris :<br />
                        {/* D??but de traitement liste de favoris d'1 user */}
                        {
                            favoris?.length && favoris.map(fav => {
                                return (
                                    <>
                                        - {fav.title} <br />
                                    </>
                                )
                            })
                        }
                        {/* Fin de traitement liste de favoris d'1 user */}
                    </div>
                    :
                    <br />
                }
            </div>
        </div>
    )
}

{
    modalConfirmationCritik && (
        <div className="modal">
            <div className="overlay"></div>
            <div className="modal-content text-black">
                <button
                    onClick={toggleModalConfirmationCritik}
                    className="btn-modal text-black float-right">
                    [X]
                </button>
                <br />
                Vous&nbsp;avez&nbsp;bien&nbsp;ajout??&nbsp;une&nbsp;Critik/note&nbsp;pour&nbsp;le&nbsp;film<br /><b>"{title}"</b>
                <br /><br />
                {/* <a href="#" onClick={toggleListCritiks}>Afficher/masquer vos critiks</a>
                                    <br/><br/>
                                    {listCritiks ?                                        
                                            <div>
                                            Mes critiks :<br/>
                                            {/* D??but de traitement liste de critiks d'1 user */}
                {/* {critiks?.length && critiks.map(crt => {   
                                                    console.log('Liste de critiks'+crt.comment); 
                                                    return(                                                            
                                                        <>                                                                
                                                            - id: {crt.id} {crt.comment} 
                                                        <br/>
                                                        </>
                                                    )
                                                })                 
                                            }                                                */}
                {/* Fin de traitement liste de critiks d'1 user */}
                {/*        
                                            </div>                                                   
                                        : <></>
                                        <br/>
                                    }
                                    */}
            </div>
        </div>
    )
}

                </div >
                </center >
            </div >
        </>
    )
}
export default Card;