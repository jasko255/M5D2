import express from "express";

import fs from "fs";

import path, { dirname } from "path";

import { fileURLToPath } from "url";

import uniqid from "uniqid";

const fileName = fileURLToPath(import.meta.url);

const dir = dirname(fileName);

const authorsFilePath = path.join(dir, "authors.json");

const authorsRouter = express.Router();

// read get  http://localhost:3001/authors/
authorsRouter.get("/", (req, res) => {
  const fileAsBuffer = fs.readFileSync(authorsFilePath);
  const fileAsString = fileAsBuffer.toString();
  const fileAsJSON = JSON.parse(fileAsString);
  res.send(fileAsJSON);
});

// read get  http://localhost:3001/authors/:id
authorsRouter.get("/:id", (req, res) => {
  const fileAsBuffer = fs.readFileSync(authorsFilePath);
  const fileAsString = fileAsBuffer.toString();
  const fileAsJSONArray = JSON.parse(fileAsString);

  const author = fileAsJSONArray.find((author) => author.id === req.params.id);
  if (!author) {
    res
      .status(404)
      .send({ message: `Author with ${req.params.id} is not found!` });
  }
  res.send(author);
});

// create post  http://localhost:3001/authors/
authorsRouter.post("/", (req, res) => {
  const { name, surname, email, dateOfBirth } = req.body;
  const author = {
    id: uniqid(),
    name,
    surname,
    email,
    dateOfBirth,
    avatar: `https://ui-avatars.com/api/?name=${name}+${surname}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const fileAsBuffer = fs.readFileSync(authorsFilePath);
  const fileAsString = fileAsBuffer.toString();
  const fileAsJSONArray = JSON.parse(fileAsString);
  fileAsJSONArray.push(author);
  fs.writeFileSync(authorsFilePath, JSON.stringify(fileAsJSONArray));
  res.send(author);
});

// update put  http://localhost:3001/authors/:id
authorsRouter.put("/:id", (req, res) => {
    const fileAsBuffer = fs.readFileSync(authorsFilePath);
  const fileAsString = fileAsBuffer.toString();
  let fileAsJSONArray = JSON.parse(fileAsString);

  const authorIndex = fileAsJSONArray.findIndex((author) => author.id === req.params.id);
  if (!authorIndex == -1) {
    res
      .status(404)
      .send({ message: `Author with ${req.params.id} is not found!` });
  }
  const previousAuthorData = fileAsJSONArray[authorIndex]
  const changedAuthor = {...previousAuthorData, ...req.body, updatedAt: new Date(), id: req.params.id}
  fileAsJSONArray[authorIndex] = changedAuthor
   fs.writeFileSync(authorsFilePath, JSON.stringify(fileAsJSONArray));
   res.send(changedAuthor)
  res.send("hello im the update author end");
});

// delete delete  http://localhost:3001/authors/:id
authorsRouter.delete("/:id", (req, res) => {
  const fileAsBuffer = fs.readFileSync(authorsFilePath);
  const fileAsString = fileAsBuffer.toString();
  let fileAsJSONArray = JSON.parse(fileAsString);

  const author = fileAsJSONArray.find((author) => author.id === req.params.id);
  if (!author) {
    res
      .status(404)
      .send({ message: `Author with ${req.params.id} is not found!` });
  }
  fileAsJSONArray = fileAsJSONArray.filter((author) => author.id !== req.params.id)
   fs.writeFileSync(authorsFilePath, JSON.stringify(fileAsJSONArray));
   res.status(204).send()
  
});

export default authorsRouter;
