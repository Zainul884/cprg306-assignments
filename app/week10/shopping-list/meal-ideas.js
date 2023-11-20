import React, { useState, useEffect } from 'react';

function MealIdeas({ ingredient }) {
    const [meals, setMeals] = useState([]);
    const [expandedMeal, setExpandedMeal] = useState(null);
    const [selectedMealDetails, setSelectedMealDetails] = useState(null);
    const [loadingDetails, setLoadingDetails] = useState(false);

    const fetchMealIdeas = async (ingredient) => {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        const data = await response.json();
        setMeals(data.meals || []);
    };

    const fetchMealDetails = async (mealId) => {
        setLoadingDetails(true);
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        const data = await response.json();
        setSelectedMealDetails(data.meals[0]);
        setLoadingDetails(false);
    };

    const toggleMealDetails = (mealId) => {
        if (expandedMeal === mealId) {
            setExpandedMeal(null);
            setSelectedMealDetails(null);
        } else {
            setExpandedMeal(mealId);
            setSelectedMealDetails(null); 
            fetchMealDetails(mealId);
        }
    };

    function cleanItemName(item) {
        const [name,] = item.split(',');
        const cleanName = name.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|�[�-�]|�[�-�]|[\u2011-\u26FF]|�[�-�])/g, '').trim();
        return cleanName;
    }

    useEffect(() => {
        if (ingredient) {
            const cleanIngredient = cleanItemName(ingredient);
            fetchMealIdeas(cleanIngredient);
        }
    }, [ingredient]);

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
            <h2>Meal Ideas for {ingredient}</h2>
            {meals.map(meal => (
                <div key={meal.idMeal} style={{ marginBottom: '20px' }}>
                    <div 
                        style={{
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
                            cursor: 'pointer',
                            backgroundColor: '#fff'
                        }}
                        onClick={() => toggleMealDetails(meal.idMeal)}
                    >
                        {meal.strMeal}
                    </div>
                    {expandedMeal === meal.idMeal && (
                        <div style={{ marginTop: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)', backgroundColor: '#f5f5f5' }}>
                            {loadingDetails ? (
                                <p>Loading...</p>
                            ) : (
                                <ul>
                                    {selectedMealDetails && Array.from({ length: 20 }).map((_, index) => {
                                        const ingredient = selectedMealDetails[`strIngredient${index + 1}`];
                                        const measurement = selectedMealDetails[`strMeasure${index + 1}`];
                                        if (ingredient && ingredient.trim() !== "") {
                                            return (
                                                <li key={index}>
                                                    {ingredient}: {measurement}
                                                </li>
                                            );
                                        }
                                        return null;
                                    })}
                                </ul>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default MealIdeas;
