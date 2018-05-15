const shoppingList = [
  { bought: false, name: "Tequila", quantity: 1 },
  { bought: false, name: "Triple Sec", quantity: 1 },
  { bought: true, name: "Glasses", quantity: 2 },
  { bought: false, name: "Salt", quantity: 1 },
  { bought: false, name: "Lemon", quantity: 5 },
  { bought: false, name: "Ice", quantity: 1 },
  { bought: true, name: "Shaker", quantity: 1 }
];

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
	}

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
  let itemQuantity = document.createElement("div");
  itemQuantity.className = "shopping-item-quantity";
  itemQuantity.innerHTML = item.quantity;
  let deleteButton = document.createElement("button");
  deleteButton.className = "btnDelete";
  deleteButton.innerHTML = "Delete";
  deleteButton.addEventListener("click", deleteItem);

  itemNode.appendChild(itemCheckbox);
  itemNode.appendChild(itemName);
  itemNode.appendChild(itemQuantity);
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
  let name = nameInput.value;
  let quantity = quantityInput.value;
  if (name != "" && quantity != "") {
		const newItem = {};
		newItem.bought = false;
		newItem.name = name;
    newItem.quantity = quantity;

    document.getElementById("new-item-name").value = "";
    document.getElementById("new-item-quantity").value = "";
    shoppingList.push(newItem);
    renderItem(newItem, "shopping-items-list");
  }

  if (name === "") {
    nameInput.placeholder = "Please enter name";
    nameInput.className = "warning-input";
  }
  if (quantity == "") {
    quantityInput.placeholder = "Please enter quantity";
    quantityInput.className = "warning-input";
  }
  console.log(shoppingList);
}


// const deleteItem = () => {
function deleteItem() {
  const item = event.target;
  const itemName = item.parentNode.id;
  const index = shoppingList.findIndex(function(obj) {
    return obj.name === itemName;
  });
  const deleteItem = item.parentNode;
  deleteItem.remove();
  shoppingList.splice(index, 1);
  console.log(shoppingList);
}
