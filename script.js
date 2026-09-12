let myCrop = {
    name: "Tomato",
    quantity: 100,
    price: 27
};


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

    updateDashboard();

    window.scrollTo(0, 0);
}


// ADD PRODUCE

function addCrop() {

    const crop = document.getElementById("cropName").value;
    const quantity = document.getElementById("quantity").value;
    const price = document.getElementById("expectedPrice").value;
    const harvest = document.getElementById("harvestDate").value;

    if (quantity === "" || price === "") {

        alert("⚠️ Please enter quantity and expected price.");

        return;
    }

    myCrop.name = crop;
    myCrop.quantity = Number(quantity);
    myCrop.price = Number(price);

    document.getElementById("addedProduce").innerHTML = `
        <div class="produce-success">

            <h3>✅ Produce Listed Successfully</h3>

            <p>🌱 Crop: <b>${crop}</b></p>

            <p>📦 Quantity: <b>${quantity} kg</b></p>

            <p>💰 Expected Price: <b>₹${price}/kg</b></p>

            <p>📅 Harvest Date: <b>${harvest || "Not selected"}</b></p>

            <p>🟢 Status: <b>Available</b></p>

        </div>
    `;

    updateDashboard();

    alert("✅ Your produce has been listed!");

    show("farmer");
}


// UPDATE DASHBOARD

function updateDashboard() {

    const quantity = document.getElementById("dashboardQuantity");
    const earnings = document.getElementById("dashboardEarnings");

    const decisionCrop = document.getElementById("decisionCrop");
    const decisionQuantity = document.getElementById("decisionQuantity");

    const poolQuantity = document.getElementById("poolYourQuantity");
    const totalPool = document.getElementById("totalPool");

    if (quantity) {
        quantity.innerText = myCrop.quantity + " kg";
    }

    if (earnings) {
        earnings.innerText =
            "₹" + (myCrop.quantity * myCrop.price);
    }

    if (decisionCrop) {
        decisionCrop.innerText = myCrop.name;
    }

    if (decisionQuantity) {
        decisionQuantity.innerText =
            myCrop.quantity + " kg available";
    }

    if (poolQuantity) {
        poolQuantity.innerText =
            myCrop.quantity + " kg";
    }

    if (totalPool) {
        totalPool.innerText =
            (myCrop.quantity + 400) + " kg";
    }
}


// HOLD

function holdCrop() {

    const extraReturn =
        myCrop.quantity * 5;

    alert(
        "🟢 HOLD PLAN ACTIVATED!\n\n" +

        myCrop.name +
        ": " +
        myCrop.quantity +
        " kg\n\n" +

        "Current Price: ₹20/kg\n" +

        "Expected Price: ₹25/kg\n\n" +

        "Potential additional return: ₹" +
        extraReturn
    );

    show("farmer");
}


// SELL

function sellCrop() {

    const revenue =
        myCrop.quantity * 20;

    alert(
        "💰 PRODUCE MARKED FOR SALE!\n\n" +

        myCrop.name +
        ": " +
        myCrop.quantity +
        " kg\n\n" +

        "Selling Price: ₹20/kg\n" +

        "Expected Revenue: ₹" +
        revenue
    );

    show("farmer");
}


// POWER POOL

function joinPool() {

    const total =
        myCrop.quantity + 400;

    document.getElementById("poolStatus").innerHTML = `
        <div class="pool-success">

            <b>✅ You joined the Power Pool!</b>

            <p>Your contribution:
            <b>${myCrop.quantity} kg</b></p>

            <p>Total pool:
            <b>${total} kg</b></p>

            <p>Buyer demand:
            <b>450 kg</b></p>

            <p>🎯 Demand match: <b>90%</b></p>

        </div>
    `;

    alert("👥 Successfully joined the Farmer Power Pool!");
}


// BUY PRODUCT

function buyProduct(product) {

    const orderProduct =
        document.getElementById("orderProduct");

    const orderTotal =
        document.getElementById("orderTotal");

    if (orderProduct) {
        orderProduct.innerText = product;
    }

    if (orderTotal) {

        if (product === "Tomato") {
            orderTotal.innerText = "₹30";
        }

        if (product === "Onion") {
            orderTotal.innerText = "₹32";
        }
    }

    show("order");
}
