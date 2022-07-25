debugger
var category_select = document.getElementById("category-selector");
var category_select2 = document.getElementById("category-selector2");

category_select.onclick = function () {
  document.getElementById("is").checked = true;
};

category_select2.onclick = function () {
  document.getElementById("kisisel").checked = true;
};

function initToDo() {
  if (localStorage.todos) {
    var items = JSON.parse(localStorage.todos);

    ul = document.getElementById("todoList");

    for (let index = 0; index < items.length; index++) {
      let li = `
    <li class="task list-group-item">
    <div class="form-check ">
            <input class="form-check-input " type="radio" name="Done" id="done">
            <label class="form-check-label textcolor2" >
           ${items[index].title}
            </label>
        <div class="float-end" >
                <button class="editButton" id="btnEdit" type="submit">Edit</button>
                <button class="deleteButton" id="DeleteButton" type="submit">Delete</button>
        </div>
    </div>
    </li>`;

      ul.insertAdjacentHTML("beforeend", li);
    }
  } else {
    return false;
  }
}

function addJob(title, category) {
  let job;

  if (localStorage.todos) {
    var items = JSON.parse(localStorage.todos);
    var sorgu = items.some((e) => e.title === title);
    
    
    if (title && category && sorgu ) {
      let warning_text = document.getElementById("warning_text");
      warning_text.classList.add("alert");
      warning_text.classList.add("alert-danger");
      warning_text.style.marginTop = "15px";
      warning_text.innerHTML = "Aynı başlıktan listede bulunmaktadır!";

      return 0;
    }
    job = [
      ...items,
      {
        title,
        category,
      },
    ];
  } else {
    job = [
      {
        title,
        category,
      },
    ];
  }

  localStorage.setItem("todos", JSON.stringify(job));

  ul = document.getElementById("todoList");

  let li = `
    <li class="task list-group-item">
    <div class="form-check ">
            <input class="form-check-input " type="radio" name="Done" id="done">
            <label class="form-check-label textcolor2" >
           ${title}
            </label>
        <div class="float-end" >
                <button class="editButton" id="btnEdit" type="submit">Edit</button>
                <button class="deleteButton" id="DeleteButton" type="submit">Delete</button>
        </div>
    </div>
    </li>`;

  ul.insertAdjacentHTML("beforeend", li);

  document
    .getElementById("DeleteButton")
    .addEventListener("click", function () {
      console.log("tıklandı");
      // delete job[title];
      var delete_list = JSON.parse(localStorage.todos);

      console.log(delete_list.title);
      for (var i = 0; i < delete_list.length; i++) {
        if (delete_list[i] === delete_list.title) {
          localStorage.removeItem("title");
        }
      }
    });
}

document.getElementById("btnGet").addEventListener("click", function () {
  var NameText = document.getElementById("UserName").value;
  var title = document.getElementById("title").value;
  var category = document.querySelector('input[type="radio"]:checked').getAttribute("id");
 
    

  if (title == "") {
    alert("Lütfen Formu eksiksiz doldurun ! ");
  } else {
    addJob(title, category);
    localStorage.setItem("username", JSON.stringify(NameText));
  }

  document.getElementById("myForm").reset();
});

initToDo();
