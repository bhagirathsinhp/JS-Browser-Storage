// 21. Utilizing Browser Storage...



// 1. Browser Storage Options...

// We have browser and a server.
// Server has server-side database and browser also has some mechanism of it's own - 
// localStorage, sessionStorage, cookies & indexedDB.
// Server stores essential & persistent data whereas browser stores temporary, 'convenience' data...

// In server we store data away from the reach of users - for eg: the list of email addresses of an app logic etc, but in browsers, the data is stored inside the users computer - the stored data can't be interacted by the devs until the user visits the page and then via JS code devs can interact with browser storage...

// It's on user-dev convenience which data is to be stored in browsers.

// For browser storage we got 3 types..
// 1. localStorage, sessionStorage
// 2. Cookies
// 3. IndexedDB

/* 
Differences between these 3...

1. localStorage, sessionStorage:
Simple key-value pairs store, like JS object we save in a file with couple of key-value pairs..
Could use this to store session Id of user, analytics key which we send to our analytics servers, etc.,
Often use local storage to manage user preferences or basic user data...
Can only tap into these with JS - only JS code that runs in the browser is able to communicate with local storage..
Can be cleared by user and via JS..
Easy to use, quite versatile but bad for storing complex data.

2. Cookies:
A relatively simple storage to localStorage, sessionStorage.
Also are key-value pairs - though we can configure them, eg: set a cookie to expire at some time in future to delete it...
Used to manage basic preferences or user-data.
Can be cleared by user and via JS.
A bit clunky to use, quite versatile, can also be sent to server, bad to store complex data.

3. IndexedDB:
It's the most sophisticated of these 3.
Client side database built into browser which we can use with a QUERY language.
Can manage complex data with it.
Can be cleared by user and via JS.
A bit clunky to use, great for complex(non-critical) data, good performance - used to build desktop level app in the browser...

*/

// IMP: Should not rely on browser storage at times as a dev cause anything can be deleted by user too.


-----------------------------------------------------------------------------------------------------------


// 2. localStorage & sessionStorage...

// LocalStorage is a great key-value pair storage.
// Now let's say we have a userId which we wanna store in local storage to attaching it to every request we sent to server to identify the user.
// FYI - all these data can be manupulated by the user so don't have to rely on it every time - here it's as the starting point.

const userId = 'u123'
// To store it in local storage we type localStorage.
// It's part of the window object.
// With . notation to it we can see couple of options - clear to clear the data. get - to get the data for a specific key if we stored some value in here. key - to have a look at key at a certain index. length - to find how many key-value pairs we store in a local storage. removeItem - to remove single item.
// Then there's setItem - to set an item - we use this...

// Set Item takes 2 parameters - 1st is the key of our choice in strings, 2nd must the value inside a string or something JS can convert to a string easily like a number...
// Here we pass in userId as the value.
localStorage.setItem('uid', userId)

// To see this we go into dev tool and into storage - all can access this not just the devs.
// In local storage we can see our data.
// We can delete the data too there.
// Every user can add data there. So never use it as single source of truth.

// We can also use this data with interaction with JS.
// We access those buttons.

const storeBtn = document.getElementById('store-btn');
const retrvBtn = document.getElementById("retrieve-btn")
// Then create EL to use the data we created...

storeBtn.addEventListener('click', () => {
  localStorage.setItem('uid', userId)
})

// In retrive btn we get the item with the key.
// We store that result as it's a synchronous action - we don't need a promise or callback here, it synchronously access the storage and gives back a data immediately...
// We use if check to see if there's an extracted id and then we console that id - and use else case to output no id extracted...
retrvBtn.addEventListener('click', () => {
  const extractedId = localStorage.getItem('uid');
  if(extractedId){console.log('Got the Id - ' + extractedId)} else {
    console.log('Couldn\'t find ID.')
  }
})

// We can also store more complex data.
// It has to be a string.
// If we have a user object.
// There'll be a problem if we store it in the local storage.

const user = {
  name: "max",
  age: 29,
  hobbies: ['Sports', "Cooking"]
}
// We set it inside the EL.
localStorage.setItem('user', user)
// In storage we see the user stored with value of [object Object]..
// We see it cause JS will convert all data into string - but here it wasn't possible so we see object Object array.
// We can convert it into JSON = cause it's actually a string.
// We can convert it into stringify.
// JSON data is a machine readable string.

