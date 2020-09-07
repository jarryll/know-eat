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

let url = "/weekly"
console.log(url)
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



         // let points = result.rows.map(item => {
         //        return {x: item.to_char, y:item.sum}
         //    })
         //    JSC.Chart('chartDiv', {
         //        series:[
         //            {
         //                points: points
         //            }
         //        ]
         //    });
         //    console.log (result.rows)