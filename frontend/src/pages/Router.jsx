import { Route, Routes, BrowserRouter } from "react-router-dom";

import Home from "./Home";
import UserList from "./UserList";
function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/UserList" element={<UserList />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;