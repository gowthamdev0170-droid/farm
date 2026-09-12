let myCrop = {
    name: "Tomato",
    quantity: 100,
    price: 27
};

function show(screenId) {
    const screens = document.querySelectorAll(".screen");

    screens.forEach(function(screen) {
        screen.classList.remove("active");
    });

    const selected = document.getElementById(screenId);

    if (selected) {
        selected.classList.add("active");
    }

    window.scrollTo(0, 0);
}


// ADD PRODUCE
function addCrop() {

    const crop = document.getElementById("cropName").value;
    const quantity = document.getElementById("quantity").value;
    const price = document.getElementById("expectedPrice").value;

    if (quantity === "" || price === "") {
        alert("Please enter quantity and expected price.");
        return;
    }

    myCrop.name = crop;
    myCrop.quantity = Number(quantity);
    myCrop.price = Number(price);

    alert(
        "✅ Produce Listed Successfully!\n\n" +
        crop + " - " + quantity + " kg\n" +
        "Expected Price: ₹" + price + "/kg"
    );

    updateFarmerDashboard();

    show("farmer");
}


// UPDATE FARMER DASHBOARD
function updateFarmerDashboard() {

    const cropTitle = document.querySelector("#farmer .card h3");
    const paragraphs = document.querySelectorAll("#farmer .card p");

    if (cropTitle) {
        cropTitle.innerText = "🌱 " + myCrop.name;
    }

    if (paragraphs.length >= 2) {
        paragraphs[0].innerHTML =
            "Available: <b>" + myCrop.quantity + " kg</b>";

        paragraphs[1].innerHTML =
            "Fair Price: <b>₹" + myCrop.price + "/kg</b>";
    }
}


// HOLD
function holdCrop() {

    alert(
        "🟢 HOLD PLAN ACTIVATED!\n\n" +
        myCrop.name + ": " + myCrop.quantity + " kg\n" +
        "Current Price: ₹20/kg\n" +
        "Expected Price: ₹25/kg\n\n" +
        "Potential additional return: ₹500"
    );

    show("farmer");
}


// SELL
function sellCrop() {

    const revenue = myCrop.quantity * 20;

    alert(
        "💰 PRODUCE MARKED FOR SALE!\n\n" +
        myCrop.name + ": " + myCrop.quantity + " kg\n" +
        "Selling Price: ₹20/kg\n" +
        "Expected Revenue: ₹" + revenue
    );

    show("farmer");
}


// POWER POOL
function joinPool() {

    alert(
        "👥 POWER POOL JOINED!\n\n" +
        "Your Quantity: " + myCrop.quantity + " kg\n" +
        "Nearby Farmers: 400 kg\n" +
        "Total Pool: " + (myCrop.quantity + 400) + " kg\n" +
        "Buyer Demand: 450 kg\n\n" +
        "🎯 Demand Match: 90%"
    );
}


// BUY
function buyProduct(product) {

    const orderProduct = document.getElementById("orderProduct");

    if (orderProduct) {
        orderProduct.innerText = product;
    }

    show("order");
}
