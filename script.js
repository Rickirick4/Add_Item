const form = document.querySelector("form");
const input = document.querySelector("#txtItemName");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const ItemList = document.querySelector("#item-list");
let items;


eventListeners();
loadItems();


function eventListeners() {
    form.addEventListener("submit", addNewItem);
    ItemList.addEventListener("click", deleteItem);
    btnDeleteAll.addEventListener("click", deleteAllItems);
}


function loadItems() {
    items = getItemsFromLS();

    items.forEach(function (item) {
        createItem(item);
    })
}


function getItemsFromLS() {
    if (localStorage.getItem("items") === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem("items"));
    }
    return items;
}


function setItemsLS(text) {
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem("items", JSON.stringify(items));
}


function createItem(text) {

    const li = document.createElement("li");
    li.className = "list-group-item list-group-item-secondary";
    li.appendChild(document.createTextNode(text));

    const a = document.createElement("a");
    a.classList = "delete-item float-right";
    a.setAttribute("href", "#");
    a.innerHTML = '<i class="fas fa-times"></i>';

    li.appendChild(a);
    ItemList.appendChild(li);
}


function addNewItem(e) {

    if (input.value === "") {
        alert("Add New Item");
    }

    setItemsLS(input.value);
    createItem(input.value);
    input.value = "";

    e.preventDefault();
}


function deleteItem(e) {
    if (e.target.className === 'fas fa-times') {
        e.target.parentElement.parentElement.remove();
    }

    deleteItemFromLS(e.target.parentElement.parentElement.textContent);

    e.preventDefault();
}

function deleteItemFromLS(text) {
    items = getItemsFromLS();
    items.forEach(function (item, index) {
        if (item === text){
            items.splice(index, 1);
        }
    });
    localStorage.setItem("items", JSON.stringify(items));
}

function deleteAllItems(e) {

    if (confirm("Are you sure?")) {
        //ItemList.innerHTML="";
        while (ItemList.firstChild) {
            ItemList.firstChild.remove();
        }
    }
    localStorage.clear();
    e.preventDefault();
}
