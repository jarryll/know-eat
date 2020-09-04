console.log("I am now here")


//api info
const appKey = '83410c2b3c621c95336cbc5a222924d9'
const appId = '6673ca50'

let foodInput = document.getElementById('foodInput');

let clickHandler = () => {
    let findFood = async (foodName) => {
        let url = `https://api.edamam.com/api/food-database/v2/parser?ingr=${foodName}&app_id=${appId}&app_key=${appKey}`
        try {
            let response = await fetch(url)
            let foodInfo = await response.json();
            let calories = (foodInfo["parsed"][0]["food"]["nutrients"]["ENERC_KCAL"])
            console.log(foodInfo)
        } catch(err) {
            console.error(err.stack);
            alert("Sorry, food not found.");
        }
    }
    findFood(foodInput.value);
}

document.getElementById("foodInputButton").addEventListener("click", clickHandler)