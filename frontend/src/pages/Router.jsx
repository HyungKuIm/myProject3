import { Route, Routes, BrowserRouter } from "react-router-dom";

import Home from "./Home";
import UserList from "./UserList";
import Blog from "./Blog";
import BlogDetail from "./BlogDetail";
import Header from "../common/Header";
import Footer from "../common/Footer";
function Router() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/UserList" element={<UserList />} />
                <Route path="/Blog" element={<Blog />} />
                <Route path="/BlogDetail/:id" element={<BlogDetail />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default Router;