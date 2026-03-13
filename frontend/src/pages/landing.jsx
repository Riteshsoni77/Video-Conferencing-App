import react from 'react'
import "../App.css"
import { Link, useNavigate } from 'react-router-dom'
import mobileImage from '../assets/mobile.png';
import backgroundimg from '../assets/background.png';



export default function LandingPage() {
    const router = useNavigate();

    return (
        <div
            className='landingPageContainer'
            style={{ backgroundImage: `url(${backgroundimg})` }}
        >
            <nav>
                <div className='navheader'>
                    <h2>Video Conferencing App </h2>
                </div>
                <div className='navlist'>
                    <p onClick={() => {
                        router("/gest")
                    }}> Join as Guest</p>
                    <p onClick={() => {
                        router("/auth")

                    }}>Register</p>
                    <div onClick={() => {
                        router("/auth")

                    }} role='button'>
                        <p>Login</p>
                    </div>
                </div>
            </nav>

            <div className="landingMainContainer">
                <div>
                    <h1><span style={{ color: "#FF9839" }}>Connect</span> with your loved Ones</h1>

                    <p>Cover a distance by Video Call</p>
                    <div role='button'>
                        <Link to={"/auth"}>Get Started</Link>
                    </div>
                </div>
                <div>


                    <img src={mobileImage} alt="" />

                </div>
            </div>


        </div>
    )
}