//Global constants for making API call
const appKey = '83410c2b3c621c95336cbc5a222924d9'
const appId = '6673ca50'


// Calories display function
let calorieArr = [];
let caloriesObj = document.querySelectorAll('.calories');

for (const entry of caloriesObj) {
    calorieArr.push(entry.innerText);
}

let totalCalories = calorieArr.reduce((a, b) =>  parseInt(a) + parseInt(b), 0);

let totalCaloriesDisplay = document.createElement('h2')
totalCaloriesDisplay.className = "total"
totalCaloriesDisplay.innerText = `Total calories consumed: ${totalCalories} kcal`

document.querySelector('.totalCaloriesDisplay').appendChild(totalCaloriesDisplay);


//Function to populate chart
const populateChart = (url) =>{
    fetch(url)
        .then (result => result.json())
        .then (result => {
            let dates =[];
            let calories=[];
            result.rows.forEach(item => {
                dates.push(item.to_char)
                calories.push(item.sum)
            })
            let ctx = document.getElementById("chartDiv");
            let weeklyChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dates,
                    datasets: [
                        {
                            data: calories,
                            label: "Calories",
                            borderColor: "#69A88D",
                            fill: false
                        }
                    ]
                }
            })

        })
        .catch (err => console.log(err.stack))
}

populateChart('/weekly');

//Function to make API call

const foodInputButton = document.getElementById('foodInputButton')
const foodInput= document.getElementById('foodInput')


const clickHandler = (event) =>{
    console.log("click heard")
    const foodName = document.getElementById('foodInput').value;
    const servingSize = parseInt(document.getElementById('serving').value);
    const notes = document.getElementById('notes').value;
    const url = `https://api.edamam.com/api/food-database/v2/parser?nutrition-type=logging&ingr=${foodName}&app_id=${appId}&app_key=${appKey}`
    fetch(url)
        .then(result => result.json())
        .then(result => {
            const caloriesPerServe = parseInt(result['parsed'][0]['food']['nutrients']['ENERC_KCAL'])
            const foodItem = result['text']
            const foodInfo = {
                caloriesPerServe: caloriesPerServe,
                foodItem: foodItem,
                servingSize: servingSize,
                notes: notes
            }
            fetch('/addItem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(foodInfo)
            })
            .then(result => {
                console.log(result)
                if (result) {
                    redirect: window.location.assign('/')
                }
            });
        })
        .catch(err => {
            alert("Sorry, information for this food item is currently unavailable. Please try another item.")
            console.log(err.stack)});
}

foodInputButton.addEventListener('click', clickHandler)