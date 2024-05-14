import { Route, Routes } from "react-router-dom";
import RecipeCard from "../../components/RecipeCard";
import Header from "../../components/header";
import MainDashboard from "../main-dashboard";
import FavouriteDashboard from "../favourite-dashboard";
import { useEffect } from "react";

export default function Dashboard() {
  useEffect(()=>{
    if(!localStorage.getItem("accessToken")){
      window.location.href = "/login";
    }
  },[])
  return(
    <>
    <div className="w-full h-[100vh] flex flex-col items-center ">
    <Header />
        <div className="flex justify-center items-center flex-wrap">
          <Routes path="/*">
            <Route path="/" element={
            <MainDashboard />
        } />
            <Route path="/favourites" element={<FavouriteDashboard/>} />
          </Routes>
          
        </div>
      </div>
    </>
  )
}