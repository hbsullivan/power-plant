
// Not very reusable versions
// const hydrate = (plant) => {
//   return {
//     ...plant, 
//     water: (plant.water || 0) + 1
//   }
// };

// const feed = (plant) => {
//   return {
//     ...plant,
//     soil: (plant.soil || 0) + 1
//   }
// };

// Very reusable version, can be applied to multiple properties
// const changePlantState = (plant, property) => {
//   return {
//     ...plant,
//     [property]: (plant[property] || 0) + 1
//   }
// }

// Makes previous function more abstract
// const changeState = (state, prop) => {
//   return {
//     ...state, 
//     [prop]: (state[prop] || 0) + 1
//   }
// }

// Removes limitation of only incrementing
// const changeStateAnyValue = (state, prop, value) => ({
//     ...state, 
//     [prop]: (state[prop] || 0) + value
//   })

// Curries function
//Function Factory
const changeState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop]: (state[prop] || 0) + value
    });
  };
};

// Storing state
const storeState = () => {
  let currentState = {};
  return (stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = {...newState};
    return newState;
  };
};

const stateControl = storeState();

//Four functions using function factory
// const feed = changeState("soil")(1);
const blueFood = changeState("soil")(5);
// const hydrate = changeState("water")(1);
// const superWater = changeState("water")(5);

window.onload = function() { 

  document.getElementById('feed').onclick = function() {
    const newState = stateControl(blueFood);
    document.getElementById('soil-value').innerText = `Soil: ${newState.soil}`;
  };


  document.getElementById('show-state').onclick = function() {
    const currentState = stateControl();
    document.getElementById('soil-value').innerText = `Soil: ${currentState.soil}`;
  };

};