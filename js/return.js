const returnButton = document.getElementById("returnButton");

const confirmPlaceButton = document.getElementById("confirmPlaceButton");

const selectedPlaceText = document.getElementById("selectedPlace");

const cartModal = document.getElementById("cartModal");

const returnTypes = document.querySelectorAll("input[name='returnType']");

let selectedPlace = "";

/* ===========================
   OTWIERANIE / ZAMYKANIE MODALA
=========================== */

function openCartModal() {
    const typeSelected = document.querySelector(
        "input[name='returnType']:checked",
    );

    if (!typeSelected) {
        alert("Najpierw wybierz rodzaj zwrotu, a następnie miejsce na wózku.");

        return;
    }

    cartModal.classList.add("show");
}

function closeCartModal() {
    cartModal.classList.remove("show");
}

/* ===========================
   WYBÓR MIEJSCA
=========================== */

document.querySelectorAll(".cart-place").forEach(function (button) {
    if (button.disabled) {
        return;
    }

    button.addEventListener("click", function () {
        document.querySelectorAll(".cart-place").forEach(function (place) {
            place.classList.remove("selected");
        });

        this.classList.add("selected");

        selectedPlace = this.dataset.place;

        confirmPlaceButton.disabled = false;
    });
});

/* ===========================
   ZATWIERDZENIE MIEJSCA
=========================== */

confirmPlaceButton.addEventListener("click", function () {
    selectedPlaceText.textContent = "Wybrane miejsce: " + selectedPlace;

    closeCartModal();

    updateButton();
});

/* ===========================
   WYBÓR RODZAJU ZWROTU
=========================== */

returnTypes.forEach(function (radio) {
    radio.addEventListener("change", updateButton);
});

/* ===========================
   AKTYWACJA PRZYCISKU
=========================== */

function updateButton() {
    const typeSelected = document.querySelector(
        "input[name='returnType']:checked",
    );

    if (typeSelected && selectedPlace !== "") {
        returnButton.disabled = false;

        returnButton.classList.add("active");
    } else {
        returnButton.disabled = true;

        returnButton.classList.remove("active");
    }
}

/* ===========================
   REJESTRACJA ZWROTU
=========================== */

returnButton.addEventListener("click", function () {
    const type = document.querySelector(
        "input[name='returnType']:checked",
    ).value;

    const typeName =
        type === "warehouse" ? "Niedostarczone" : "Zwrot od klienta";

    alert(
        "Zwrot został zarejestrowany.\n\n" +
            "Rodzaj: " +
            typeName +
            "\n" +
            "Miejsce: " +
            selectedPlace,
    );
});
cartModal.addEventListener("click", function (event) {
    if (event.target === this) {
        closeCartModal();
    }
});
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeCartModal();
    }
});
