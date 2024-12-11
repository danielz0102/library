const library = []

function Book(title, author, pages, readed) {
  this.title = title
  this.author = author
  this.pages = pages
  this.readed = readed

  this.info = () => {
    const readedMsg = readed ? 'already read' : 'not read yet'
    return `${this.title} by ${this.author}, ${this.pages} pages, ${readedMsg}`
  }
}

function addBookToLibrary(title, author, pages, readed) {
  const newBook = new Book(title, author, pages, readed)
  library.push(newBook)
}

addBookToLibrary('The Hobbit', 'Tolkien', '295', false)
console.log(library)