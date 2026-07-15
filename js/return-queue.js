// tylko do prezentacji
if (localStorage.getItem("currentReturn")) {
    const tmp = JSON.parse(localStorage.getItem("currentReturn"));

    tmp.status = "";
    tmp.statusName = "";
    tmp.repairComment = "";

    localStorage.setItem("currentReturn", JSON.stringify(tmp));
}

/* =========================
   DANE
========================= */

const returnData = JSON.parse(localStorage.getItem("currentReturn"));

const repeatCard = document.getElementById("repeatCard");
const repairCard = document.getElementById("repairCard");
const shippingCard = document.getElementById("shippingCard");
const disposeCard = document.getElementById("disposeCard");

const repairPanel = document.getElementById("repairPanel");
const repairComment = document.getElementById("repairComment");
const finishRepairButton = document.getElementById("finishRepairButton");

const decisionType = document.getElementById("decisionType");
const decisionComment = document.getElementById("decisionComment");

const checkboxes = document.querySelectorAll(".return-checkbox");
const cards = document.querySelectorAll(".action-card");

/* =========================
   NAGŁÓWEK
========================= */

if (returnData) {
    orderNumber.textContent = returnData.orderId;
    customerName.textContent = returnData.customer;

    returnReason.textContent =
        returnData.returnType === "warehouse"
            ? "📦 Niedostarczone"
            : "🔄 Zwrot od klienta";

    returnShelf.textContent = "📥 " + returnData.cartPlace;

    decisionType.textContent = returnData.statusName || "Oczekiwanie";

    decisionComment.value = returnData.comment || "";
}
if (!returnData.status) {
    decisionType.textContent = "🟡 Oczekiwanie";
    decisionType.className = "decision-type waiting";
}

/* =========================
   AKTYWACJA KAFELKÓW
========================= */

function updateCards() {
    if (returnData && returnData.status) return;

    const selected = document.querySelector(".return-checkbox:checked");

    cards.forEach((card) => {
        if (selected) {
            card.classList.add("active");
        } else {
            card.classList.remove("active");
        }
    });
}

checkboxes.forEach((box) => box.addEventListener("change", updateCards));

updateCards();

/* =========================
   NIEDOSTARCZONE
========================= */

if (returnData && returnData.returnType === "warehouse") {
    repeatCard.classList.add("disabled");
    repairCard.classList.add("disabled");

    repeatCard.classList.remove("active");
    repairCard.classList.remove("active");
}

/* =========================
   PONOWNA PRODUKCJA
========================= */

repeatCard.addEventListener("click", () => {
    if (!repeatCard.classList.contains("active")) return;

    window.location.href = "repeat.html";
});

/* =========================
   NAPRAWA
========================= */

repairCard.addEventListener("click", () => {
    if (!repairCard.classList.contains("active")) return;

    repairPanel.classList.add("show");
});

repairComment.addEventListener("input", () => {
    const ok = repairComment.value.trim().length > 0;

    finishRepairButton.disabled = !ok;
    finishRepairButton.classList.toggle("active", ok);
});

finishRepairButton.addEventListener("click", () => {
    returnData.status = "repair";
    returnData.statusName = "🔧 Naprawa";
    returnData.comment = repairComment.value.trim();

    localStorage.setItem("currentReturn", JSON.stringify(returnData));

    decisionType.textContent = returnData.statusName;
    decisionType.className = "decision-type repair";
    decisionComment.value = returnData.comment;

    document.getElementById("repairModal").classList.remove("active");
});

/* =========================
   PONOWNA WYSYŁKA
========================= */

shippingCard.addEventListener("click", () => {
    if (!shippingCard.classList.contains("active")) return;

    returnData.status = "shipping";
    decisionType.className = "decision-type shipping";
    returnData.statusName = "📦 Ponowna wysyłka";

    returnData.comment = decisionComment.value;

    localStorage.setItem("currentReturn", JSON.stringify(returnData));

    decisionType.textContent = returnData.statusName;

    lockReturn();

    alert("Zamówienie zostało przeniesione do kolejki Pakowanie");
});

/* =========================
   UTYLIZACJA
========================= */

disposeCard.addEventListener("click", () => {
    if (!disposeCard.classList.contains("active")) return;

    returnData.status = "dispose";
    returnData.statusName = "🗑 Utylizacja";
    returnData.comment = decisionComment.value;

    localStorage.setItem("currentReturn", JSON.stringify(returnData));

    decisionType.textContent = returnData.statusName;

    lockReturn();

    alert("Zamówienie przekazane do utylizacji");
});

/* =========================
   MODAL NAPRAWY
========================= */

document.getElementById("closeRepairModal").addEventListener("click", () => {
    document.getElementById("repairModal").classList.remove("active");

    lockReturn();

    alert("Zamówienie zostało przekazane do naprawy");
});

/* =========================
   BLOKADA PO DECYZJI
========================= */

function lockReturn() {
    checkboxes.forEach((box) => {
        box.disabled = true;
    });

    cards.forEach((card) => {
        card.classList.remove("active");
        card.classList.add("disabled");
    });

    decisionComment.disabled = true;

    if (repairComment) {
        repairComment.disabled = true;
    }

    if (finishRepairButton) {
        finishRepairButton.disabled = true;
    }
}

/* =========================
   PO ODCZYTANIU STATUSU
========================= */

if (returnData && returnData.status) {
    lockReturn();
}
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        document.getElementById("repairModal").classList.remove("active");
    }
});
const repairModal = document.getElementById("repairModal");

repairModal.addEventListener("click", function (e) {
    if (e.target === repairModal) {
        repairModal.classList.remove("active");
    }
});
function lockReturn() {
    document.querySelectorAll(".return-checkbox").forEach((cb) => {
        cb.checked = false;
        cb.disabled = true;
    });

    document.querySelectorAll(".action-card").forEach((card) => {
        card.classList.remove("active");
        card.classList.add("disabled");
        card.style.pointerEvents = "none";
    });

    if (repairComment) {
        repairComment.disabled = true;
    }

    if (finishRepairButton) {
        finishRepairButton.disabled = true;
    }

    const decisionComment = document.getElementById("decisionComment");

    if (decisionComment) {
        decisionComment.disabled = true;
    }
}
