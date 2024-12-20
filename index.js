let dataFruits = [
  {
    id: 1,
    name: "Apple",
    tags: ["red", "delicious"],
    isFavorited: true,
    expiredAt: new Date("2025-01-01"),
  },
  {
    id: 2,
    name: "Orange",
    tags: ["orange", "sour"],
    isFavorited: false,
    expiredAt: new Date("2025-01-01"),
  },
  {
    id: 3,
    name: "Grape",
    tags: ["purple", "green", "white"],
    isFavorited: false,
    expiredAt: new Date("2025-01-01"),
  },
];

const fruitsListElement = document.getElementById("fruits-list");

const addFormElement = document.getElementById("add-form");

function renderFruits(fruits) {
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get("q");

  const fruitsToDisplay = searchQuery
    ? searchFruits(fruits, searchQuery)
    : fruits;

  const fruitsLiElements = fruitsToDisplay.map((fruit) => {
    const formattedDate = new Intl.DateTimeFormat("en-UK", {
      dateStyle: "long",
      timeStyle: "short",
      timeZone: "Asia/Jakarta",
    }).format(fruit.expiredAt);

    return `
    <li>
      <div class="border border-2 p-4 rounded-md">
        <h1>${fruit.name}</h1>
        <p>Tags: ${fruit.tags.join(", ")}</p>
        <p>Is Favorited: ${fruit.isFavorited ? "✅" : "❌"}</p>
        <p>Expired At: ${formattedDate}</p>

        <div>
         <a href="/fruits/?id=${fruit.id}"
         class="bg-yellow-700 py-0.5 px-1 text-xs rounded-md text-white"
         >View</a>
        
        <button onclick="deleteFruit(${
          fruit.id
        })" class="bg-red-500 py-0.5 px-1 text-xs rounded-md text-white">Delete</button>
        </div>
      </div>
    </li>
    `;
  });

  fruitsListElement.innerHTML = fruitsLiElements.join("");
}

function renderOneFruit(fruits, fruitId) {
  const fruit = fruits.find((fruit) => {
    return fruit.id === fruitId;
  });

  if (!fruit) {
    console.log("No fruit found");
    return;
  }

  renderFruits([fruit]);
}

function searchFruits(fruits, searchQuery) {
  const searchedFruits = fruits.filter((fruit) => {
    return fruit.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (searchedFruits.length <= 0) {
    console.log("No fruits found");
    return [];
  }

  return searchedFruits;
}

function generateId(fruits) {
  return fruits[fruits.length - 1].id + 1;
}

function addFruit(fruits, newFruitInput) {
  const newFruit = {
    id: generateId(fruits),
    name: newFruitInput.name,
    tags: newFruitInput.tags || [],
    isFavorited: newFruitInput.isFavorited || false,
    expiredAt: newFruitInput.expiredAt
      ? new Date(newFruitInput.expiredAt)
      : new Date(),
  };

  const newFruits = [...fruits, newFruit];

  dataFruits = newFruits;

  renderFruits(dataFruits);
}

function deleteFruit(fruitId) {
  const filteredFruits = dataFruits.filter((fruit) => {
    return fruit.id !== fruitId;
  });

  dataFruits = filteredFruits;

  renderFruits(dataFruits);
}

function updateFruit(fruits, fruitId, updatedFruitInput) {
  const originalFruit = fruits.find((fruit) => {
    return fruit.id === fruitId;
  });

  const updatedFruit = {
    id: fruitId,
    name: updatedFruitInput.name || originalFruit.name,
    tags: updatedFruitInput.tags || originalFruit.tags,
    isFavorited: updatedFruitInput.isFavorited || originalFruit.isFavorited,
    expiredAt: new Date(updatedFruitInput.expiredAt || originalFruit.expiredAt),
  };

  const updatedFruits = fruits.map((fruit) => {
    if (fruit.id === fruitId) {
      return updatedFruit;
    }
    return fruit;
  });

  dataFruits = updatedFruits;

  renderFruits(dataFruits);
}

addFormElement.addEventListener("submit", function (event) {
  event.preventDefault();

  const addFormData = new FormData(addFormElement);

  const fruitData = {
    name: addFormData.get("name"),
  };

  console.log({ fruitData });

  addFruit(dataFruits, fruitData);
});

// READ / SHOW / RENDER / DISPLAY
renderFruits(dataFruits);

// READ ONE
// renderOneFruit(dataFruits, 2);

// ADD / CREATE
// addFruit(dataFruits, {
//   name: "Strawberry",
//   tags: ["red", "sweet"],
//   isFavorited: true,
//   expiredAt: "2026-01-01",
// });

// DELETE / REMOVE
// deleteFruit(dataFruits, 1);

// UPDATE / EDIT
// updateFruit(dataFruits, 1, {
//   name: "Strawberry",
//   isFavorited: false,
// });

// SEARCH / FILTER
// searchFruits(dataFruits, "berry");
