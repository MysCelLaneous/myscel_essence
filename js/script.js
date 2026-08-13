const productSelect = document.getElementById("product");
const quantitySelect = document.getElementById("quantity");
const totalDisplay = document.getElementById("total");

const regularFragrance = document.getElementById("regularFragrance");
const mixMatchOptions = document.getElementById("mixMatchOptions");

const scentCards = document.querySelectorAll(".scent-card");
const scentDisplayName = document.getElementById("scentDisplayName");
const scentDisplayDescription = document.getElementById(
  "scentDisplayDescription"
);
const scentDisplay = document.querySelector(".scent-display");

function updateTotal() {
  if (!productSelect.value) {
    totalDisplay.textContent = "$0";
    return;
  }

  const price = Number(productSelect.value);
  const quantity = Number(quantitySelect.value);

  totalDisplay.textContent = "$" + price * quantity;
}

function toggleMixMatch() {
  const isMixMatch = productSelect.value === "12";

  if (isMixMatch) {
    regularFragrance.hidden = true;
    mixMatchOptions.hidden = false;
  } else {
    regularFragrance.hidden = false;
    mixMatchOptions.hidden = true;
  }
}

productSelect.addEventListener("change", () => {
  updateTotal();
  toggleMixMatch();
});

quantitySelect.addEventListener("change", updateTotal);

scentCards.forEach(card => {
  card.addEventListener("click", () => {
    const scentName = card.dataset.scent;
    const scentDescription = card.dataset.description;
    const isMobile = window.innerWidth <= 800;

    scentDisplayName.textContent = scentName;
    scentDisplayDescription.textContent = scentDescription;

    if (isMobile) {
      card.insertAdjacentElement("afterend", scentDisplay);
    }
  });
});

toggleMixMatch();
updateTotal();
