const storeBtn = document.getElementById("store-btn");
const retrvBtn = document.getElementById("retrieve-btn");

const userId = "u123";
const user = {
  name: "max",
  age: 29,
  hobbies: ["Sports", "Cooking"],
};

// localStorage.setItem("uid", userId);
sessionStorage.setItem("uid", userId);

storeBtn.addEventListener("click", () => {
  localStorage.setItem("uid", userId);
  localStorage.setItem("user", JSON.stringify(user));
});

retrvBtn.addEventListener("click", () => {
  // const extractedId = localStorage.getItem("uid");
  const extractedId = sessionStorage.getItem("uid");
  if (extractedId) {
    console.log("Got the Id - " + extractedId);
  } else {
    console.log("Couldn't find ID.");
  }
  const extractedUser = JSON.parse(localStorage.getItem("user"));
  console.log(extractedUser);
});
