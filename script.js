const library = []
const modal = document.querySelector('#addBookModal')
const form = document.querySelector('form')

function Book(title, author, pages, readed) {
  this.title = title
  this.author = author
  this.pages = pages
  this.readed = readed
}

Book.prototype.info = function() {
  const readedMsg = readed ? 'already read' : 'not read yet'
  return `${this.title} by ${this.author}, ${this.pages} pages, ${readedMsg}`
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read)
  library.push(newBook)
}

function showBooks() {
  const body = document.querySelector('#libraryTable tbody')
  body.innerHTML = ''

  library.forEach(book => {
    const row = document.createElement('tr')

    for (const key in book) {
      if (Object.prototype.hasOwnProperty.call(book, key)) {
        let value = book[key]

        if (typeof value === 'boolean') {
          value = value ? 'Read' : 'Not read'
        }

        const cell = document.createElement('td')
        cell.textContent = value
        row.appendChild(cell)
      }
    }

    body.appendChild(row)
  })
}

function validateForm(e) {
  e.preventDefault()
  const formIsValid = form.checkValidity()
  
  if (formIsValid) {
    const bookInfo = Array.from(document.querySelectorAll('input')).map(
      input => input.type === 'checkbox' ? input.checked : input.value
    )

    addBookToLibrary(...bookInfo)
    showBooks()
    form.reset()
    modal.close()
  }
}

document.querySelector('#showModalBtn').addEventListener('click', modal.showModal.bind(modal))
document.querySelector('#closeModalBtn').addEventListener('click', modal.close.bind(modal))
form.addEventListener('submit', validateForm)

addBookToLibrary('1984', 'George Orwell', '328', true);
addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', '281', false);
addBookToLibrary('The Great Gatsby', 'F. Scott Fitzgerald', '180', true);
addBookToLibrary('Pride and Prejudice', 'Jane Austen', '279', false);
addBookToLibrary('Moby Dick', 'Herman Melville', '635', true);

showBooks()