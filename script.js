const checkBoxList = document.querySelectorAll(".custom-checkbox");
const inputFields = document.querySelectorAll(".input-field");
const progressLabel = document.querySelector(".progress-label");
// const errorLabel = document.querySelector('.error-label')
const progressBar = document.querySelector(".progress-bar");
const progressValue = document.querySelector(".progress-value");

// console.log(checkBoxList);

//  convert 'inputFields' Nodelist into array using  rest Parameter [...]
// const allFields
// [...inputFields].every(function(input){
//     return input.value;
// })

const allQuotes = [
  "Raise the bar by completing your goals!",
  "Well begun is half done",
  "Just a step away, keep going",
  "Whoa! You just completed all the goals, time for chill :D",
  "this is fourth quote",
];

const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {
  first:{
    name:'',
    completed: false,
  },
  second:{
    name:'',
    completed: false,
  },
    third:{
    name:'',
    completed: false,
  },
};

// const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {}; // use when we want to add more goals //

let completedGoalsCount = Object.values(allGoals).filter(
  (goal) => goal.completed
).length;

progressValue.style.width = `${(completedGoalsCount / inputFields.length) * 100}%`;
progressValue.firstElementChild.innerText = `${completedGoalsCount}/3 Completed`;
progressLabel.innerText = allQuotes[completedGoalsCount]

// console.log(completedGoalsCount);

checkBoxList.forEach((checkbox) => {
  checkbox.addEventListener("click", () => {
    const allFieldsFilled = [...inputFields].every((input) => {
      // console.log(input.value);
      return input.value;
    });

    if (allFieldsFilled) {
      checkbox.parentElement.classList.toggle("completed");
      progressValue.style.width = "33.33%";
      const inputId = checkbox.nextElementSibling.id;
      allGoals[inputId].completed = !allGoals[inputId].completed;
      completedGoalsCount = Object.values(allGoals).filter(
        (goal) => goal.completed
      ).length;

      progressValue.style.width = `${(completedGoalsCount / inputFields.length) * 100}%`;
      progressValue.firstElementChild.innerText = `${completedGoalsCount}/${inputFields.length} Completed`;
      progressLabel.innerText = allQuotes[completedGoalsCount]
      localStorage.setItem("allGoals", JSON.stringify(allGoals));
      // console.log(allGoals[inputId]);
    } else {
      progressBar.classList.add("show-error");
    }
  });
});

inputFields.forEach((input) => {
  // console.log(allGoals[input.id]);
  if(allGoals[input.id]){
  input.value = allGoals[input.id].name; // access local storage values in input fields

  if (allGoals[input.id].completed) {
    input.parentElement.classList.add("completed");
  }
  }
   
  input.addEventListener("focus", () => {
    progressBar.classList.remove("show-error");
  });

  input.addEventListener("input", () => {
    if (allGoals[input.id] && allGoals[input.id].completed) {
      //Restrict input for modification, when its completed
      input.value = allGoals[input.id].name;
      return;
    }
    if(allGoals[input.id]){
      allGoals[input.id].name = input.value
    } else {
      allGoals[input.id] = {
        name: input.value,
        completed:  false,
      }
    }
    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});
