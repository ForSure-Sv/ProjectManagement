/* eslint-disable promise/always-return */
//import { response } from "express";

/* eslint-disable eqeqeq */
window.onload = function () {
  initApp();
};

function initApp() {

  // Set the configuration for your app
  // TODO: Replace with your project's config object

  var config = {
    apiKey: "AIzaSyDwIvIUQ02UrYTeJ_H96jW49NaQkXMTBVc",
    authDomain: "projectmanagement-612b8.firebaseapp.com",
    databaseURL: "https://projectmanagement-612b8.firebaseio.com/",
    projectId: "projectmanagement-612b8",

  };
  firebase.initializeApp(config);
 
  function addRowHandlers() {
    var table = document.getElementById("tableBody");
    var rows = table.getElementsByTagName("tr");
    for (i = 0; i < rows.length; i++) {
      var currentRow = table.rows[i];
      var createClickHandler =
        function (row) {
          return function () {
            var modal = document.getElementById("myModal");
            var modal2 = document.getElementById("modalUnits");
            var modal3 = document.getElementById("modalOrder");
            var span = document.getElementsByClassName("close")[0];
            var bd = row.getElementsByTagName("button")[0];
            
            span.onclick = function () {
              modal.style.display = "none";
            }
            window.onclick = function (event) {
              if (event.target == modal) {
                modal.style.display = "none";

              }
            }
            modal.style.display = "block";
            modal2.style.display = "block";
            modal3.style.display = "none";
            fillInformation(row.getElementsByTagName("a"), row.getElementsByTagName("img"), bd.value);
          };

        };

        currentRow.onclick = createClickHandler(currentRow);
    }
  }

  addRowHandlers();
  changeToCurrectField();
  setToMin();

  function fillInformation(id, imageArray, uid) {
    document.getElementById("locationModal").value = id[0].innerHTML;
    document.getElementById("roomzModal").value = id[1].innerHTML;
    document.getElementById("priceModal").value = id[2].innerHTML;
    document.getElementById("ratingModal").value = id[3].innerHTML;
    document.getElementById("ownerNameModal").value = id[4].innerHTML;
    document.getElementById("startDateModal").value = id[5].innerHTML;
    document.getElementById("minDateModal").value = id[6].innerHTML;
    document.getElementById("endDateModal").value = id[7].innerHTML;
    document.getElementById("phoneNumberModal").value = id[8].innerHTML;
    document.getElementById("descriptionModal").value = id[10].innerHTML;
    var numberOfImages = Number(id[11].innerHTML);
    var nameAtrc = id[12].innerHTML.split(',');
    var atrcPrice = id[13].innerHTML.split(',');
    var s = "";
    for(var i=0;i<nameAtrc.length;i++){
         s += nameAtrc[i] +', ' +atrcPrice[i]+'\n'; 
    }
    document.getElementById("nameNpriceAtrcModal").value = s;

    console.log("img length in: " + imageArray.length);
    const divImage = document.getElementById("imageContainer");
    divImage.innerHTML ="";
    const divAtrc = document.getElementById("atrcContainer");
    divAtrc.innerHTML ="";
    for ( i = 1; i < numberOfImages+1; i++) {
      divImage.innerHTML += '<img src ="' + imageArray[i].src +'" style="margin:10px;" width ="200px" height="200px">';
    }
    for ( i = numberOfImages+1; i < imageArray.length; i++) {
      
      divAtrc.innerHTML += '<img src ="' + imageArray[i].src +'" style="margin:10px;" width ="200px" height="200px">';
    }

    document.getElementById("orderRef").href = "/api/order/" + uid;

  }

}


export function changeToCurrectField() {
  var d = document.getElementById("fromFilter");
  while (d.length > 0) {
    console.log("removed");
    d.remove(d.length - 1);
  }
  var d2 = document.getElementById("toFilter");
  while (d2.length > 0) {
    console.log("removed");
    d2.remove(d2.length - 1);
  }
  var x = document.getElementById("filter").selectedIndex;
  if (x == 0) {
    for (index = 1; index < 12; index++) {
      var sel = document.getElementById("fromFilter");
      newOption = document.createElement("option");
      newOptionVal = document.createTextNode((index * 500));
      newOption.appendChild(newOptionVal);
      sel.insertBefore(newOption, sel.lastChild);
    }
  } else {
    for (index = 1; index < 9; index++) {
      var sel2 = document.getElementById("fromFilter");
      newOption = document.createElement("option");
      newOptionVal = document.createTextNode(index);
      newOption.appendChild(newOptionVal);
      sel2.insertBefore(newOption, sel2.lastChild);
    }
  }
}