localStorage.setItem('user', JSON.stringify(user));
// Now if we wanna get this data back we use parse in the retrieve btn..

const extractedUser = JSON.parse(localStorage.getItem("user"));
// Also console this - can also use if check here...
// So there we can see our data properly with this method.
// Any methods we add inside the user object would get lost - be aware of it cause they aren't encoded into JSON.
// Also we don't need to store overly complex data.

// Let's see what sessionStorage is about.
// For this we store userId with session storage as we already have on example for local storage now.
// Also extract it with session storage.
sessionStorage.setItem('uid', userId)

// We clear the last local storage data and then click store and retrieve to get the data.
// But after we close the page and open it again - local storage is there but session storage is gone.
// So sessionStorage is there as long as we have it on active tab - even if we reload the page.


------------------------------------------------------------------------------------------------------------


// 3. Getting Started with Cookies....

// We will create a new app.js file and rename this file to localstorage.js so that we still have it in reference...

// Cookies are attached to outgoing HTTP requests..
// The server needs to be prepare to do something - maybe read depends on use case - with our cookies otherwise them being added to outgoing request has no extra value..

// We focus on how we work with cookies on client side.
// We access them with document.cookie - here we console them to see anything...
console.log(document.cookie)
// In firefox I see empty strings written on console.

// There's no data on cookies here for this page cause it's not connected to server - server can set cookies with headers on their responses.
// We can change this..
// We grab our button ELs...

// In store EL - we add a new entry to the cookie.
// It will not override or clear existing cookie data but it'll add something to it..
// It will only replace the cookie which has the same key...

// Under the hood - it uses setter function which will assign a new key-value pair to the existing pairs instead of replacing the existing ones.

// Here in the entry - we pick the entry and then in cookie - we add the key and then use = sign with no space and then add the entry (value)..
storeBtn.addEventListener("click", () => {
  const userId = 'u123'
  document.cookie = `uid=${userId}`
});

// We can see our cookie in cookies option in storage in dev tools. Max's don't show that cause cookies work with page served with a real server - well I get an error on console about it but I see the cookie, be it false...
// If we create a server with serve npm we see the cookie being logged.

// To retrieve - we console the document.cookie.


-------------------------------------------------------------------------------------------------------------


// 4. Working with Cookies....

// More on Cookies Link:
// https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie

// We use user and the object data and do what we did on local storage - access it with JSON and so on..

const user = {
  name: "max",
  age: 29,
  hobbies: ['Sports', "Cooking"]
}

document.cookie(`user=${JSON.stringify(user)}`)

// But here we don't have any retrieval method like getItem and so. Here we just consoled document.cookie and it's all or nothing.
// Now the cookie that we get is one long string.
// So we can use the methods we use on strings here too.
// If we wanna split the key-value pairs in ; - we can do it..
// We get an array.

console.log(document.cookie.split(';'));

// Now if we wanna get the single value from that array we can do it..
// But inside the console - the user key-value pair has an extra whitespace on it..
// We need to get rid of it...

// We save the split in a const.
// We then access it on another stored data - we use map on it - as every array has map method available to it.  
// Map requires a function which is executed on every item of the array - here the array is just a string so we can use trim on it to get rid of access whitespace...
// Then console it...
const cookieData = document.cookie.split(';');
const data = cookieData.map(i => {
  return i.trim();
})
console.log(data)

// Now to find a specific value we have to get the value of the right side of the = sign.
// We access user index = 1, then split it with ('='), so we get to items on it - a key and a value.
// Now we can access this split array.

console.log(data[1].split("=")[1]) // this will be the user value.
// This is a bit clunky.

// But the advantage of cookies are that we can set them to expire we can also send them to server with requests..
// Since we don't have any backend we can communicate with.
// We can set an expiration date and if we don't it should expire when the session expires..
// It's up to the browser when it should delete the cookie..
// The user can also delete all the cookies...

// For expiration date - we would have 2 flags for it.
// max-age or expires...

// For max-age - we add ; and then write it...
// We set this max-age to seconds...
document.cookie = `uid=${userId}; max-age=2`
// This cookie will expire after 2 secs so if we retrieve it after 2 secs we will see an error - cause if the first cookie is gone, the index of second changes and spirals an error when showing it..
// If we retrieve it quickly - it doesn't fail but won't work like before - we'll come back to it later..

