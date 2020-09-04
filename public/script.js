


// let foodInput = document.getElementById('foodInput');

// let clickHandler = () => {
//     let findFood = async (foodName) => {
//         let url = `https://api.edamam.com/api/food-database/v2/parser?ingr=${foodName}&app_id=${appId}&app_key=${appKey}`
//         try {
//             let response = await fetch(url)
//             let foodInfo = await response.json();
//             let calories = (foodInfo["parsed"][0]["food"]["nutrients"]["ENERC_KCAL"])
//         } catch(err) {
//             console.error(err.stack);
//             alert("Sorry, food not found.");
//         }
//     }
//     findFood(foodInput.value);
// }

// document.getElementById("foodInputButton").addEventListener("click", clickHandler)