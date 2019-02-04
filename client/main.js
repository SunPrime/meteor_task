import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import Filestorage from "../imports/API/filestorage.js";

import './main.html';

//max size for file
const MAX_SIZE_FILE = 5000000;
const MAX_SIZE_FILE_PRIV = 20000000;
const isPriv = false;
const fileExtension = ['png','jpg','pdf'];

//check file size and extension
Template.fileLoader.events({
  'change .file'(event){
    let maxSizeFile     = isPriv ? MAX_SIZE_FILE_PRIV : MAX_SIZE_FILE,
        currentFile     = event.target.files[0],
        currentFileSize = currentFile.size,
        currentFileExtension =  currentFile.name.split('.')[1].toString();

    if (fileExtension.includes(currentFileExtension)){
      if (currentFileSize > maxSizeFile) {
        alert(`Size file is ${currentFileSize} B. Too large ...`);
        event.target.value = '';
      }
    } else {
      alert(`You can load file with extension ${fileExtension}`);
      event.target.value = '';
    }
  }
});

//push in db
Template.fileLoader.events({
  'submit .file'(event){
    let currentFile     = event.target.files[0],
        currentFileName = currentFile.name,
        currentFileSize = currentFile.size,
        i               = 1; //id user

    Filestorage.insert({
      id_user   : i,
      time      : new Date(),
      file_name : currentFileName,
      file_size : currentFileSize
    });

    event.target.value = '';

    i++;

    return false;
  }
});