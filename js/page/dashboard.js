let el = document.getElementById("settings").elements

if (Object.keys(JSON.parse(localStorage.getItem("pairData")) || {}).length === 0) {
    el.submit.disabled = true
    el.submit.insertAdjacentHTML("afterend", `
        <small class="text-muted d-block mt-3">Tambahkan kartu di halaman edit sebelum memulai</small>
    `)
}

let defset = JSON.parse(localStorage.getItem("settings")) || {}
let useTime = true // let useTime = typeof defset.useTime === "boolean" ? defset.useTime : true
el.firstWord.value = defset.firstWord || "id"
el.useTime.checked = useTime
if (useTime) el.time.disabled = false
el.time.value = defset.time || 5

function checkTime () {
    el.time.disabled = !el.useTime.checked ? true : false
}

checkTime()
el.useTime.addEventListener("change", checkTime)

settings.addEventListener("submit", function (evt) {
    evt.preventDefault()
    let form = this.elements
    let sbt = {}
    sbt.firstWord = form.firstWord.value
    sbt.useTime = form.useTime.checked
    sbt.time = +form.time.value
    localStorage.settings = JSON.stringify(sbt)
    window.location = "start.html"
})
