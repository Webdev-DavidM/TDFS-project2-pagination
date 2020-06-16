const allStudentsList = document.getElementsByClassName('student-item cf');
let StudentsPerPage = 10;
let ul = document.querySelector('.pagination ul');
const fullStudentList = document.querySelectorAll('.student-list li');

/* this function sets the display to none for all
students that arent on the current page, and accepts a 
page parameter so can chage pages when required*/

function showPage(pageRequested, StudentsPerPage) {
  let pageStart0 = pageRequested - 1;
  let startIndex = pageStart0 * StudentsPerPage;
  let endIndex = startIndex + (StudentsPerPage - 1);
  for (let i = 0; i < allStudentsList.length; i++) {
    if (i < startIndex || i > endIndex)
      allStudentsList[i].style.display = 'none';
  }
}

showPage(1, 10);

/* This function calculates how many pages are required based
on the number of students and creates the pages using
a template literal */
function appendPagelinks(allStudentsList) {
  let totalStudents = allStudentsList.length;
  let pagesNeeded = totalStudents / StudentsPerPage;
  pagesNeeded = Math.ceil(pagesNeeded);
  for (let i = 1; i <= pagesNeeded; i++) {
    ul.innerHTML += `
      <li>
      <a class="Page${i}">${i}</a>
    </li>  `;
  }
  let active = document.querySelector('.Page1');
  active.classList.add('active');
}

appendPagelinks(allStudentsList);

/*  This is an event listener for the page buttons
which uses event propogation
on the ul parent for the pages, it removes the active class from the old
page and puts it on the new page, then it displays all the items ( in case they have 
been removed from previous searches and then shows only the items on the
page requested.*/

ul.addEventListener('click', (e) => {
  if (e.target.tagName == 'A') {
    let pageNo = parseInt(e.target.textContent);
    let oldActive = document.querySelector('.active');
    oldActive.classList.remove('active');
    e.target.classList.add('active');
    for (let i = 0; i < allStudentsList.length; i++) {
      allStudentsList[i].style.display = 'block';
    }
    showPage(pageNo, StudentsPerPage);
  }
});

let input1 = document.querySelector('.name');

/* This event listener for the search, for any user input, it runs 4 functions
to begin with which create a new student list, begin on page 1, reset the pages 
create a page list */

input1.addEventListener('keyup', (e) => {
  clearLiandcreateNewList(fullStudentList);
  showPage(1, 10);
  pagesReset();
  appendPagelinks(fullStudentList);
  let userSearch = e.target.value.toLowerCase();
  if (userSearch == '') {
    for (let i = 0; i < fullStudentList.length; i++) {
      fullStudentList[i].style.display = 'block';
    }
    showPage(1, 10);
    pagesReset();
    appendPagelinks(fullStudentList);
    return;
  }

  /* This runs a loop and makes all the students display to none and makes
them reappear if the user input matches the name variable */
  if (userSearch != '') {
    let name = document.querySelectorAll('li div h3');
    for (let i = 0; i < name.length; i++) {
      allStudentsList[i].style.display = 'none';
      if (name[i].textContent.indexOf(userSearch) != -1) {
        name[i].parentElement.parentElement.style.display = 'block';
      }
    }
    filteredStudents = document.querySelectorAll('[style="display: block;"]');
    if (filteredStudents.length == 0) {
      pagesReset();
      return alert('No one found, please try another search!');
    }
    /* Then below we create a new html collection of the filtered students
     */
    filteredStudents = document.querySelectorAll('[style="display: block;"]');
    clearLiandcreateNewList(filteredStudents);
    showPage(1, 10);
    pagesReset();
    appendPagelinks(filteredStudents);
  }
});

/* This function removes all the pages and they can recreated based on the 
number of students found in the search */

function pagesReset() {
  let pages = document.querySelectorAll('.pagination ul li');
  let ul = document.querySelector('.pagination ul');
  for (let i = 0; i < pages.length; i++) {
    ul.removeChild(pages[i]);
  }
}

/* This function clears any previous searches and creates a new full
student list which can be searched again */

function clearLiandcreateNewList(studentList) {
  let students = document.querySelectorAll('.student-list li');
  let ul = document.querySelector('.student-list');
  for (let i = 0; i < students.length; i++) {
    ul.removeChild(students[i]);
  }
  for (let i = 0; i < studentList.length; i++) {
    ul.appendChild(studentList[i]);
  }
}
