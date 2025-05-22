// src/utils/storage.js
export function getProducts() {
  return JSON.parse(localStorage.getItem("products") || "[]");
}

export function saveProducts(list) {
  localStorage.setItem("products", JSON.stringify(list));
}
