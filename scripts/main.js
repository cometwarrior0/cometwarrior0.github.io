// Get the list element
var list = document.getElementById("my-list");

// Add event listeners for dragstart, dragover, and drop events
list.addEventListener("dragstart", handleDragStart);
list.addEventListener("dragover", handleDragOver);
list.addEventListener("drop", handleDrop);

// Define the dragstart handler
function handleDragStart(e) {
  // Set the dataTransfer data to the id of the dragged item
  e.dataTransfer.setData("text/plain", e.target.id);
  // Add a custom class to the dragged item
  e.target.classList.add("dragging");
}

// Define the dragover handler
function handleDragOver(e) {
  // Prevent the default drop action
  e.preventDefault();
  // Get the drop target
  var target = e.target;
  // If the target is a list item, add a custom class to it
  if (target.tagName == "li") {
    target.classList.add("over");
  }
}

// Define the drop handler
function handleDrop(e) {
  // Prevent the default drop action
  e.preventDefault();
  // Get the dataTransfer data (the id of the dragged item)
  var id = e.dataTransfer.getData("text/plain");
  // Get the dragged item and the drop target
  var draggedItem = document.getElementById(id);
  var dropTarget = e.target;
  // If the drop target is a list item, insert the dragged item before or after it, depending on the mouse position
  if (dropTarget.tagName == "li") {
    var rect = dropTarget.getBoundingClientRect();
    var y = e.clientY - rect.top;
    if (y < rect.height / 2) {
      list.insertBefore(draggedItem, dropTarget);
    } else {
      list.insertBefore(draggedItem, dropTarget.nextSibling);
    }
  }
  // Remove the custom classes from the dragged item and the drop target
  draggedItem.classList.remove("dragging");
  dropTarget.classList.remove("over");
}
