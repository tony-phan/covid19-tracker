
//Hides the div with state data, so that it is not shown before user selection.
document.getElementById("statetable").style.display = "none";
fillTopTable();

//Show the div that prompts user to enter a state.
document.getElementByID("selectstate").style.display = "block";

function setState(){
  var select_value = document.getElementById('state').value; //Get user's chosen state
  document.getElementById('chosenstate').innerHTML = select_value + ":"; //Print chosen state
  document.getElementById("statetable").style.display = "block"; //display hidden div
  document.getElementById("selectstate").style.display = "none"; //now hide the prompt
  fillStateTable(select_value); //pass chosen state to fillStateTable function
};

//Fill the top table
function fillTopTable(){
  fetch('https://api.covidtracking.com/v1/us/current.json')
  .then(response => {
    if(!response.ok) {
      throw Error("ERROR");
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    //fill the US data table
    document.getElementById("us_cases_today").innerHTML = data[0].positiveIncrease;
    document.getElementById("us_deaths_today").innerHTML = data[0].deathIncrease;
    document.getElementById("us_cases_total").innerHTML = data[0].positive;
    document.getElementById("us_deaths_total").innerHTML = data[0].death;
  })
  .catch(error => {
    console.log(error);
  });
}

//Fill bottom table
function fillStateTable(chosen){
  var selected_state = chosen.toLowerCase(); //API uses lowercase only in url.
  fetch('https://api.covidtracking.com/v1/states/' +selected_state+ '/current.json')
  .then(response => {
    if(!response.ok) {
      throw Error("ERROR");
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    //fill the top half of the state table
    document.getElementById("state_cases_today").innerHTML = data.positiveIncrease;
    document.getElementById("state_deaths_today").innerHTML = data.deathIncrease;
    document.getElementById("state_cases_total").innerHTML = data.positive;
    document.getElementById("state_deaths_total").innerHTML = data.death;
    //fill the second half of the state table
    document.getElementById("icu_today").innerHTML = data.inIcuCurrently;
    document.getElementById("ventilator_today").innerHTML = data.onVentilatorCurrently;
    document.getElementById("state_recovered").innerHTML = data.recovered;
    document.getElementById("total_negative").innerHTML = data.negative;
  })
  .catch(error => {
    console.log(error);
  });
}
fillStateTable();
