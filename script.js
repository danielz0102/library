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

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, true)
console.log(theHobbit.info())