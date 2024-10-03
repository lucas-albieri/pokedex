/* eslint-disable @typescript-eslint/no-unused-vars */
import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/home";
import { PokemonsPage } from "../pages/pokemons";
import { PokemonPage } from "../pages/pokemon";

export const Router = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={<Home />}
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