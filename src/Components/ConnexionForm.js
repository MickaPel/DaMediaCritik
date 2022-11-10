import React, { Component } from 'react'

export default class ConnexionForm extends Component {
    render() {
        return (
            <div>

                <div className=" mt-5 relative flex py-5 items-center">
                    <div className="flex-grow border-t ml-20 border-amber-50"></div>
                    <span className="flex-shrink my-10 mx-4 text-amber-50 text-2xl font-bold">Connexion</span>
                    <div className="flex-grow border-t mr-20 border-amber-50"></div>
                </div>

                <div >

                    <form className="flex flex-col items-center">

                        <label for="email" className="mt-10 mb-5 text-white text-lg opacity-80">Identifiant (email) </label>
                        <input className="py-2 px-2 w-80 rounded-md bg-stone-100" type="email" placeholder='Votre adresse mail...' />

                        <label for="password" className="mt-10 mb-5 text-white text-lg opacity-80">Mot de passe </label>
                        <div className="flex flex-row items-center">
                            <input className="py-2 px-2 w-80  rounded-md bg-stone-100" type="password" placeholder="Votre mot de passe..." />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className=" invert w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="invert w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                            </svg>
                        </div>

                        <button type="submit" className="shadow-md shadow-stone-300/50 bg-stone-900 py-1 px-5 mt-10 rounded-md text-lg text-white font-semibold border-2 border-white hover:text-amber-300 hover:border-amber-300 hover:shadow-amber-300/50  ">Se connecter</button>

                    </form>
                    <div className="flex flex-row justify-center space-x-5">
                        <p className="mt-10 text-amber-50 hover:underline text-sm"><a href="#" name="Lien vers Mot de passe perdu">Mot de passe oublié ?</a></p>
                        <p className="mt-10 text-amber-50 hover:underline text-sm"><a href="#" name="Lien d'inscription">Vous n'êtes pas encore inscrit ?</a></p>
                    </div>
                </div>

            </div>
        )
    }
}