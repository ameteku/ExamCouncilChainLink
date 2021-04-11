import React from "react";
import './Student.css';
import {Link} from "react-router-dom";
import Scores from "./Scores";
import Navbar from "./Navbar";


function Student(props){
    const firstName = props.userInfo.firstName;
    const lastName = props.userInfo.lastName;
    const studentID = props.userInfo.studentID;
  
    return (
        <div>
            <Navbar logOut={props.logOut} firstName={firstName} lastName={lastName}/>
       
        <header class="masthead bg-primary text-white text-center">
            <div class="container d-flex align-items-center flex-column">
                
                <img class="masthead-avatar mb-5" src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png" alt="..." />
                
                <h1 class="masthead-heading text-uppercase mb-0">Welcome</h1>
               
                <div class="divider-custom divider-light">
                    <div class="divider-custom-line"></div>
                    <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                    <div class="divider-custom-line"></div>
                </div>
            </div>
        </header>
        
        <section class="page-section portfolio" id="portfolio">
            <div class="container">
                <div class="row justify-content-center">
                    
                    <div class="col-md-6 col-lg-4 mb-5">
                        <div className="option1">
                        <h2><Link to="/student/examregister">Register Your Exams</Link></h2>
                        </div>
                    </div>
                    
                    <div class="col-md-6 col-lg-4 mb-5">
                        <div className="option2">
                        <h2><Link to="/student/examselect">Write Your Exams</Link></h2>
                        </div>
                    </div>
                    
                    <div class="col-md-6 col-lg-4 mb-5">
                        <div className="option3">
                            <h2><Link to="/student/scores">View Your Scores</Link></h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div class="copyright py-4 text-center text-white">
            <div class="container">
                <small>
                    Copyright &copy; Your Website
                    <script>
                        document.write(new Date().getFullYear());
                    </script>
                </small>
            </div>
        </div>
           
        </div>
    )
}

export default Student;
