import { useEffect, useState } from "react";
import Header from "../../components/header";
import { Route, Routes } from "react-router-dom";
import RecipeCard from "../../components/RecipeCard";
import axios from "axios";
import FavouriteDashboard from "../favourite-dashboard";

export default function MainDashboard() {
  const [categories, setCategories] = useState([
    {
      idCategory: 1,
      strCategory: "Beef",
      strCategoryThumb: "https://www.themealdb.com/images/category/beef.png",
      strCategoryDescription:
        "Beef is the culinary name for meat from cattle, particularly skeletal muscle. Humans have been eating beef since prehistoric times.[1] Beef is a source of high-quality protein and essential nutrients.[2]",
    },
  ]);
  const [categoriesLoaded, setCategoriesLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [mealList, setMealList] = useState([]);
  const [mealListLoaded, setMealListLoaded] = useState(false);
  useEffect(() => {
    axios
      .get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categories[selectedCategory].strCategory}`
      )
      .then((response) => {
        if (response.data.meals === null) {
          setMealList([]);
        } else {
          setMealList(response.data.meals);
        }
        setMealListLoaded(true);
        if (categoriesLoaded === false) {
          axios
            .get("https://www.themealdb.com/api/json/v1/1/categories.php")
            .then((response) => {
              const newCategories = response.data.categories.slice(0, 5);
              setCategories(newCategories);
              setCategoriesLoaded(true);
            });
        }
      });
  }, [selectedCategory, mealListLoaded, selectedCategory]);
  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-row justify-start min-w-full mt-4 px-48 py-5 gap-1 top-0 sticky bg-[#eae7e7]">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`cursor-pointer min-w-[100px] text-center rounded-full h-[55px] p-4 ${
              selectedCategory === index
                ? " bg-[#fe5c84] text-white "
                : "text-[#fe5c84] border border-[#fe5c84]"
            } `}
            onClick={() => setSelectedCategory(index)}
          >
            {category.strCategory}
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center flex-wrap max-w-full bg-[#eae7e7] px-48">
        <Routes path="/*">
          <Route
            path="/"
            element={
              <>
                {mealList.map((recipe, index) => (
                  <RecipeCard
                    key={index}
                    imageUrl={recipe.strMealThumb}
                    category={categories[selectedCategory].strCategory}
                    recipeName={recipe.strMeal}
                    id={recipe.idMeal}
                    refresh={() => {
                      //do nothing
                    }}
                  />
                ))}
              </>
            }
          />
          <Route path="/favourites" element={<FavouriteDashboard />} />
        </Routes>
      </div>
    </div>
  );
}
