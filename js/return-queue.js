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

document.querySelector(".return-order-number a").textContent = data.orderId;

document.querySelector(".return-order-customer").textContent = data.customer;

document.querySelector(".return-reason").textContent =
    data.returnType === "warehouse"
        ? "📦 Niedostarczone"
        : "🔄 Zwrot od klienta";

document.querySelector(".return-shelf").textContent =
    "📍 Wózek: " + data.cartPlace;
