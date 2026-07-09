const repeatButton = document.getElementById("repeatButton");
const checkboxes = document.querySelectorAll(".repeat-checkbox");
const modal = document.getElementById("confirmModal");
const selectedList = document.getElementById("selectedElementsList");
const modalInfo = document.getElementById("modalInfo");

repeatButton.addEventListener("click", openConfirmModal);

function toggleQty(checkbox) {
    const row = checkbox.closest(".repeat-product-number-details");

    const qty = row.querySelector(".repeat-qty");

    qty.disabled = !checkbox.checked;

    if (!checkbox.checked) {
        qty.value = qty.dataset.default;
    }

    updateRepeatButton();
}

function updateRepeatButton() {
    const checked = document.querySelectorAll(".repeat-checkbox:checked");

    if (checked.length > 0) {
        repeatButton.disabled = false;
        repeatButton.classList.add("active");
    } else {
        repeatButton.disabled = true;
        repeatButton.classList.remove("active");
    }
}

checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
        toggleQty(this);
    });
});

const params = new URLSearchParams(window.location.search);

const orderId = params.get("order");

if (orderId) {
    const orderLink = document.querySelector(".repeat-order-link");

    orderLink.textContent = orderId;

    orderLink.href = `https://panel-e.baselinker.com/orders.php#order:${orderId}`;
}

updateRepeatButton();
const repeatAllButton = document.getElementById("repeatAllButton");

repeatAllButton.addEventListener("click", function () {
    const allSelected = repeatAllButton.classList.contains("active");

    checkboxes.forEach(function (checkbox) {
        checkbox.checked = !allSelected;

        toggleQty(checkbox);
    });

    if (allSelected) {
        repeatAllButton.classList.remove("active");
    } else {
        repeatAllButton.classList.add("active");
    }

    updateRepeatButton();
});
function openConfirmModal() {
    selectedList.innerHTML = "";

    const orderNumber =
        document.querySelector(".repeat-order-link").textContent;

    const allSelected = document
        .getElementById("repeatAllButton")
        .classList.contains("active");

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
document
    .getElementById("cancelProduction")
    .addEventListener("click", function () {
        modal.classList.remove("active");
    });
document
    .getElementById("confirmProduction")
    .addEventListener("click", function () {
        modal.classList.remove("active");

        alert("Nowe zlecenie produkcyjne zostało utworzone.");
    });
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeCartModal();
    }
});
