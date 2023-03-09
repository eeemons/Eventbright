function openNav() {
  var element = document.getElementById("links_toggle");
  element.classList.add("display-toggle");
}

//counter code starts
const add = document.querySelector("#add"),
  minus = document.querySelector("#minus"),
  number = document.querySelector("#number");

let count = 0;
number.innerText = count;

const printNumber = () => {
  if (count < 0) {
    count = 0;
  }
  number.innerText = count;
};

const handleAdd = () => {
  count = count + 1;
  printNumber();
};

const handleMinus = () => {
  count = count - 1;
  printNumber();
};

add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);
//counter code ends

//seat arrangement starts
function onLoaderFunc() {
  $(".seatStructure *").prop("disabled", true);
  $(".displayerBoxes *").prop("disabled", true);
}
function takeData() {
  if ($("#Username").val().length < 0 || $("#Numseats").val().length < 0) {
    alert("Please enter a positive seat number");
  }
  if ($("#Username").val().length == 0 || $("#Numseats").val().length == 0) {
    alert("Please Enter your Name and Number of Seats");
  } else {
    $(".inputForm *").prop("disabled", true);
    $(".seatStructure *").prop("disabled", false);
    document.getElementById("notification").innerHTML =
      "<b style='margin-bottom:0px;background:yellow;'>Please Select your Seats NOW!</b>";
  }
}

function updateTextArea() {
  if ($("input:checked").length == $("#Numseats").val()) {
    $(".seatStructure *").prop("disabled", true);

    var allNameVals = [];
    var allNumberVals = [];
    var allSeatsVals = [];

    //Storing in Array
    allNameVals.push($("#Username").val());
    allNumberVals.push($("#Numseats").val());
    $("#seatsBlock :checked").each(function () {
      allSeatsVals.push($(this).val());
    });

    //Displaying
    $("#nameDisplay").val(allNameVals);
    $("#NumberDisplay").val(allNumberVals);
    $("#seatsDisplay").val(allSeatsVals);
  } else {
    alert("Please select " + $("#Numseats").val() + " seats");
  }
}

function myFunction() {
  alert($("input:checked").length);
}

/*
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
*/

$(":checkbox").click(function () {
  if ($("input:checked").length == $("#Numseats").val()) {
    $(":checkbox").prop("disabled", true);
    $(":checked").prop("disabled", false);
  } else {
    $(":checkbox").prop("disabled", false);
  }
});
//seat arrangement ends
