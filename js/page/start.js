let data = JSON.parse(localStorage.getItem("pairData"))
let settings = JSON.parse(localStorage.getItem("settings"))

if (!settings || !settings.hasOwnProperty("firstWord") || !settings.hasOwnProperty("useTime") || !settings.hasOwnProperty("time")) window.location = "index.html"
if (!data || Object.keys(data).length === 0) window.location = "edit.html"

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

let text = document.getElementById("pair")
let lang = document.getElementById("lang")

let actions = document.getElementById("actions")
let progress = document.getElementById("progress")

let shuffledKeys = shuffle(Object.keys(data))
let i = 0

progress.firstElementChild.style.transitionDuration = settings.time + "s"

function question () {
    text.textContent = data[shuffledKeys[i]].id
    lang.textContent = settings.firstWord
    setTimeout(() => progress.firstElementChild.classList.remove("full"))

    setTimeout(() => {
        answer(i)
        i++
    }, settings.time * 1000)
}

function answer (iter) {
    actions.classList.remove("d-none")
    progress.classList.add("d-none")

    text.textContent = data[shuffledKeys[iter]].en
    lang.textContent = settings.firstWord == "en" ? "id" : "en"
}

question()