// SCREEN NAVIGATION
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


// ADD CROP
function addCrop() {

    const crop = document.getElementById("cropName").value;
    const quantity = document.getElementById("quantity").value;
    const price = document.getElementById("expectedPrice").value;

    if (quantity === "" || price === "") {
        alert("Please enter quantity and expected price.");
        return;
    }

    alert(
        "✅ Produce Listed Successfully!\n\n" +
        "Crop: " + crop + "\n" +
        "Quantity: " + quantity + " kg\n" +
        "Expected Price: ₹" + price + "/kg"
    );

    show("farmer");
}


// HOLD CROP
function holdCrop() {

    alert(
        "🟢 HOLD PLAN ACTIVATED!\n\n" +
        "Tomato will be held for 3 days.\n\n" +
        "Current Price: ₹20/kg\n" +
        "Expected Price: ₹25/kg\n\n" +
        "Potential additional return: ₹500"
    );

    show("farmer");
}


// SELL CROP
function sellCrop() {

    alert(
        "💰 PRODUCE MARKED FOR SALE!\n\n" +
        "Tomato: 100 kg\n" +
        "Selling Price: ₹20/kg\n" +
        "Expected Revenue: ₹2,000"
    );

    show("farmer");
}


// JOIN POWER POOL
function joinPool() {

    alert(
        "👥 POWER POOL JOINED!\n\n" +
        "Your Quantity: 100 kg\n" +
        "Pool Quantity: 500 kg\n" +
        "Buyer Demand: 450 kg\n\n" +
        "🎯 Demand Match: 90%"
    );
}


// BUY PRODUCT
function buyProduct(product) {

    document.getElementById("orderProduct").innerText = product;

    show("order");
}
