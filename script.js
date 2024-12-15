const library = []
const modal = document.querySelector('#addBookModal')
const form = document.querySelector('form')

// addBookToLibrary('1984', 'George Orwell', '328', true);
// addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', '281', false);
// addBookToLibrary('The Great Gatsby', 'F. Scott Fitzgerald', '180', true);
// addBookToLibrary('Pride and Prejudice', 'Jane Austen', '279', false);
// addBookToLibrary('Moby Dick', 'Herman Melville', '635', true);
showBooks()

const deleteButtons = document.querySelectorAll('td:has(.delete-icon)')

form.addEventListener('submit', validateForm)
document.querySelector('#showModalBtn').addEventListener('click', modal.showModal.bind(modal))
document.querySelector('#closeModalBtn').addEventListener('click', modal.close.bind(modal))

function Book(title, author, pages, readed) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = readed
}

Book.prototype.info = function() {
  const readMsg = read ? 'already read' : 'not read yet'
  return `${this.title} by ${this.author}, ${this.pages} pages, ${readMsg}`
}

Book.prototype.toogleStatus = function () {
  this.read = !this.read
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read)
  library.push(newBook)
}

function showBooks() {
  const body = document.querySelector('#libraryTable tbody')
  body.innerHTML = ''

  library.forEach((book, i) => {
    const row = createRow(book, i)
    body.appendChild(row)
  })
}

function validateForm(e) {
  e.preventDefault()
  const formIsValid = form.checkValidity()
  
  if (formIsValid) {
    const bookInfo = Array.from(form.querySelectorAll('input')).map(
      input => input.type === 'checkbox' ? input.checked : input.value
    )

    addBookToLibrary(...bookInfo)
    showBooks()
    form.reset()
    modal.close()
  }
}

function deleteBook(e) {
  const currentRow = e.currentTarget.parentNode
  const i = currentRow.dataset.index

  library.splice(i, 1)
  showBooks()
}

function createRow(book, i) {
  const row = document.createElement('tr')
  row.setAttribute('data-index', i)

  for (const key in book) {
    if (Object.prototype.hasOwnProperty.call(book, key)) {
      let value = book[key]
      let checkbox
      
      if (typeof value === 'boolean') {
        checkbox = createCheckbox(value, book)
        value = value ? 'Read' : 'Not read'
      }
      
      const cell = document.createElement('td')
      cell.textContent = value

      if (checkbox) cell.appendChild(checkbox)

      row.appendChild(cell)
    }
  }

  const deleteCell = document.createElement('td')
  deleteCell.innerHTML = '<img class="icon delete-icon" src="assets/icons/delete.svg" alt="Delete Icon">'
  deleteCell.addEventListener('click', deleteBook)

  row.appendChild(deleteCell)
  return row
}

function createCheckbox(value, book) {
  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.checked = value
  checkbox.addEventListener('change', () => {
    book.toogleStatus()
    showBooks()
  })

  return checkbox
}