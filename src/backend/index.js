import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import Footer from './partial/footer';	
import '../fontend/assets/css/stylebackend.css'
import Header from './partial/header';
import Menu from './partial/menu';
function IndexAdmin(){
	return(
		<div>
			<Header/>
			<Menu/>
			<Outlet/>
			<Footer/>
		</div>
	);
}
export default IndexAdmin;