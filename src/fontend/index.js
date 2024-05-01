import './templatemo_style.css'
import './nivo-slider.css'
import './assets/css/ddsmoothmenu.css'
import './assets/css/login.css'
import './assets/css/register.css'
import Header from './partial/header'
import Footer from './partial/footer'
import Menu from './partial/menu'
import Main from './partial/main'
import { Outlet } from 'react-router-dom'
function Index(){
    return(
        <div className="templatemo_body_wrapper">
            <div id="templatemo_wrapper">
                <Header/>
                <Menu/>
                <Main/>
                <Outlet/>
                <Footer/>
            </div> 
        </div>        
    );
}
export default Index;