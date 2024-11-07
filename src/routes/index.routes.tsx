/* eslint-disable @typescript-eslint/no-unused-vars */
import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/home";
import { PokemonsPage } from "../pages/pokemons";
import { PokemonPage } from "../pages/pokemon";

export const Router = () => {

    const widthWindow = window.innerWidth

    return (
        <Routes>
            <Route
                path="/"
                element={widthWindow > 768 ? <Home /> : <PokemonsPage />}
            />
            <Route
                path="pokemons"
                element={<PokemonsPage />}
            />
            <Route
                path="pokemon"
                element={<PokemonPage />}
            />
        </Routes>
    )
}