function setToMin() {
  var d = document.getElementById("toFilter");
  while (d.length > 0) {
    console.log("removed");
    d.remove(d.length - 1);
  }
  var x = document.getElementById("filter").selectedIndex;
  index = document.getElementById("fromFilter").selectedIndex + 1;
  if (x == 0) {
    for (index; index < 12; index++) {
      var sel = document.getElementById("toFilter");
      newOption = document.createElement("option");
      newOptionVal = document.createTextNode((index * 500));
      newOption.appendChild(newOptionVal);
      sel.insertBefore(newOption, sel.lastChild);
    }
  } else {
    for (index; index < 9; index++) {
      var sel2 = document.getElementById("toFilter");
      newOption = document.createElement("option");
      newOptionVal = document.createTextNode(index);
      newOption.appendChild(newOptionVal);
      sel2.insertBefore(newOption, sel2.lastChild);
    }
  }
}

function sendRequestToServer(jsonInfo) {
  var sss = document.getElementById("tableBody");
  fetch("/api/requestUSort", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "CSRF-Token": Cookies.get("XSRF-TOKEN"),
    },
    body: JSON.stringify(jsonInfo),
  })
    .then(response => response.json())
    .then(function (resJ) {
      sss.innerHTML = "";
      for (var i = 0; i < resJ.data.length; i++) {
        var obj = resJ.data[i];
        try {
          var d=new Date(0);
          
          var sDate =new Date(obj.data.startDate._seconds *1000);
          var eDate =new Date(obj.data.endDate._seconds *1000);
          var mDate =new Date(obj.data.minDate._seconds *1000);


          sss.innerHTML += '<tr> ' +
            '<td><a href="#">' + obj.data.location + '</a></td>' +
            '<td><a href="#">' + obj.data.rooms + '</a></td>' +
            '<td><a href="#">' + obj.data.price + '</a></td>' +
            '<td><a href="#">' + obj.data.rating + '</a></td>' +
            '<td><a href="#">' + obj.data.ownerName + '</a></td>' +
            '<td><a href="#">' + sDate.toISOString().split('T')[0]  + '</a></td>' +
            '<td><a href="#">' + mDate.toISOString().split('T')[0]  + '</a></td>' +
            '<td><a href="#">' + eDate.toISOString().split('T')[0]  + '</a></td>' +
            '<td><a href="#">' + obj.data.phoneNumber + '</a></td>' +
            '<td><a href="#">' + obj.data.description + '</a></td>' +
            '<td style="display:none;"><button value='+ obj.id +'> </button></td>'+
            '<td><a href="#"><img src="' + hasImg(obj.data.hasPictures.length) + '"></a></td>';

            sss.innerHTML+= '</tr>';

        }
        catch (error) {
          console.log(error);
        }
      }
      addRowHandlers();
      searchFunction();
    }).catch(function (error) {
      console.log('data error');
    });
}
function hasImg(val) {
  if (val > 0)
    return "https://firebasestorage.googleapis.com/v0/b/projectmanagement-612b8.appspot.com/o/icons%2Fcompact_camera.png?alt=media&token=e23f870d-4f38-4e92-a4fb-d3eddffd65da";
  return "";
}


function closeWindow() {
  var modal = document.getElementById("myModal");
  var modal2 = document.getElementById("modalUnits");
  var modal3 = document.getElementById("modalOrder");
  modal.style.display = "none";
  modal2.style.display = "none";
  modal3.style.display = "none";

}

function searchFunction() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("tableBody");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("a");
    tr[i].style.display = "none";
    for (var j = 0; j < td.length; j++) {
      if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
        continue;
      }
    }
  }
}


function paymentWindow(x) {
  fetch("/api/order/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "CSRF-Token": Cookies.get("XSRF-TOKEN"),
    },
    body: JSON.stringify({}),
  })
    .then(response => response.json())
    .then(function (resJ) {

    }).catch(function (error) {
      console.log('data error');
    });

}

var sortUpOrDown = 'desc';
function sortUp(columnName) {
  sortUpOrDown = 'desc';
  window.location.href = '/api/requestUSort/'+'sort'+'/'+columnName+'/'+'desc'+'/'+'0';

}

function sortDown(columnName) {
  sortUpOrDown = 'inc';
  window.location.href = '/api/requestUSort/'+'sort'+'/'+columnName+'/'+'asc'+'/'+'0';

}

function sendData() {
  var fromFilter, toFilter, searchData;
  searchData = document.getElementById("myInput").value;
  fromFilter = document.getElementById("fromFilter").value;
  toFilter = document.getElementById("toFilter").value;
  columnName = (document.getElementById("filter").selectedIndex == 0) ? "price" : "rooms";
  console.log(searchData + " " + fromFilter + " " + toFilter + " " + columnName);
  window.location.href = '/api/requestUSort/'+'filter'+'/'+columnName+'/'+fromFilter+'/'+toFilter;
}
