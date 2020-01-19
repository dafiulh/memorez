let data = JSON.parse(localStorage.getItem("pairData"))
data = data === null ? {} : data
let ctn = document.getElementById("content")
let table = document.getElementById("pairList")

function randomId() {
    let s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
    return s4() + s4() + s4()
}

function loadData() {
    if (data && Object.keys(data).length > 0) {
        if (getComputedStyle(table).display !== "table") table.style.display = "table"
        if (ctn.firstElementChild.id !== "pairList") ctn.removeChild(ctn.firstElementChild)

        let elem = ``
        
        for (let key in data) {
            elem += `
                <tr data-key="${key}">
                    <td>${data[key].id}</td>
                    <td>${data[key].en}</td>
                    <td class="remove"><img src="icon/delete.svg"></td>
                </tr>
            `
        }

        table.lastElementChild.innerHTML = elem
    } else {
        table.style.display = "none"

        let el = document.createElement("DIV")
        el.appendChild(document.createTextNode("Belum ada kartu yang ditambahkan"))
        el.classList.add("mb-4")
        ctn.insertBefore(el, table)
    }
}

loadData()

document.getElementById("toggleAdd").addEventListener("click", function () {
    let addEl = document.getElementById("add");
    if (addEl === null) {
        ctn.insertAdjacentHTML("beforeend", `
            <form id="add" class="mt-4">
                <hr>
                <h5 class="mb-3">Tambah Kartu</h5>
                <input type="text" class="form-control mb-2" name="addId" placeholder="Indonesia" required>
                <input type="text" class="form-control" name="addEn" placeholder="English" required>
                <button type="submit" name="addSubmit" class="btn btn-secondary btn-sm mt-3">Tambahkan</button>
            </form>
        `)
        
        document.getElementById("add").addEventListener("submit", function (evt) {
            evt.preventDefault()

            let addId = this.elements.addId
            let addEn = this.elements.addEn
            
            data[randomId()] = {id: addId.value, en: addEn.value}
            localStorage.pairData = JSON.stringify(data)
            loadData()

            addId.value = ""
            addEn.value = ""
        })
    } else {
        addEl.parentNode.removeChild(addEl)
    }
})

// document.getElementById("toggleExport").addEventListener("click", function () {})

// document.getElementById("toggleImport").addEventListener("click", function () {})

document.addEventListener("click", function(evt) {
    let bubbles = evt.path.slice(0, -3)
    if (bubbles.some(el => el.classList.contains("remove"))) {
        let tr = bubbles.find(el => el.hasAttribute("data-key"))
        let key = tr.dataset.key

        delete data[key]
        localStorage.pairData = JSON.stringify(data)
        loadData()
    }
})