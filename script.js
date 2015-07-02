var Vue = require("vue");
var marked = require("marked");
var editor = new Vue({
  el: '#editor',
  data: {
    input: '# hello',
    filename: null
  },
  filters: {
    marked: marked
  }
});

var remote = require('remote');
var Menu = remote.require('menu');
var template = [
  {
    label: 'Markdown Editor',
  },
  {
    label: 'File',
    submenu: [
      {
        label: "Open",
        click: openFileDialog
      },
      {
        label: "Save",
        click: saveFileDialog
      },
    ]
  }
]

var menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

var fs = require("fs");
var dialog = remote.require("dialog");

function openFileDialog() {
  dialog.showOpenDialog(function(filenames) {
    var filename = filenames[0];
    if (filename) {
      fs.readFile(filename, "utf8", function(err, data) {
        if (err) { throw err; }
        editor.$data.filename = filename;
        editor.$data.input = data;
      })
    }
  })
}

function saveFileDialog() {
  function save(filename) {
    fs.writeFile(filename, editor.$data.input, function(err) {
      if (err) { throw err; }
      alert("saved!");
    })
  }

  if (editor.$data.filename) {
    save(editor.$data.filename)
  } else {
    dialog.showSaveDialog(function(filename) {
      if (filename) {
        save(filename);
        editor.$data.filename = filename;
      }
    })
  }
}