// Now we use expires..
// It takes a fixed date.
// I wrote the date for just an example, it's not a proper way I think, i dunno.
document.cookie = `uid=${userId}; expires=03-06-2023`

// We use max-age here.
// Now the problem we talked about while retrieving fastly.
// It will show the userId and not the data.
document.cookie = `uid=${userId}; max-age=360`
// Why is it showing that?
// Let's just see the cookie by consoling it.
console.log(document.cookie)
// We can see the proper data there with console - where user has the index of 0 and UID has of 1 = being after user, but why this way? It should've been first....

// The difference is because the UID cookie expired in the passed.
// User cookie is untouched.
// But the new cookie is added.
// So the implication here is that retrieving data from index number alone isn't a good idea - we should search for a key name..
// We can do this on a string with includes().

// The link to MDN above is where we could find more patterns on how we can parse data and get data out of a cookie...

// The flags that we set on a cookie are not part of it's output.


--------------------------------------------------------------------------------------------------------------


// 5. Getting Started with IndexedDB....

// Rename app.js to cookies, copy the code and remove all cookie related one.
// Create new app.js file..

// MDN LINK:
// https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB

// Here we just explore basic functionalities...
// We work with a in-browser database.
// We create a database or open a connection to one..
// We create one with indexedDB.open() - in which we pass the name of our choice(but not existing database) database and then we pass a version number.
// Here we create just a dummy one..
indexedDB.open('StorageDummy', 1);

// If the database doesn't exist - it will create one or if it exists, it will open a connection.
// This isn't promise based so we can't call THEN and get database connection object as arg.

// The open method returns a so-called request. So we store it.
const dbRequest = indexedDB.open('StorageDummy', 1);

// To dbrequest - we can add 2 Event listeners - and we can add it with either addEventListener or....
// onsuccess (which points to a function.) & onrrror.

dbRequest.onsuccess = function(){}
dbRequest.onerror = function(){}

// In both function we get access to event object.
// In onerror here we just console error but in real app - use some fallback logic...
// In onsuccess - We get access to database.
// Event.target.result is the field we can access and this will hold access to the database.

dbRequest.onsuccess = function(event){
  const db = event.target.result;
}
dbRequest.onerror = function(event){
  console.log('ERROR!')
}

// Now we can configure that database.
// IndexedDB work with tables and records like databases - but the terminology is different - it's object stores which with we work with.
// With the database we get access to we create an object store by = db.createObjectStore().
dbRequest.onsuccess = function(event){
  const db = event.target.result;
  db.createObjectStore();
}

// The function takes the couple of parameters - name of the store - products.
// We need to keep in mind that the data that we store here shouldn't be business critical or security relevant info as well as data that has to be shared with other users..
// Here th stored data should be which can get lost and which we just need to enhance user experience..
db.createObjectStore("products");

// Let's say we are storing some products.
// Every object store needs one key, one property that exists on every stored object by which this object can be identified.
// So on 2nd arg we pass a configuration object which has to have a keyPath property. 
// Here we set up that single key which every item has by which it can be identified..

db.createObjectStore('products', {keyPath: 'id'});
// Here for a product it's an ID field - it's up to us but it has to be a field which later exists once we start adding data.
// This returns access to the object store - so we can store this in a new const.

const objStore = db.createObjectStore('products', {keyPath: 'id'});

// Now we can initialize this object store - to add some intial data - depends on the app though - but here we would add.
dbRequest.onsuccess = function(event){
  const db = event.target.result;
  const objStore = db.createObjectStore('products', {keyPath: 'id'});
}

// For that we can use the objStore & there we would have a transaction property on which we have a oncomplete listener which points to a function with event object.
objStore.transaction.oncomplete = function (event){}
// In the function we can interact with db & object store.
// There we have a transaction method..
// It takes 2 arg - the name of the object store.
// And 2nd is the mode under which we wanna access this store - readonly or readwrite. Here we wanna be able to write so we use readwrite..
db.transaction('products', 'readwrite')
// On this we can call objectStore as a method and pass in the name again.

// We need to call that object store method cause we could pass in multiple object store names to the transaction and it will allow us to select a single object store. 
// This'll give us direct access to the object store..

