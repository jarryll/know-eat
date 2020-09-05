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