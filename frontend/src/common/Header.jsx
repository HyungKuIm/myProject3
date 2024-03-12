import { Link } from "react-router-dom";
import "../style.scss";
function Header() {
    return (
        <header>
            <Link to={"/"}>Im Sora</Link>

            <nav>
                <ul>
                    <li><Link to={"/"}>Top</Link></li>
                    <li><Link to={"/UserList"}>user list</Link></li>
                    <li><Link to={"/Blog"}>blog</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;