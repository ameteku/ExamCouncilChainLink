import {Link} from "react-router-dom";

function Navbar(props){
    const firstName = props.firstName;
    const lastName = props.lastName;
    if (props.hasOwnProperty("logOut")){
        const logOut = props.logOut;
    }
    else {
        const logOut = ()=> {};
    }
    return (
        <nav class="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top" id="mainNav">
            <div class="container">
            <Link class="navbar-brand js-scroll-trigger" to="/student/home">Name_of_App</Link>
                <div className="dropdown">
                    <div class="dummy">
                        {firstName} {lastName}   
                    </div>
                    <div className="dropdown-content">
                        <a onClick={props.logOut}>Log Out</a>
                    </div>

                </div>
            </div>
        </nav>
    )
}

export default Navbar;