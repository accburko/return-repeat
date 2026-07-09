const returnButton = document.getElementById("returnButton");
const confirmPlaceButton = document.getElementById("confirmPlaceButton");
const selectedPlaceText = document.getElementById("selectedPlace");
const cartModal = document.getElementById("cartModal");
const successModal = document.getElementById("successModal");

const returnTypes = document.querySelectorAll("input[name='returnType']");

let selectedPlace = "";

/* ==========================
   OTWIERANIE / ZAMYKANIE MODALA
========================== */

function openCartModal() {
    const typeSelected = document.querySelector(
        "input[name='returnType']:checked",
    );

    if (!typeSelected) {
        alert("Najpierw wybierz rodzaj zwrotu.");
        return;
    }

    cartModal.classList.add("show");
}

function closeCartModal() {
    cartModal.classList.remove("show");
}

/* ==========================
   WYBÓR MIEJSCA
========================== */

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

/* ==========================
   ZATWIERDZENIE MIEJSCA
========================== */

confirmPlaceButton.addEventListener("click", function () {
    selectedPlaceText.textContent = "Wybrane miejsce: " + selectedPlace;

    closeCartModal();

    updateButton();
});

/* ==========================
   WYBÓR RODZAJU ZWROTU
========================== */

returnTypes.forEach(function (radio) {
    radio.addEventListener("change", updateButton);
});

/* ==========================
   AKTYWACJA PRZYCISKU
========================== */

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

/* ==========================
   REJESTRACJA ZWROTU
========================== */

returnButton.addEventListener("click", function () {
    const type = document.querySelector(
        "input[name='returnType']:checked",
    ).value;

    const typeName =
        type === "warehouse" ? "Niedostarczone" : "Zwrot od klienta";
    const returnData = {
        orderId: "149386991",
        customer: "Thomas Kriz ISI Kriz Samland GbR (DE)",
        returnType: type,
        cartPlace: selectedPlace,
        status: "waiting",
    };

    localStorage.setItem("currentReturn", JSON.stringify(returnData));

    document.getElementById("successType").textContent = typeName;

    document.getElementById("successPlace").textContent = selectedPlace;

    successModal.classList.add("show");
});

/* ==========================
   ZAMYKANIE MODALI
========================== */

function closeSuccessModal() {
    successModal.classList.remove("show");
}

function goToReturnsQueue() {
    window.location.href = "return-queue.html";
}

/* Kliknięcie poza modal */

cartModal.addEventListener("click", function (event) {
    if (event.target === cartModal) {
        closeCartModal();
    }
});

successModal.addEventListener("click", function (event) {
    if (event.target === successModal) {
        closeSuccessModal();
    }
});

/* ESC */

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeCartModal();
        closeSuccessModal();
    }
});
