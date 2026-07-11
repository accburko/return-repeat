const data = JSON.parse(localStorage.getItem("currentReturn"));

if (data) {
    document.getElementById("orderNumber").textContent = data.orderId;
    document.getElementById("customerName").textContent = data.customer;
    document.getElementById("returnReason").textContent =
        data.returnType === "warehouse"
            ? "📦 Niedostarczone"
            : "🔄 Zwrot od klienta";

    document.getElementById("returnShelf").textContent = "📥" + data.cartPlace;
}

const checkboxes = document.querySelectorAll(".return-checkbox");

const cards = document.querySelectorAll(".action-card");

function updateActionCards() {
    const selected = document.querySelector(".return-checkbox:checked");

    cards.forEach(function (card) {
        if (selected) {
            card.classList.add("active");
        } else {
            card.classList.remove("active");
        }

        if (selected) {
            card.classList.add("active");
        } else {
            card.classList.remove("active");
        }
    });
}

checkboxes.forEach(function (box) {
    box.addEventListener("change", updateActionCards);
});

updateActionCards();

document.getElementById("repeatCard").onclick = function () {
    if (this.disabled) return;

    window.location.href = "repeat.html";
};

document.getElementById("repairCard").onclick = function () {
    if (this.disabled) return;

    alert("Przejście do naprawy");
};

document.getElementById("shippingCard").onclick = function () {
    if (this.disabled) return;

    alert("Przejście do ponownej wysyłki");
};

document.getElementById("disposeCard").onclick = function () {
    if (this.disabled) return;

    alert("Przejście do utylizacji");
};
