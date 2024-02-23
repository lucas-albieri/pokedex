/* eslint-disable @typescript-eslint/no-unused-vars */
import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/home";

export const Router = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={<Home />}
            />
        </Routes>
    )
}