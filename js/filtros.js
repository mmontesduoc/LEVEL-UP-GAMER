// Espera a que el DOM cargue
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const products = document.querySelectorAll(".product-item-carro");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const category = button.getAttribute("data-category");

      products.forEach(product => {
        if (category === "all" || product.getAttribute("data-category") === category) {
          product.style.display = "block"; // mostrar
        } else {
          product.style.display = "none"; // ocultar
        }
      });
    });
  });
});
