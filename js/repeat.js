const repeatButton = document.getElementById("repeatButton");
const repeatComment = document.getElementById("repeatComment");

const checkboxes = document.querySelectorAll(".repeat-checkbox");

const repeatAllButton = document.getElementById("repeatAllButton");

const modal = document.getElementById("confirmModal");
const modalInfo = document.getElementById("modalInfo");
const selectedList = document.getElementById("selectedElementsList");

/* ===========================
   ILOŚĆ ELEMENTÓW
=========================== */

function toggleQty(checkbox) {
    const row = checkbox.closest(".repeat-product-number-details");

    const qty = row.querySelector(".repeat-qty");

    qty.disabled = !checkbox.checked;

    if (!checkbox.checked) {
        qty.value = qty.dataset.default;
    }

    updateRepeatButton();
}

/* ===========================
   AKTYWACJA PRZYCISKU
=========================== */

function updateRepeatButton() {
    const anyChecked =
        document.querySelector(".repeat-checkbox:checked") ||
        repeatAllButton.classList.contains("active");

    const commentFilled = repeatComment.value.trim().length > 0;

    if (anyChecked && commentFilled) {
        repeatButton.disabled = false;
        repeatButton.classList.add("active");
    } else {
        repeatButton.disabled = true;
        repeatButton.classList.remove("active");
    }
}

/* ===========================
   CHECKBOXY
=========================== */

checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
        toggleQty(this);
    });
});

/* ===========================
   KOMENTARZ
=========================== */

repeatComment.addEventListener("input", updateRepeatButton);

/* ===========================
   NUMER ZAMÓWIENIA
=========================== */

const params = new URLSearchParams(window.location.search);

const orderId = params.get("order");

if (orderId) {
    const orderLink = document.querySelector(".repeat-order-link");

    orderLink.textContent = orderId;

    orderLink.href = `https://panel-e.baselinker.com/orders.php#order:${orderId}`;
}

/* ===========================
   CAŁE ZAMÓWIENIE
=========================== */

repeatAllButton.addEventListener("click", function () {
    const allSelected = repeatAllButton.classList.contains("active");

    checkboxes.forEach(function (checkbox) {
        checkbox.checked = !allSelected;

        toggleQty(checkbox);
    });

    repeatAllButton.classList.toggle("active");

    updateRepeatButton();
});

/* ===========================
   OTWARCIE MODALA
=========================== */

repeatButton.addEventListener("click", openConfirmModal);

function openConfirmModal() {
    selectedList.innerHTML = "";

    const orderNumber =
        document.querySelector(".repeat-order-link").textContent;

    const allSelected = repeatAllButton.classList.contains("active");

    if (allSelected) {
        modalInfo.innerHTML = `Zostanie utworzone nowe zlecenie produkcyjne dla <b>całego zamówienia</b>.<br><br>
            Numer zamówienia: <b>${orderNumber}</b>`;

        selectedList.style.display = "none";
    } else {
        modalInfo.textContent =
            "Zostanie utworzone nowe zlecenie produkcyjne dla wybranych elementów:";

        selectedList.style.display = "block";

        document
            .querySelectorAll(".repeat-checkbox:checked")
            .forEach(function (checkbox) {
                const product = checkbox
                    .closest(".repeat-product")
                    .querySelector(".repeat-product-title").textContent;

                const row = checkbox.closest(".repeat-product-number-details");

                const qty = row.querySelector(".repeat-qty").value;

                const label = row.querySelector("label").textContent.trim();

                const element = label.replace(/^\d+\s*×\s*/, "");

                const li = document.createElement("li");

                li.textContent = `${product} — ${qty} × ${element}`;

                selectedList.appendChild(li);
            });
    }

    modal.classList.add("active");
}

/* ===========================
   MODAL
=========================== */

document
    .getElementById("cancelProduction")
    .addEventListener("click", function () {
        modal.classList.remove("active");
    });

document
    .getElementById("confirmProduction")
    .addEventListener("click", function () {

        modal.classList.remove("active");

        // Odznacz wszystkie elementy
        checkboxes.forEach(function (checkbox) {
            checkbox.checked = false;
            toggleQty(checkbox);
        });

        // Wyłącz "Całe zamówienie"
        repeatAllButton.classList.remove("active");

        // Wyczyść komentarz
        repeatComment.value = "";

        // Wyczyść listę w modalu
        selectedList.innerHTML = "";

        // Zablokuj przycisk
        updateRepeatButton();

        alert("Nowe zlecenie produkcyjne zostało utworzone.");

    });
/* ===========================
   ESC
=========================== */

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        modal.classList.remove("active");
    }
});

/* ===========================
   START
=========================== */

updateRepeatButton();
