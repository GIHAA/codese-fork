import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import RecipeModalBox from "./RecipeModelBox";
const RecipeCard = ({ category, id, refresh }) => {
  const [recipeInfo, setRecipeInfo] = useState({});
  const [recipeInfoLoaded, setRecipeInfoLoaded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const addLike = () => {
    axios
      .post(
        "http://localhost:5000/likes",
        {
          recipeId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        setIsLiked(true);
      });
  };
  const dislike = () => {
    axios
      .delete(`http://localhost:5000/likes/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        setIsLiked(false);
        refresh();
      });
  };
  useEffect(() => {
    if (!recipeInfoLoaded) {
      axios
        .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => {
          setRecipeInfo(response.data.meals[0]);
          setRecipeInfoLoaded(true);
        })
        .catch((error) => {});
    }

    axios
      .get(`http://localhost:5000/likes/isLiked/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        setIsLiked(response.data.isLiked);
      });
  }, [recipeInfoLoaded, id, isLiked]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-56 h-80 rounded-lg py-4 flex flex-col items-start justify-start cursor-pointer">
      {!recipeInfoLoaded && (
        <div className="min-w-full min-h-full flex justify-center items-center ">
          <div className="w-[40px] min-h-[40px] rounded-full  border-t-[#fe5c84] border-t animate-spin  overflow-hidden"></div>
        </div>
      )}
      <div className="w-50 h-50 bg-gray-300 rounded-[30px] overflow-hidden">
        {/* Ensure the image covers the area properly */}
        <img
          src={recipeInfo.strMealThumb}
          alt={recipeInfo.strMeal}
          className="object-cover w-full h-full"
          onClick={handleOpenModal}
        />
        {isModalOpen && (
          <RecipeModalBox recipeInfo={recipeInfo} onClose={handleCloseModal} />
        )}
      </div>
      <div className="flex items-center space-x-2 mt-2 mb-1">
        <div className="text-xs uppercase text-gray-600">{category}</div>
        <div className="text-[#fe5c84]">
          {isLiked ? (
            <FaHeart onClick={dislike} className="text-[#fe5c84] " />
          ) : (
            <CiHeart onClick={addLike} className="text-gray-400" />
          )}
          {/* <CiHeart onClick={addLike} /> */}
        </div>
      </div>
      {/* <div className="text-sm font-semibold truncate overflow-hidden text-ellipsis whitespace-nowrap">
        {recipeName}
      </div> */}
      <div className="text-sm font-semibold">
        {recipeInfoLoaded
          ? recipeInfo.strMeal.length > 20
            ? `${recipeInfo.strMeal.substring(0, 25)}...`
            : recipeInfo.strMeal
          : "..."}
      </div>
    </div>
  );
};

export default RecipeCard;
