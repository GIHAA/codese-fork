import React, { useState, useEffect, useRef } from "react";

const RecipeModalBox = ({ recipeInfo, onClose }) => {
  const [contentHeight, setContentHeight] = useState(0);
  const imageRef = useRef(null);

  useEffect(() => {
    // Dynamically set the height of the text area based on the image height
    if (imageRef.current) {
      setContentHeight(imageRef.current.clientHeight);
    }
  }, [imageRef.current?.clientHeight]);  // Dependency on the image height

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white p-4 rounded-lg max-w-[1000px] w-full">
        <div className="grid grid-cols-2 items-center mb-4">
          <h2 className="text-xl font-bold">{recipeInfo.strMeal}</h2>
          <button
            onClick={onClose}
            className="justify-self-end text-lg p-2 rounded-full hover:bg-gray-200"
          >
            &times; {/* Unicode multiplication sign used as a close icon */}
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img
            ref={imageRef}
            src={recipeInfo.strMealThumb}
            alt={recipeInfo.strMeal}
            className="w-full h-auto rounded-lg"
          />
          <div className="overflow-y-auto hide-scrollbar" style={{ maxHeight: `${contentHeight}px` }}>
            <h3 className="text-lg font-semibold">Details</h3>
            <pre className="text-sm text-gray-700 whitespace-pre-wrap">{recipeInfo.strInstructions}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeModalBox;
