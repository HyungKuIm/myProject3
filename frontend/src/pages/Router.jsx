import { Route, Routes, BrowserRouter } from "react-router-dom";

import Home from "./Home";
import UserList from "./UserList";
import Header from "../common/Header";
import Footer from "../common/Footer";
function Router() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/UserList" element={<UserList />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default Router;