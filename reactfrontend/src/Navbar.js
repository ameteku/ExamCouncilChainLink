import {Link} from "react-router-dom";

function Navbar(){
    const firstName = "Gianna";
    const lastName = "Torpey";
    return (
        <nav class="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top" id="mainNav">
            <div class="container">
            <Link class="navbar-brand js-scroll-trigger" to="/student/home">Name_of_App</Link>
                
                <div class="dummy">
                    {firstName} {lastName}
                </div>
            </div>
        </nav>
    )
}

export default Navbar;