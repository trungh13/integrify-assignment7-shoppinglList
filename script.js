let shoppingList = [
  { bought: false, name: "Tequila", quantity: 1 },
  { bought: false, name: "Triple Sec", quantity: 1 },
  { bought: true, name: "Glasses", quantity: 2 },
  { bought: false, name: "Salt", quantity: 1 },
  { bought: false, name: "Lemon", quantity: 5 },
  { bought: false, name: "Ice", quantity: 1 },
  { bought: true, name: "Shaker", quantity: 1 }
];
const regexNum = /^[1-9]+[0-9]?$/;
const btnSubmit = document.getElementById("btnSubmit");
btnSubmit.addEventListener("click", createItem);

const checkboxChange = function() {
  //function checkboxChange() {
  const checkBox = event.target;
  const itemName = checkBox.parentNode.id;
  const checkBoxItem = checkBox.parentNode;
  const index = shoppingList.findIndex(function(obj) {
    return obj.name === itemName;
  });
  const item = shoppingList[index];
  checkBoxItem.remove();
  if (checkBox.checked) {
    item.bought = true;
    renderItem(item, "bought-items");
  } else {
    item.bought = false;
    renderItem(item, "shopping-items-list");
  }
  console.log(shoppingList);
};

const renderItem = (item, parentNode) => {
  let itemNode = document.createElement("div");
  itemNode.className = "item";
  itemNode.id = item.name;

  let itemCheckbox = document.createElement("input");
  itemCheckbox.setAttribute("type", "checkbox");
  itemCheckbox.addEventListener("change", checkboxChange);
  itemCheckbox.checked = item.bought;
  let itemName = document.createElement("div");
  itemName.className = "shopping-item-name";
  itemName.innerHTML = item.name;
  let editName = document.createElement("input");
  editName.className = "edit-item-name hide";
  editName.value = item.name;
  let itemQuantity = document.createElement("div");
  itemQuantity.className = "shopping-item-quantity";
  itemQuantity.innerHTML = item.quantity;
  let editQuantity = document.createElement("input");
  editQuantity.className = "edit-item-quantity hide";
  editQuantity.value = item.quantity;
  let editButton = document.createElement("button");
  editButton.className = "btnEdit button";
  editButton.innerHTML = "Edit";
  editButton.addEventListener("click", editItem);
  let deleteButton = document.createElement("button");
  deleteButton.className = "btnDelete button";
  deleteButton.innerHTML = "Delete";
  deleteButton.addEventListener("click", deleteItem);

  itemNode.appendChild(itemCheckbox);
  itemNode.appendChild(itemName);
  itemNode.appendChild(editName);
  itemNode.appendChild(itemQuantity);
  itemNode.appendChild(editQuantity);
  itemNode.appendChild(editButton);
  itemNode.appendChild(deleteButton);

  document.getElementById(parentNode).appendChild(itemNode);
};

shoppingList.forEach(item => {
  item.bought
    ? renderItem(item, "bought-items")
    : renderItem(item, "shopping-items-list");
});

// const createItem = () => {
function createItem() {
  event.preventDefault();
  const nameInput = document.getElementById("new-item-name");
  const quantityInput = document.getElementById("new-item-quantity");
  const newName = nameInput.value;
  const newQuantity = quantityInput.value;

  const panel2 = document.getElementById("panel2");
  const panel2a = panel2.querySelector("a");

  const duplicateName = shoppingList.findIndex(function(obj) {
    return obj.name === newName;
  });
  if (newName === "") {
    nameInput.placeholder = "Please enter name";
  }
  if (!regexNum.test(newQuantity)) {
    quantityInput.value = "";
    quantityInput.placeholder = "Re-enter quantity!";
    quantityInput.className = "warning-input";
  }
  if (duplicateName !== -1) {
    nameInput.value = "";
    nameInput.placeholder = "Duplicated name!";
  }
  if (nameInput.placeholder != null) nameInput.className = "warning-input";
  if (quantityInput.placeholder != null)
    quantityInput.className = "warning-input";

  if (
    newName != "" &&
    newQuantity != "" &&
    duplicateName == -1 &&
    newQuantity > 0
  ) {
    const newItem = {};
    newItem.bought = false;
    newItem.name = newName;
    newItem.quantity = newQuantity;

    document.getElementById("new-item-name").value = "";
    document.getElementById("new-item-quantity").value = "";
    shoppingList.push(newItem);
    renderItem(newItem, "shopping-items-list");
    if (nameInput.classList.contains("warning-input"))
      nameInput.classList.remove("warning-input");
    if (quantityInput.classList.contains("warning-input"))
      quantityInput.classList.remove("warning-input");
    panel2a.click();
  }
  console.log(shoppingList);
}

// const deleteItem = () => {
function deleteItem() {
  const item = event.target;
  const itemName = item.parentNode.id;
  const itemNode = item.parentNode;
  const index = shoppingList.findIndex(function(obj) {
    return obj.name === itemName;
  });
  itemNode.remove();
  shoppingList.splice(index, 1);
  console.log(shoppingList);
}

function editItem() {
  const item = event.target;
  let itemName = item.parentNode.id;
  const itemNode = item.parentNode;
  const index = shoppingList.findIndex(function(obj) {
    return obj.name === itemName;
  });
  let buttonName = itemNode.querySelector(".btnEdit");
  const divName = itemNode.querySelector(".shopping-item-name");
  const editName = itemNode.querySelector(".edit-item-name");
  const divQuantity = itemNode.querySelector(".shopping-item-quantity");
  const editQuantity = itemNode.querySelector(".edit-item-quantity");

  if (buttonName.innerHTML === "Edit") {
    buttonName.innerHTML = "Save";
    divName.classList.add("hide");
    editName.classList.remove("hide");
    divQuantity.classList.add("hide");
    editQuantity.classList.remove("hide");
  } else {
    buttonName.innerHTML = "Edit";
    editName.classList.add("hide");
    divName.classList.remove("hide");
    editQuantity.classList.add("hide");
    divQuantity.classList.remove("hide");
    if (editName.value != "") {
      itemNode.id = editName.value;
      shoppingList[index].name = editName.value;
      divName.innerHTML = editName.value;
    } else {
      editName.value = shoppingList[index].name;
    }
    if (regexNum.test(editQuantity.value)) {
      shoppingList[index].quantity = Number(editQuantity.value);
      divQuantity.innerHTML = Number(editQuantity.value);
    } else {
      editQuantity.value = shoppingList[index].quantity;
    }
  }
  console.log(shoppingList[index]);
}
