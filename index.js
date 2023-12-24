const addbtn = document.querySelector(".btn");
const main = document.querySelector(".main");

const addNode = () => {
  const parentNode = document.createElement("div");
  parentNode.classList.add("container");
  parentNode.innerHTML = ` 
  <div class="parent">
    <div class="iconbar">
      <i class="fa-regular fa-floppy-disk save"></i>
      <i class="fa-solid fa-trash delete"></i>
    </div>
    <textarea></textarea>
  </div>`;
  //save
  const saveIcon = parentNode.querySelector(".save");
  const textarea = parentNode.querySelector(".parent textarea");
  saveIcon.addEventListener("click", saveIconText);
  textarea.addEventListener("input", saveIconText);

  //delete
  const deleteIcon = parentNode.querySelector(".delete");
  deleteIcon.addEventListener("click", () => {
    parentNode.remove();
    saveIconText();
  });
  main.append(parentNode);
};
addbtn.addEventListener("click", addNode);

// save icon
function saveIconText() {
  const textareas = document.querySelectorAll(".parent textarea");
  const textareaData = Array.from(textareas).map((data) => {
    return data.value;
  });
  if (textareaData.length === 0) {
    localStorage.removeItem("nodes");
  } else {
    localStorage.setItem("nodes", JSON.stringify(textareaData));
  }
}
const defaultfun = () => {
  const noteFromLocal = JSON.parse(localStorage.getItem("nodes"));
  if (noteFromLocal !== null) {
    noteFromLocal.forEach((noteText) => {
      addNode();
      const textareaFornote = document.querySelectorAll(".parent textarea");
      const lastTextarea = textareaFornote[textareaFornote.length - 1];
      lastTextarea.value = noteText;
    });
  } else {
    addNode();
  }
};
defaultfun();
