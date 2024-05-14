import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { BiLogOut } from "react-icons/bi";
import { useEffect, useState } from "react";

export default function Header(){
    const location = useLocation();   
    const [isHome,setIsHome] = useState(false);
    useEffect(()=>{
        if(location.pathname === "/"){
            setIsHome(true);
        }else{
            setIsHome(false);
        }
    },[location.pathname])
    return(
        <div className="w-full bg-white min-h-[75px] relative px-[150px] overflow-y-hidden">
            {/* <span className="min-w-full h-full bg-red-600"><marquee>NIPUN &nbsp; NADEESHAN &nbsp;DILSHAN &nbsp;</marquee></span> */}

            <div className="h-full flex justify-center items-center relative">
                <NavLink to="/" className="text-[#fe5c84] text-2xl font-bold absolute left-0">
                    <img src={logo} alt="logo" className=" h-20" />
                </NavLink>
                <div>
                    <NavLink to="/" className={`text-2xl ${isHome&&"font-bold mx-2"} `}>Home</NavLink>
                    {/* favourites */}
                    <NavLink to="/favourites" className={`text-2xl ${!isHome&&"font-bold mx-2"} `}>Favourites</NavLink>
                </div>
                <div className="flex space-x-4 absolute right-0" onClick={()=>{
                    if(confirm("Are you sure you want to logout?")){
                        localStorage.removeItem("accessToken");
                        window.location.href = "/login";
                    
                    }
                }}>
                    <BiLogOut className="text-4xl  cursor-pointer"/>
                </div>
            </div>
        </div>
    )
}