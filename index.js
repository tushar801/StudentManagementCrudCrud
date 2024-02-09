let students = [];
let studentCount = 0;

function addStudent() {
  const name = document.getElementById("nameInput").value;
  const mobile = document.getElementById("mobileInput").value;
  const address = document.getElementById("addressInput").value;

  if (name && mobile && address) {
    const student = {
      id: Date.now(),
      name: name,
      mobile: mobile,
      address: address
    };
    students.push(student);
    renderStudents();
    saveToServer(student);
    document.getElementById("nameInput").value = "";
    document.getElementById("mobileInput").value = "";
    document.getElementById("addressInput").value = "";
    document.getElementById("studentCount").innerText = ++studentCount;
  } else {
    alert("Please fill in all fields!");
  }
}

function renderStudents() {
  const studentsList = document.getElementById("studentsList");
  studentsList.innerHTML = "";
  students.forEach(student => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <span>${student.name} | ${student.mobile} | ${student.address}</span>
      <button onclick="deleteStudent(${student.id})">Delete</button>
      <button onclick="editStudent(${student.id})">Edit</button>
    `;
    studentsList.appendChild(listItem);
  });
}

function deleteStudent(id) {
  students = students.filter(student => student.id !== id);
  renderStudents();
  document.getElementById("studentCount").innerText = --studentCount;
}

function editStudent(id) {
  const student = students.find(student => student.id === id);
  const newName = prompt("Enter new name:", student.name);
  const newMobile = prompt("Enter new mobile:", student.mobile);
  const newAddress = prompt("Enter new address:", student.address);

  if (newName && newMobile && newAddress) {
    student.name = newName;
    student.mobile = newMobile;
    student.address = newAddress;
    renderStudents();
    updateOnServer(student);
  } else {
    alert("Please fill in all fields!");
  }
}

function saveToServer(student) {
  // Make POST request to CRUDcrud API to save student data
    fetch('https://crudcrud.com/api/dc71d09f1bd2450ca7748e48d006d477', {
                    method: 'POST',
                    body: JSON.stringify(student),
                   headers: {
                     'Content-Type': 'application/json'
                    }
               });
}

function updateOnServer(student) {
  // Make PUT request to CRUDcrud API to update student data
      fetch(`https://crudcrud.com/api/dc71d09f1bd2450ca7748e48d006d477/${student.id}`, {
                    method: 'PUT',
                   body: JSON.stringify(student),
                   headers: {
                     'Content-Type': 'application/json'
                   }
                 });
}

function fetchFromServer() {
  // Make GET request to CRUDcrud API to fetch all student data
   fetch('https://crudcrud.com/api/dc71d09f1bd2450ca7748e48d006d477')
                .then(response => response.json())
                .then(data => {
                students = data;
                renderStudents();
                studentCount = students.length;
                document.getElementById("studentCount").innerText = studentCount;
               });
}

fetchFromServer(); // Call this function when the page loads to fetch data from server
