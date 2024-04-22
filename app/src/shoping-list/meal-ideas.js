"use client";

import { useState, useEffect } from "react";

export default function MealIdeas({ ingredient }) {
    const [mealIdeas, setMealIdeas] = useState([]);
    const [ingredientsList, setIngredientsList] = useState([]);
    const [selectedMeal , setSelectedMeal] = useState(null);

    const fetchMealIdeas = async (ingredient) => {

        const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
        );
        const data = await response.json();
        return data.meals;
    };

    const fetchIngredientsList = async (mealId) => {
        const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
        );
        const data = await response.json();
        return data.meals[0];
    };

    const loadMealIdeas = async () => {
        if (ingredient !== "") {
            const ideas = await fetchMealIdeas(ingredient);
            setMealIdeas(ideas);
        }
    };

    const loadIngredientsList = async (mealId) => {
        const ingredient = await fetchIngredientsList(mealId);
        setIngredientsList(ingredient);
    };

    useEffect(() => {
        loadMealIdeas();
    }, [ingredient]);

    return (
        <div>
            <h1 className="text-4xl font-semibold m-4">Meal Ideas</h1>
            {mealIdeas && (
                <ul className="text-xl font-medium text-black">
                    {mealIdeas.map((idea) => (
                        <li
                            key={idea.idMeal}
                            className="bg-white w-96 hover:bg-slate-700 p-2 border mb-2"
                            onClick={() => {
                                if (selectedMeal === idea.idMeal) {
                                    setSelectedMeal(null);
                                }else {
                                    setSelectedMeal(idea.idMeal);
                                    loadIngredientsList(idea.idMeal)
                                }
                                }}
                        >
                            <p>{idea.strMeal}</p>
                            { selectedMeal ===idea.idMeal && ingredientsList && (
                                <div>
                                    <p className="font-semibold">Ingredients : </p>
                                    <ul>
                                        {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => {
                                            if (ingredientsList[`strIngredient${i}`]) {
                                                return (
                                                    <li key={i}>
                                                        {`${ingredientsList[`strMeasure${i}`]} ${ingredientsList[`strIngredient${i}`]}`}
                                                    </li>
                                                );
                                            }
                                            return null;
                                        })}
                                    </ul>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}