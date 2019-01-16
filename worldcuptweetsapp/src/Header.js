import React from "react";
import { Link } from 'react-router-dom';


const Header = (props) => {
	
	return (
		<nav className="navbar fixed-top navbar-default">
			<div className="container">
				<div className="navbar-header">
					
					<ul className="nav navbar-nav">
						<li className="rounded"><Link to={"/"}>@FIFAWorldCup 2018 - Tweets</Link></li>
						<li><Link to={"/"} >List</Link></li>
						<li><Link to={"/likes"} >Likes</Link></li>
						<li><Link to={"/replies"} >Replies</Link></li>
					</ul>
				</div>
			</div>
		</nav>
	);

};

export default Header;
