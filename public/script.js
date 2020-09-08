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
            const popup = document.getElementById("myPopup");
            popup.classList.toggle("show");
            if(popup.classList.contains("show"))
                setTimeout(() => popup.classList.remove("show"), 2000)
            console.log(err.stack)});
}

foodInputButton.addEventListener('click', clickHandler)

const dateNav = document.getElementById('date-select');

const findDate = (event) => {
    if (document.body.contains(document.getElementById('past-log'))) document.getElementById('daily-log').removeChild(document.getElementById('past-log'));
    //create table
    const table = document.createElement('table')
    table.className = "table table-striped table-bordered table-hover"
    table.id = "past-log"
    //create table headers
    const tableHeaders = document.createElement('thead');
    // create tr for headers
    const tableRowHeaders = document.createElement('tr');
    // create th for tableRowHeaders
    const foodColumn = document.createElement('th');
    const caloriesPerServe = document.createElement('th');
    const servingSize = document.createElement('th');
    const totalCalories = document.createElement('th');
    const notes = document.createElement('th');
    foodColumn.innerText = "Food";
    caloriesPerServe.innerText = "Calories (kcal) per 100g";
    servingSize.innerText = "Serving size (g)";
    totalCalories.innerText = "Calories based on serving size";
    notes.innerText= "Notes";
    tableRowHeaders.appendChild(foodColumn);
    tableRowHeaders.appendChild(caloriesPerServe);
    tableRowHeaders.appendChild(servingSize);
    tableRowHeaders.appendChild(totalCalories);
    tableRowHeaders.appendChild(notes);
    //create table body
     const tableBody = document.createElement('tbody')

    fetch(`/showLog/${event.target.value}`)
        .then(result => result.json())
        .then(result => {
            console.log(result)
            result.forEach(item => {
                const itemRow = document.createElement('tr');
                const foodRow = document.createElement('td');
                const caloriesRow = document.createElement('td');
                const servingsRow = document.createElement('td');
                const totalCaloriesRow = document.createElement('td');
                const notesRow = document.createElement('td');
                foodRow.innerText = item.name;
                caloriesRow.innerText = item.calories_per_serve;
                servingsRow.innerText = item.serving_size;
                totalCaloriesRow.innerText = item.total_calories;
                notesRow.innerText = item.notes;
                itemRow.appendChild(foodRow);
                itemRow.appendChild(caloriesRow);
                itemRow.appendChild(servingsRow);
                itemRow.appendChild(totalCaloriesRow);
                itemRow.appendChild(notesRow);
                tableBody.appendChild(itemRow);
            })
            table.appendChild(tableHeaders)
            table.appendChild(tableBody)
            tableHeaders.appendChild(tableRowHeaders);
            document.getElementById('daily-log').appendChild(table)
        })
        .catch(err => console.log(err.stack))
    console.log(event.target.value);
}

dateNav.addEventListener('change', findDate)