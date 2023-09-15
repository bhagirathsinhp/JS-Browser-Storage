const storeBtn = document.getElementById("store-btn");
const retrvBtn = document.getElementById("retrieve-btn");

let db;
const dbRequest = indexedDB.open("StorageDummy", 1);

dbRequest.onsuccess = function (event) {
  db = event.target.result;
};

dbRequest.onupgradeneeded = function (event) {
  db = event.target.result;
  const objStore = db.createObjectStore("products", { keyPath: "id" });
  objStore.transaction.oncomplete = function (event) {
    const productsStore = db
      .transaction("products", "readwrite")
      .objectStore("products");

    productsStore.add({
      id: "p1",
      title: "A first Product",
      price: 125,
      tags: ["Expensive", "Luxurious"],
    });
  };
};

dbRequest.onerror = function (event) {
  console.log("ERROR!");
};

storeBtn.addEventListener("click", () => {
  if (!db) {
    return;
  }
  const productsStore = db
    .transaction("products", "readwrite")
    .objectStore("products");

  productsStore.add({
    id: "p2",
    title: "A Second Product",
    price: 115,
    tags: ["In Budget", "Value for Money"],
  });
});

retrvBtn.addEventListener("click", () => {
  const productsStore = db
    .transaction("products", "readwrite")
    .objectStore("products");

  const request = productsStore.get("p2");

  request.onsuccess = function () {
    console.log(request.result);
  };
});
