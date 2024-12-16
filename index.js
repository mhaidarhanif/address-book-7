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

function renderFruits(fruits) {
  fruits.forEach((fruit) => {
    const formattedDate = new Intl.DateTimeFormat("en-UK", {
      dateStyle: "long",
      timeStyle: "short",
      timeZone: "Asia/Jakarta",
    }).format(fruit.expiredAt);

    const fruitLiElement = document.createElement("li");

    fruitLiElement.innerHTML = `
    <div class="border border-2 p-4 rounded-md">
    <h1>${fruit.name}</h1>
    <p>Tags: ${fruit.tags.join(", ")}</p>
    <p>Is Favorited: ${fruit.isFavorited ? "✅" : "❌"}</p>
    <p>Expired At: ${formattedDate}</p>
    </div>
    `;

    fruitsListElement.appendChild(fruitLiElement);
  });
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

function searchFruits(fruits, searchTerm) {
  const searchedFruits = fruits.filter((fruit) => {
    return fruit.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (searchedFruits.length <= 0) {
    console.log("No fruits found");
    return;
  }

  renderFruits(searchedFruits);
}

function generateId(fruits) {
  return fruits[fruits.length - 1].id + 1;
}

function addFruit(fruits, newFruitInput) {
  const newFruit = {
    id: generateId(fruits),
    name: newFruitInput.name,
    tags: newFruitInput.tags,
    isFavorited: newFruitInput.isFavorited,
    expiredAt: new Date(newFruitInput.expiredAt),
  };

  const newFruits = [...fruits, newFruit];

  dataFruits = newFruits;

  renderFruits(dataFruits);
}

function deleteFruit(fruits, fruitId) {
  const filteredFruits = fruits.filter((fruit) => {
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
