var {ipcRenderer, remote} = require('electron');
var main = remote.require("./main.js");

const formEl = document.getElementById('proxyForm');
const setBtn = document.getElementById('setBtn');
const unsetBtn = document.getElementById('unsetBtn');

formEl.addEventListener(
  'submit',
  (evt) => {
    evt.preventDefault();
    iframe.src = formEl.urlField.value;
  }
);

unsetBtn.addEventListener(
  'click',
  (evt) => {
    evt.preventDefault();
    ipcRenderer.send('updateProxy');
  }
);

setBtn.addEventListener(
  'click',
  (evt) => {
    const requestURL = formEl.urlField.value;
    const proxySettings = {
      hostname: formEl.hostnameField.value,
      type: formEl.typeField.value,
      port: formEl.portField.value,
      id: formEl.idField.value,
      password: formEl.passwordField.value
    };

    evt.preventDefault();
    ipcRenderer.send('updateProxy', proxySettings, requestURL);
  }
);
