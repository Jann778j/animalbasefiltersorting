"use strict";

window.addEventListener("DOMContentLoaded", start);

let allAnimals = [];

// The prototype for all animals:
const Animal = {
  name: "",
  desc: "-unknown animal-",
  type: "",
  age: 0,
};

function start() {
  console.log("ready");

  // TODO: Add event-listeners to filter and sort buttons

  document
    .querySelector("[data-filter=cat]")
    .addEventListener("click", visAllCats);
  document
    .querySelector("[data-filter=dog]")
    .addEventListener("click", visAllDogs);
  document
    .querySelector("[data-filter=all]")
    .addEventListener("click", visAllAnimals);

  document
    .querySelector("[data-sort=name]")
    .addEventListener("click", sortAnimalsName);
  document
    .querySelector("[data-sort=type]")
    .addEventListener("click", sortAnimalsType);
  document
    .querySelector("[data-sort=desc]")
    .addEventListener("click", sortAnimalsDesc);
  document
    .querySelector("[data-sort=age]")
    .addEventListener("click", sortAnimalsAge);

  loadJSON();
}

async function loadJSON() {
  const response = await fetch("animals.json");
  const jsonData = await response.json();

  // when loaded, prepare data objects
  prepareObjects(jsonData);
}

function prepareObjects(jsonData) {
  allAnimals = jsonData.map(preapareObject);

  // TODO: This might not be the function we want to call first

  displayList(allAnimals);
}

function preapareObject(jsonObject) {
  const animal = Object.create(Animal);

  const texts = jsonObject.fullname.split(" ");
  animal.name = texts[0];
  animal.desc = texts[2];
  animal.type = texts[3];
  animal.age = jsonObject.age;

  return animal;
}
// make buttons work
function visAllCats() {
  console.log("cat filter button cliked here");
  const allCats = [];
  allAnimals.forEach((animal) => {
    if (animal.type === "cat") {
      allCats.push(animal);
    }
  });

  displayList(allCats);
}

function visAllDogs() {
  console.log("dog filter button cliked here");
  const AllDogs = [];
  allAnimals.forEach((animal) => {
    if (animal.type === "dog") {
      AllDogs.push(animal);
    }
  });

  displayList(AllDogs);
}

function visAllAnimals() {
  console.log("all animals filter button cliked here");
  displayList(allAnimals);
}

//sorting by name
function sortAnimalsName() {
  console.log("sorting by name if click");
  allAnimals.sort(compareName);
  displayList(allAnimals);
}

function compareName(a, b) {
  console.log(`se ${a.name} and ${b.name}`);
  if (a.name < b.name) {
    console.log(`${a.name} should come first`);
    return -1;
  } else {
    console.log(`${b.name} should come first`);
    return 1;
  }
}

//sort by type

function sortAnimalsType() {
  console.log("sorting by type if click");
  allAnimals.sort(compareType);
  displayList(allAnimals);
}

function compareType(a, b) {
  console.log(`se ${a.type} and ${b.type}`);
  if (a.type < b.type) {
    console.log(`${a.type} should come first`);
    return -1;
  } else {
    console.log(`${b.type} should come first`);
    return 1;
  }
}

// sort by descrip

function sortAnimalsDesc() {
  console.log("sorting by desc if click");
  allAnimals.sort(compareDesc);
  displayList(allAnimals);
}

function compareDesc(a, b) {
  console.log(`se ${a.desc} and ${b.desc}`);
  if (a.desc < b.desc) {
    console.log(`${a.desc} should come first`);
    return -1;
  } else {
    console.log(`${b.desc} should come first`);
    return 1;
  }
}

//sorting by age

function sortAnimalsAge() {
  console.log("sorting by age if click");
  allAnimals.sort(compareAge);
  displayList(allAnimals);
}

function compareAge(a, b) {
  console.log(`se ${a.age} and ${b.age}`);
  if (a.age < b.age) {
    console.log(`${a.age} should come first`);
    return -1;
  } else {
    console.log(`${b.age} should come first`);
    return 1;
  }
}

function displayList(animals) {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  animals.forEach(displayAnimal);
}

function displayAnimal(animal) {
  // create clone
  const clone = document
    .querySelector("template#animal")
    .content.cloneNode(true);

  // set clone data
  clone.querySelector("[data-field=name]").textContent = animal.name;
  clone.querySelector("[data-field=desc]").textContent = animal.desc;
  clone.querySelector("[data-field=type]").textContent = animal.type;
  clone.querySelector("[data-field=age]").textContent = animal.age;

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}
