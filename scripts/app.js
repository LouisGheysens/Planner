const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

const check = "fa-check-circle";
const uncheck = "fa-circle-thin";
const line = "lineTrough";

const options = {weekday : "long", month:"short", day:"numeric"};

const today=  new Date();

dateElement.innerHTML = today.toLocaleDateString("nl-be", options);

