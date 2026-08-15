const productSelect = document.getElementById("product");
const quantitySelect = document.getElementById("quantity");
const totalDisplay = document.getElementById("total");

const regularFragrance = document.getElementById("regularFragrance");
const mixMatchOptions = document.getElementById("mixMatchOptions");

const bundleQuantity = document.getElementById("bundleQuantity");
const bundleSelections = document.getElementById("bundleSelections");

const scentCards = document.querySelectorAll(".scent-card");
const scentDisplay = document.querySelector(".scent-display");
const scentDisplayName = document.getElementById("scentDisplayName");
const scentDisplayDescription = document.getElementById(
  "scentDisplayDescription"
);

/* =========================================
   SCENT OPTIONS
========================================= */

const scents = [
  "Kande Krush",
  "TropiSoul",
  "Velour Kiss",
  "Silk Aura",
  "Black Reserve",
  "Savage",
  "Mfalme",
  "Safi Breeze",
  "Ion Drift"
];

/* =========================================
   TOTAL
========================================= */

function updateTotal() {
  if (!productSelect.value) {
    totalDisplay.textContent = "$0";
    return;
  }

  const price = Number(productSelect.value);

  if (price === 12) {
    const bundles = Number(bundleQuantity.value || 1);
    totalDisplay.textContent = "$" + price * bundles;
  } else {
    const quantity = Number(quantitySelect.value || 1);
    totalDisplay.textContent = "$" + price * quantity;
  }
}

/* =========================================
   BUILD MIX & MATCH BUNDLES
========================================= */

function createScentSelect(bundleNumber, scentNumber) {
  const select = document.createElement("select");

  select.name = `Bundle ${bundleNumber} - Scent ${scentNumber}`;
  select.required = true;

  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = `Scent ${scentNumber}`;
  select.appendChild(placeholder);

  scents.forEach(scent => {
    const option = document.createElement("option");
    option.value = scent;
    option.textContent = scent;
    select.appendChild(option);
  });

  return select;
}

function generateBundles() {
  const numberOfBundles = Number(bundleQuantity.value || 1);

  bundleSelections.innerHTML = "";

  for (let bundle = 1; bundle <= numberOfBundles; bundle++) {
    const bundleGroup = document.createElement("div");
    bundleGroup.className = "mix-match-bundle";

    const bundleTitle = document.createElement("strong");
    bundleTitle.className = "bundle-title";
    bundleTitle.textContent = `Bundle ${bundle}`;

    const bundleGrid = document.createElement("div");
    bundleGrid.className = "mix-match-grid";

    for (let scentNumber = 1; scentNumber <= 3; scentNumber++) {
      bundleGrid.appendChild(
        createScentSelect(bundle, scentNumber)
      );
    }

    bundleGroup.appendChild(bundleTitle);
    bundleGroup.appendChild(bundleGrid);

    bundleSelections.appendChild(bundleGroup);
  }

  updateTotal();
}

/* =========================================
   MIX & MATCH TOGGLE
========================================= */

function toggleMixMatch() {
  const isMixMatch = productSelect.value === "12";

 const quantityField = quantitySelect.parentElement;

  if (isMixMatch) {
    regularFragrance.hidden = true;
    regularFragrance.disabled = true;

    mixMatchOptions.hidden = false;

    quantityField.style.display = "none";
    quantitySelect.disabled = true;

    generateBundles();
  } else {
    regularFragrance.hidden = false;
    regularFragrance.disabled = false;

    mixMatchOptions.hidden = true;

    quantityField.style.display = "";
    quantitySelect.disabled = false;

    bundleSelections.innerHTML = "";
  }

  updateTotal();
}

/* =========================================
   PRODUCT / QUANTITY EVENTS
========================================= */

productSelect.addEventListener("change", () => {
  toggleMixMatch();
  updateTotal();
});

quantitySelect.addEventListener("change", updateTotal);

bundleQuantity.addEventListener("change", () => {
  generateBundles();
  updateTotal();
});

/* =========================================
   SCENT DESCRIPTION
========================================= */

const scentDisplayOriginalParent = scentDisplay.parentNode;
const scentDisplayOriginalNextSibling = scentDisplay.nextSibling;

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

/* Put scent description back in desktop position if screen expands */

window.addEventListener("resize", () => {
  if (window.innerWidth > 800) {
    if (scentDisplayOriginalNextSibling) {
      scentDisplayOriginalParent.insertBefore(
        scentDisplay,
        scentDisplayOriginalNextSibling
      );
    } else {
      scentDisplayOriginalParent.appendChild(scentDisplay);
    }
  }
});

/* =========================================
   INITIALIZE
========================================= */

toggleMixMatch();
updateTotal();
