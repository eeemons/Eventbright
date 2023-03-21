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
async function onLoaderFunc() {
  $(".seatStructure *").prop("disabled", true);
  $(".displayerBoxes *").prop("disabled", true);
  const seat = await fetch(
    "http://localhost:5000/api/client/bookAvailable/7411e4a7-5ee6-49d7-8ac8-24fe35131d3c",
    {
      method: "GET",
    }
  ).then((response) => response.json());

  // seat.seats.map((data) =>
  //   console.log("From onloader" + " " + data.seatNumber)
  // );
  // seat.seats.forEach((element) => {
  //   $(
  //     'input[type="checkbox"][class="seats"][value="' +
  //       element.seatNumber +
  //       '"]'
  //   ).prop("checked", true);
  // });
}
async function takeData() {
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
  const eventNo = $("#eventSelection :selected").val();
  const seat = await fetch(
    `http://localhost:5000/api/client/bookAvailable/${eventNo}`,
    {
      method: "GET",
    }
  ).then((response) => response.json());
  // seat.seats.map((data) =>
  //   console.log("From take data" + data.seatStatus, data.seatNumber)
  // );
  seat.seats.forEach((element) => {
    $(
      'input[type="checkbox"][class="seats"][value="' +
        element.seatNumber +
        '"]'
    ).prop("checked", true);
    $(
      'input[type="checkbox"][class="seats"][value="' +
        element.seatNumber +
        '"]'
    ).attr("disabled", true);
  });
}

async function updateTextArea() {
  const eventNo = $("#eventSelection :selected").val();
  const seat = await fetch(
    `http://localhost:5000/api/client/bookAvailable/${eventNo}`,
    {
      method: "GET",
    }
  ).then((response) => response.json());

  const databaseSeatCount = seat.seats.length;
  const actualSeatCount = Math.abs(
    $("input:checked").length - databaseSeatCount
  );
  if (actualSeatCount == $("#Numseats").val()) {
    $(".seatStructure *").prop("disabled", true);

    var allNameVals = [];
    var allNumberVals = [];
    var allSeatsVals = [];
    var allEmailVals = [];
    var allEventVals = [];
    var allPhoneVals = [];

    //Storing in Array
    allNameVals.push($("#Username").val());
    allEmailVals.push($("#Email").val());
    allNumberVals.push($("#Numseats").val());
    allPhoneVals.push($("#Phone").val());
    allEventVals.push($("#eventSelection :selected").text());
    $("#seatsBlock :checked").each(function () {
      allSeatsVals.push($(this).val());
    });

    let myArr = [];
    seat.seats.forEach((element) => {
      myArr.push(element.seatNumber);
    });

    // console.log(allSeatsVals);
    // console.log(myArr);

    let difference = allSeatsVals.filter((x) => myArr.indexOf(x) === -1);
    // console.log(difference);

    //Displaying
    $("#nameDisplay").val(allNameVals);
    $("#emailDisplay").val(allEmailVals);
    $("#NumberDisplay").val(allNumberVals);
    $("#seatsDisplay").val(difference);
    $("#eventDisplay").val(allEventVals);
    $("#phoneDisplay").val(allPhoneVals);

    var button = document.querySelector("#seat-arrange__btn-disable");
    button.disabled = false;
    button.classList.remove("seat-arrange__btn-disable");

    await fetch("http://localhost:5000/api/client/calculateSeatPrice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        seats: difference,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => $("#priceDisplay").val(data.amountPayable));
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

//payment
async function proceedToPayment() {
  const eventNo = $("#eventSelection :selected").val();
  const seat = await fetch(
    `http://localhost:5000/api/client/bookAvailable/${eventNo}`,
    {
      method: "GET",
    }
  ).then((response) => response.json());

  var allNameVals = [];
  var allNumberVals = [];
  var allSeatsVals = [];
  var allEmailVals = [];
  var allEventVals = [];
  var allPhoneVals = [];

  allNameVals.push($("#Username").val());
  allEmailVals.push($("#Email").val());
  allNumberVals.push($("#Numseats").val());
  allPhoneVals.push($("#Phone").val());
  allEventVals.push($("#eventSelection :selected").val());
  $("#seatsBlock :checked").each(function () {
    allSeatsVals.push($(this).val());
  });

  // console.log(allNameVals);
  // console.log(allNumberVals);
  // console.log(allSeatsVals);
  // console.log(allEmailVals);
  //console.log(allEventVals);

  let myArr = [];
  seat.seats.forEach((element) => {
    myArr.push(element.seatNumber);
  });

  // console.log(allSeatsVals);
  // console.log(myArr);

  let difference = allSeatsVals.filter((x) => myArr.indexOf(x) === -1);
  // console.log(difference);

  fetch("http://localhost:5000/api/client/bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      guestName: allNameVals[0],
      numberOfSeats: parseInt(allNumberVals[0]),
      seats: difference,
      guestEmail: allEmailVals[0],
      eventId: allEventVals[0],
      paymentStatus: false,
      phone: allPhoneVals[0],
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => console.log(data))
    .catch((error) => console.log("ERROR"));
}

//Admin panel code

async function adminOnloader() {
  const booking = [];
  const res = await fetch("http://localhost:5000/api/client/bookings", {
    method: "GET",
  }).then((response) => response.json());
  // console.log(res.bookings[0].event.eventName);
  res.bookings.forEach((data) => {
    // console.log(data);
    // $("#idDisplay").val(data[0].id);
    // $("#nameDisplay").val(data[0].guestName);
    // $("#seatDisplay").val(allNumberVals);
    // $("#emailDisplay").val(data[0].guestEmail);
    // $("#priceDisplay").val(data[0].amountPayable);
    booking.push(data);
  });

  booking.forEach((element) => {
    var table = document.getElementById("customers");

    var trNode = document.createElement("tr");
    // var trValue = "";

    var tdId = document.createElement("td");
    var tdName = document.createElement("td");
    var tdSeat = document.createElement("td");
    var tdEvent = document.createElement("td");
    var tdEmail = document.createElement("td");
    var tdPhone = document.createElement("td");
    var tdAmount = document.createElement("td");
    var btn1 = document.createElement("button");
    var btn2 = document.createElement("button");

    var tdIdValue = element.id;
    var tdNameValue = element.guestName;
    var tdSeatValue = element.seats;
    var tdEventValue = element.event.eventName;
    var tdEmailValue = element.guestEmail;
    var tdPhoneValue = element.phone;
    var tdAmountValue = element.amountPayable;

    // trNode.innerHTML = trValue;
    tdId.innerHTML = tdIdValue;
    tdName.innerHTML = tdNameValue;
    tdSeat.innerHTML = tdSeatValue;
    tdEvent.innerHTML = tdEventValue;
    tdEmail.innerHTML = tdEmailValue;
    tdPhone.innerHTML = tdPhoneValue;
    tdAmount.innerHTML = tdAmountValue;

    trNode.appendChild(tdId);
    trNode.appendChild(tdName);
    trNode.appendChild(tdSeat);
    trNode.appendChild(tdEvent);
    trNode.appendChild(tdEmail);
    trNode.appendChild(tdPhone);
    trNode.appendChild(tdAmount);
    trNode.appendChild(btn2);
    trNode.appendChild(btn1);

    btn1.classList.add("button");
    btn1.classList.add("button1");
    btn1.innerHTML = "&#10003;";
    btn1.addEventListener("click", approveSeatBooking);

    btn2.classList.add("button");
    btn2.classList.add("button3");
    btn2.innerHTML = "&#215;";
    btn2.addEventListener("click", denySeatBooking);

    table.appendChild(trNode);
    // document.getElementById("idDisplay").innerHTML = element.id;
    // console.log(element.id);
  });
}

async function approveSeatBooking() {
  var currentRow = $(this).closest("tr");
  var col1 = currentRow.find("td:eq(0)").text();

  var data = col1;

  fetch(`http://localhost:5000/api/client/approve/${data}`, {
    method: "PATCH",
    body: JSON.stringify({
      title: "foo",
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));

  console.log(data);

  console.log("approved");
}
function denySeatBooking() {
  var currentRow = $(this).closest("tr");
  var col1 = currentRow.find("td:eq(0)").text();

  var data = col1;

  fetch(`http://localhost:5000/api/client/bookings/${data}`, {
    method: "DELETE",
    body: JSON.stringify({
      title: "foo",
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));

  console.log(data);
  console.log("not approved");
}
