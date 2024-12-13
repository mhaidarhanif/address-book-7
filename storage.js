const fruits = [
  { name: "apple", price: 0.5, quantity: 10 },
  { name: "banana", price: 0.5, quantity: 5 },
  { name: "orange", price: 0.5, quantity: 3 },
  { name: "grape", price: 0.5, quantity: 2 },
];

// localStorage.setItem("storage-fruits", JSON.stringify(fruits));

const storageFruits = JSON.parse(localStorage.getItem("storage-fruits"));

console.log(storageFruits);