db.transaction('products', 'readwrite').objectStore('products')

// We store this object store in a constant.

dbRequest.onsuccess = function(event){
  const db = event.target.result;
  const objStore = db.createObjectStore('products', {keyPath: 'id'});
  objStore.transaction.oncomplete = function (event){
  const productsStore = db.transaction('products', 'readwrite').objectStore('products');
  }
}

// We add a new item - a JS object - to the const.
productsStore.add()
// This object needs to have the key we mentioned on keyPath - id, then it can have any fields we want...
productsStore.add({id: 'p1', title:'A first product', price:125, tags: ['Expensive', 'Luxurious']})

dbRequest.onsuccess = function(event){
  const db = event.target.result;
  const objStore = db.createObjectStore('products', {keyPath: 'id'});
  objStore.transaction.oncomplete = function (event){
  const productsStore = db.transaction('products', 'readwrite').objectStore('products');
  productsStore.add({id: 'p1', title:'A first product', price:125, tags: ['Expensive', 'Luxurious']})
  }
}

// Now that we reload the page - we get an error.
// Error is about version change transaction on Max's chrome - in firefox it's - DOMException: A mutation operation was attempted on a database that did not allow mutations.
// But both points to the same thing.

// The onsuccess callback/function would fire when the database is successfully created - turns out to actually interact with database we need a different handler.

// onupgradeneeded - so we change on success to this..
dbRequest.onupgradeneeded = function(){};

// Now we reload and go to storage in dev tool & access indexedDB - we can see our storage dummy database.
// It says 0 object stores though...
// If we delete that and reload again - we get 1 object store - which will point to the storage dummy - which will then point to products in which we can see out key and values..

// The data stored is more structured without the use of JSON and so...
// We can store multiple such objects with ease here - all identified through their key..

// Now we wanna store something if we click the store button..


-------------------------------------------------------------------------------------------------------------


// 6. Working with IndexedDB...

// To store we move the productStore code inside storeBtn.
// There we add a new product...

storeBtn.addEventListener("click", () => {
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

// One problem we face is the database - db - we have it scoped inside a function.
// To solve it we call it globally with let..

let db;
// We can check if db isn't set with if check..
if(!db){
  return
};

storeBtn.addEventListener("click", () => {
  if(!db){
    return;
  };
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

// Now if we reload and click store - it doesn't work.
// The problem is that onupgradeneeded - we set db.
// This however doesn't always run - if we have a database where the version number didn't change - this will not rerun - it will rerun if the version number is changed...
// Onupgradeneeded will run whenever the database is created for the first time or when the version number changes.
// Now if we change the version number - we would try to recreate the object store which already exists..
// We should use version number is we changed something internally inside the database.

// Instead we need to do here is create an db with onsuccess and add - event.target.result;
dbRequest.onsuccess = function(event){
  db = event.target.result;
}
// This should run whenever the dbRequest is open or created.
// Thus we got some code here which will run whenver the script reruns, whenever the database connection is open which will then give us access to the database.
// So then the database variable would be set and we're able to work with it...

// Thus we can see the p2 product inside storage - products..

// To retrive data.
// We can go to the btn and we need access to the object store.
// On that store object - we use get method with the object's id.
retrvBtn.addEventListener("click", () => {
  const productsStore = db
    .transaction("products", "readwrite")
    .objectStore("products");

  productsStore.get('p2');
});

// This won't give the item - we gotta store that.
const request = productsStore.get('p2');
// With request object - we can add onerror & onsuccess handlers...

// But on this handler function we don't get the item as an arg instead we can get retrieve item on request object by consoling.
// There we have a result propery which will be the item we wanna retrieve..
request.onsuccess = function(){
  console.log(request.result)
}

retrvBtn.addEventListener("click", () => {
  const productsStore = db
    .transaction("products", "readwrite")
    .objectStore("products");

  const request = productsStore.get('p2');

  request.onsuccess = function(){
    console.log(request.result)
  };
});
// Now we get the result..

// IndexedDB is a bit clunky.
// That's why we have third-party libraries..
// Most importantly - idb.js...

// The links to all these are as follows:

/* 
https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB

https://github.com/jakearchibald/idb
*/


----------------------------------------------------------------------------------------------------------


More on localStorage / sessionStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

More on Cookies (in JS): https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie

More on IndexedDB: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB


