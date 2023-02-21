// Your web app's Firebase configuration
let firebaseConfig = {
  apiKey: "AIzaSyAoEkJf8XnyVtXL19qjMphoyrym467VOdk",
  authDomain: "attendance-app-6977b.firebaseapp.com",
  databaseURL: "https://attendance-app-6977b-default-rtdb.firebaseio.com",
  projectId: "attendance-app-6977b",
  storageBucket: "attendance-app-6977b.appspot.com",
  messagingSenderId: "1026881952219",
  appId: "1:1026881952219:web:df0cce5fb7bae93ceceffe",
  measurementId: "G-93NQ2EDEKD",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// gloval variables
const lamp1 = document.getElementById("lamp1");
const lamp2 = document.getElementById("lamp2");
const cont1 = document.getElementById("cont1");
const cont2 = document.getElementById("cont2");

// events
cont1.addEventListener("click", function () {
  Lamp1();
  Lamp1S();
});
cont2.addEventListener("click", function () {
  Lamp2();
  Lamp2S();
});

// set interval esp-connect
let conEsp;
setInterval(checkConn, 11000);

function checkConn() {
  firebase
    .database()
    .ref()
    .on("value", function (snap) {
      conEsp = snap.val().conEsp;
    });
  if (conEsp == true) {
    document.querySelector(
      ".espCon"
    ).innerHTML = `<i class="fa-solid fa-wifi"></i>
                <h5 >connected</h5>`;
    document.querySelector(".espCon").style.color = "#49bf4e";
    firebase.database().ref("conEsp").set(false);
  } else {
    document.querySelector(
      ".espCon"
    ).innerHTML = `<i class="fa-solid fa-rotate"></i>
                <h5>connecting</h5>`;
    document.querySelector(".espCon").style.color = "red";
  }
}

setInterval(function () {
  firebase
    .database()
    .ref()
    .on("value", function (snap) {
      l1V = snap.val().l1;
    });
  firebase
    .database()
    .ref()
    .on("value", function (snap) {
      l2V = snap.val().l2;
    });
  Lamp1S();
  Lamp2S();
}, 50);

// main functions
let l1V;
let l2V;

function Lamp1() {
  firebase
    .database()
    .ref()
    .on("value", function (snap) {
      l1V = snap.val().l1;
    });
  l1V === 1
    ? firebase.database().ref("l1").set(0)
    : firebase.database().ref("l1").set(1);
}

function Lamp1S() {
  if (l1V === 0) {
    lamp1.classList = "fa-regular fa-lightbulb";
    cont1.style.backgroundColor = "#ed143d5e";
  }
  if (l1V === 1) {
    lamp1.classList = "fa-solid fa-lightbulb";
    cont1.style.backgroundColor = "#8fbc8f80";
  }
}

function Lamp2() {
  firebase
    .database()
    .ref()
    .on("value", function (snap) {
      l2V = snap.val().l2;
    });
  l2V === 1
    ? firebase.database().ref("l2").set(0)
    : firebase.database().ref("l2").set(1);
}

function Lamp2S() {
  if (l2V === 1) {
    lamp2.classList = "fa-solid fa-star";
    cont2.style.backgroundColor = "#8fbc8f80";
  }
  if (l2V === 0) {
    lamp2.classList = "fa-regular fa-star";
    cont2.style.backgroundColor = "#ed143d5e";
  }
}

// post method
const baseUrl = "https://ziadaboalmajd.github.io/sHome1/Lmp";
const res = await fetch(baseUrl, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ l1: 1 }),
});

/*
setInterval(function () {
  if (conEsp == true) {
    document.querySelector(
      ".espCon"
    ).innerHTML = `<i class="fa-solid fa-wifi"></i>
                <h5 >connected</h5>`;
    document.querySelector(".espCon").style.color = "#49bf4e";
  } else {
    document.querySelector(
      ".espCon"
    ).innerHTML = `<i class="fa-solid fa-rotate"></i>
                <h5>connecting</h5>`;
    document.querySelector(".espCon").style.color = "red";
  }
}, 5000);


function checkConn() {
  firebase
    .database()
    .ref()
    .on("value", function (snap) {
      conEsp = snap.val().conEsp;
    });
  if (conEsp == true) {
    firebase.database().ref("conEsp").set(false);
  }
}
*/
