const express = require("express")
const { findById } = require("../models/book")
const app = express()
const bookModel = require('../models/book')

//GET ALL BOOKS DATA
app.get("/books", async (req, res) => {
  const books = await bookModel.find({})
  try{
    res.send(books)
  } catch(error) {
    res.status(500).send(error)
  }
})

// ...

app.post("/books", async (request, response) => {
  const books = new bookModel(request.body);

  try {
    await books.save();
    response.send(books);
  } catch (error) {
    response.status(500).send(error);
  }

})

app.get("/books/:id", async (request, response) => {
  

  try {
    const book = await bookModel.findById(request.params.id)
    if (book) {
      return response.status(200).json({book})
    }
      return response.status(404).send('Book with specified ID does not exists')
    }catch(error) {
    response.status(500).send(error);
  }
})

// ...
module.exports = app