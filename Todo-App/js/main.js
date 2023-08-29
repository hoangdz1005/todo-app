document.getElementById("area-form").style.display = "none"

function addTask() {
    document.getElementById("area-form").style.display = "block"
}

function cancelTask() {
    document.getElementById("input-name").value = ""
    document.getElementById("area-form").style.display = "none"
}

function submitTask() {
    var listTasks = JSON.parse(localStorage.getItem("listTasks"))
    if(listTasks === null) {
        listTasks = [];
    }
    const nameTask = document.getElementById("input-name").value
    const inputLevel = document.getElementById("input-level").value
    listTasks.push({
        name: nameTask,
        level: inputLevel
    })
    console.log(listTasks)
    localStorage.setItem("listTasks", JSON.stringify(listTasks))
    document.getElementById("input-name").value=""
    loadListTasks()
}

function loadListTasks() {
    var listTasks = JSON.parse(localStorage.getItem("listTasks"))
    var html = ``
    if(listTasks===null) {
        listTasks = []
    } else {
        listTasks.forEach((task, index) => {
            if(task.level == 2) {
                html += `
                <tr>
                                <td>${index+1}</th>
                                <td>${task.name}</td>
                                <td><span class="badge bg-danger">Hight</span></td>
                                <td>
                                    <button onclick="editTask(${index})" class="btn btn-warning">Edit</button>
                                    <button onclick="deleteTask(${index})" class="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                `
            } else if(task.level==0) {
                html+= `
                <tr>
                                <td>${index+1}</th>
                                <td>${task.name}</td>
                                <td><span class="badge bg-dark">Small</span></td>
                                <td>
                                    <button onclick="editTask(${index})" class="btn btn-warning">Edit</button>
                                    <button onclick="deleteTask(${index})" class="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                `
            } else {
                html+= `
                <tr>
                <td>${index+1}</th>
                <td>${task.name}</td>
                <td><span class="badge bg-info">Medium</span></td>
                <td>
                    <button onclick="editTask(${index})" class="btn btn-warning">Edit</button>
                    <button  onclick="deleteTask(${index})" class="btn btn-danger">Delete</button>
                </td>
            </tr>
                `
            }
        })
    }

    document.getElementById("area-list-task").innerHTML = html;
}

function deleteTask(index) {
    var listTasks = JSON.parse(localStorage.getItem("listTasks"))
    listTasks.splice(index,1)
    localStorage.setItem("listTasks", JSON.stringify(listTasks))
    loadListTasks();
}
function editTask(index) {
    var listTasks = JSON.parse(localStorage.getItem("listTasks"))
    console.log(listTasks[index])
    document.getElementById("area-form").style.display = "block"
    document.getElementById("input-name").value = listTasks[index].name
    document.getElementById("input-level").value = listTasks[index].level
    document.getElementById("submitTask").onclick = function() {
       const name = document.getElementById("input-name").value
       const level = document.getElementById("input-level").value
       listTasks[index].name = name
       listTasks[index].level = level
       localStorage.setItem("listTasks", JSON.stringify(listTasks))
       listTasks[index].name = ""
       listTasks[index].level = ""
       loadListTasks()
    }
}

document.onload = loadListTasks()

// sap xep
document.getElementById("nameASC").onclick = function() {
    var listTasks = JSON.parse(localStorage.getItem("listTasks"))
    listTasks.sort((a, b) => a.name.localeCompare(b.name))
    var sortLabelElement = document.getElementById("sort-label")
    sortLabelElement.textContent = "NAME - ASC";
    localStorage.setItem("listTasks", JSON.stringify(listTasks))
    loadListTasks();
}

document.getElementById("nameDESC").onclick = function() {
    var listTasks = JSON.parse(localStorage.getItem("listTasks"))
    listTasks.sort((a, b) => b.name.localeCompare(a.name))
    var sortLabelElement = document.getElementById("sort-label")
    sortLabelElement.textContent = "NAME - DESC";
    localStorage.setItem("listTasks", JSON.stringify(listTasks))
    loadListTasks();
}

document.getElementById("levelASC").onclick = function() {
    var listTasks = JSON.parse(localStorage.getItem("listTasks"))
    listTasks.sort((a, b) => a.level-b.level)
    var sortLabelElement = document.getElementById("sort-label")
    sortLabelElement.textContent = "LEVEL - ASC";
    localStorage.setItem("listTasks", JSON.stringify(listTasks))
    loadListTasks();
}

document.getElementById("levelDESC").onclick = function() {
    var listTasks = JSON.parse(localStorage.getItem("listTasks"))
    listTasks.sort((a, b) => b.level-a.level)
    var sortLabelElement = document.getElementById("sort-label")
    sortLabelElement.textContent = "LEVEL - DESC";
    localStorage.setItem("listTasks", JSON.stringify(listTasks))
    loadListTasks();
}

// search
document.getElementById("btn-search").onclick = function() {
    var keySearch = document.getElementById("keySearch").value
    var listTasks = JSON.parse(localStorage.getItem("listTasks"))
    var newListTasks = listTasks.filter((task) => {
        return task.name.includes(keySearch);
    })
    localStorage.setItem("listTasks", JSON.stringify(newListTasks))
    document.getElementById("keySearch").value = ""
    loadListTasks();
    localStorage.setItem("listTasks", JSON.stringify(listTasks))

}
