"use strict"
Array.prototype.remove = function (i) {
    this.splice(i, 1);
}

Array.prototype.removeAll = function (i) {
    this.splice(0);
}
var ninja = {};
ninja.array = [];
ninja.Item = function (name, ninja) {
    this.name = name,
    this.ninja = ninja
};

ninja.Image = function () {
    this.image = image
};


//Create
ninja.create = function () {
    var name = document.getElementById("name").value;
    var turtle = document.getElementById("turtle").value;
    
    var item = new ninja.Item(name, turtle);

    var request = new XMLHttpRequest();
    request.open('POST', 'https://ninjaturtles5.firebaseio.com/.json');

    if (item){
        request.send(JSON.stringify(item));
    }

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.response);

            item.id = data.name;
            ninja.array.push(item);
            ninja.display();
        }
       else {
            console.log('create error: ' + request.status);
        }
        request.onerror = function () {
            console.log('create error ' + request.status);
        }
    }
}

//Read
ninja.read = function () {
    var request = new XMLHttpRequest();
    request.open('GET', 'https://ninjaturtles5.firebaseio.com/.json')
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.response);
            for (var key in data) {
                var item = data[key];
                item.id = key;
                ninja.array.push(item);
            }
            ninja.display();
            
            

        }
    }
    request.send();
}

ninja.display = function () {
    var holder = "";
    holder += "<table class='table table-bordered table-striped'>";
    holder += "<tr>";
    holder += "<th>Name</th><th>Favorite Turtle</th><th>Edit</th><th>Delete</th><th>Remove All</th>";
    holder += "</tr>";
    var items = ninja.array;
    var list = items.sort(function (a, b) {
  if (a.name > b.name) {
    return 1;
  }
  if (a.name < b.name) {
    return -1;
  }
  return 0;
});
    for (var i = 0; i < list.length; i++) {
        holder += "<tr>";
        holder += "<td>" + ninja.array[i].name + "</td>";
        holder += "<td>" + ninja.array[i].ninja + "</td>";
        holder += "<td><button class='btn btn-warning' onclick='ninja.edit(" + i + ")'>Edit</button></td>";
        holder += "<td><button class='btn btn-danger' onclick='ninja.remove(" + i + ");'>Delete</button></td>";
        holder += "<td><button class='btn btn-info btn-large' onclick='ninja.removeAll(" + i + ")'>Remove All</button></td>"
        holder += "</tr>";
    }
    holder += "</table>";
    document.getElementById("table").innerHTML = holder;
}
ninja.read();

ninja.edit = function (i) {
    var item = ninja.array[i];
    document.getElementById("submit").className = "hidden";
    document.getElementById("save").className = "btn btn-info";
    document.getElementById("name").value = item.name;
    document.getElementById("turtle").value = item.ninja;
    this.currentEdit = i;
}

ninja.save = function () {
    var item = ninja.array[this.currentEdit];
    item.name = document.getElementById("name").value;
    item.ninja = document.getElementById("turtle").value;
    
    var request = new XMLHttpRequest();
    request.open('PUT', 'https://ninjaturtles5.firebaseio.com/' + item.id + '.json');

    request.onload = function (value) {
        if (request.status >= 200 && request.status < 400) {
            document.getElementById("submit").className = "btn btn-success";
            document.getElementById("save").className = "hidden";
            ninja.display();
       }
    }
    request.error = function () {

    }
    request.send(JSON.stringify(item));
}

ninja.remove = function (i) {
    var item = this.array[i];
    var request = new XMLHttpRequest();
    request.open('DELETE', 'https://ninjaturtles5.firebaseio.com/' + item.id + '.json');
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            ninja.array.remove(i);
            ninja.display();
        }
        request.error = function () {

        }
        
    }
    request.send();
}

ninja.removeAll = function (i) {
    var item = this.array[i];
    var request = new XMLHttpRequest();
    request.open('DELETE', 'https://ninjaturtles5.firebaseio.com/' + item.id + '.json');
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            ninja.array.removeAll(i);
            ninja.display();
        }
        request.error = function () {

        }

    }
    request.send();
}
