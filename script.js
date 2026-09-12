// ===============================
// FARMSYNC - SCRIPT.JS
// ===============================

let confirmationResult = null;
let recaptchaVerifier = null;


// ===============================
// SCREEN NAVIGATION
// ===============================

function show(screenId) {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    const screen = document.getElementById(screenId);

    if (screen) {
        screen.classList.add("active");
    }

    window.scrollTo(0, 0);
}


// ===============================
// SEND REAL OTP
// ===============================

async function sendOTP() {

    const mobileInput =
        document.getElementById("mobileNumber");

    const mobile =
        mobileInput.value.trim();


    if (!/^[0-9]{10}$/.test(mobile)) {

        alert(
            "Please enter a valid 10-digit mobile number."
        );

        return;
    }


    try {

        // Create Firebase reCAPTCHA
        if (!recaptchaVerifier) {

            recaptchaVerifier =
                new window.RecaptchaVerifier(
                    window.firebaseAuth,
                    "recaptcha-container",
                    {
                        size: "normal"
                    }
                );
        }


        const phoneNumber =
            "+91" + mobile;


        // Send REAL SMS OTP
        confirmationResult =
            await window.signInWithPhoneNumber(
                window.firebaseAuth,
                phoneNumber,
                recaptchaVerifier
            );


        document.getElementById(
            "otpMessage"
        ).innerText =
            "OTP sent to +91 " + mobile;


        show("otp");


        alert(
            "✅ OTP sent successfully!"
        );

    }

    catch (error) {

        console.error(error);


        alert(
            "❌ OTP sending failed.\n\n" +
            error.message
        );


        // Reset reCAPTCHA

        if (recaptchaVerifier) {

            recaptchaVerifier.clear();

            recaptchaVerifier = null;
        }
    }
}


// ===============================
// VERIFY OTP
// ===============================

async function verifyOTP() {

    const otpInput =
        document.getElementById("otpInput");

    const otp =
        otpInput.value.trim();


    if (!confirmationResult) {

        alert(
            "Please send OTP first."
        );

        return;
    }


    if (!/^[0-9]{6}$/.test(otp)) {

        alert(
            "Please enter the 6-digit OTP."
        );

        return;
    }


    try {

        await confirmationResult.confirm(otp);


        alert(
            "✅ Mobile number verified successfully!"
        );


        otpInput.value = "";


        // Go to role selection

        show("role");

    }

    catch (error) {

        console.error(error);


        alert(
            "❌ Incorrect OTP.\n\n" +
            "Please check the OTP and try again."
        );
    }
}


// ===============================
// LOGOUT
// ===============================

function logout() {

    confirmationResult = null;

    show("login");
}


// ===============================
// ADD CROP
// ===============================

function addCrop() {

    const crop =
        document.getElementById("cropName").value;

    const quantity =
        parseFloat(
            document.getElementById("quantity").value
        );

    const price =
        parseFloat(
            document.getElementById("expectedPrice").value
        );

    const harvestDate =
        document.getElementById("harvestDate").value;


    if (!quantity || quantity <= 0) {

        alert(
            "Please enter crop quantity."
        );

        return;
    }


    if (!price || price <= 0) {

        alert(
            "Please enter expected price."
        );

        return;
    }


    const earnings =
        quantity * price;


    // Update dashboard

    const dashboardQuantity =
        document.getElementById(
            "dashboardQuantity"
        );

    const dashboardEarnings =
        document.getElementById(
            "dashboardEarnings"
        );


    if (dashboardQuantity) {

        dashboardQuantity.innerText =
            quantity + " kg";
    }


    if (dashboardEarnings) {

        dashboardEarnings.innerText =
            "₹" + earnings.toLocaleString("en-IN");
    }


    // Update decision page

    const decisionCrop =
        document.getElementById(
            "decisionCrop"
        );

    const decisionQuantity =
        document.getElementById(
            "decisionQuantity"
        );


    if (decisionCrop) {

        decisionCrop.innerText =
            crop;
    }


    if (decisionQuantity) {

        decisionQuantity.innerText =
            quantity + " kg available";
    }


    // Update Power Pool

    const poolQuantity =
        document.getElementById(
            "poolYourQuantity"
        );

    const totalPool =
        document.getElementById(
            "totalPool"
        );


    if (poolQuantity) {

        poolQuantity.innerText =
            quantity + " kg";
    }


    if (totalPool) {

        totalPool.innerText =
            (quantity + 400) + " kg";
    }


    // Show success

    const result =
        document.getElementById(
            "addedProduce"
        );


    result.innerHTML = `

        <div class="success-box">

            <h3>
                ✅ Produce Listed Successfully
            </h3>

            <p>
                <b>Crop:</b> ${crop}
            </p>

            <p>
                <b>Quantity:</b> ${quantity} kg
            </p>

            <p>
                <b>Expected Price:</b> ₹${price}/kg
            </p>

            ${
                harvestDate
                ? `<p><b>Harvest:</b> ${harvestDate}</p>`
                : ""
            }

            <p>
                <b>Expected Earnings:</b>
                ₹${earnings.toLocaleString("en-IN")}
            </p>

        </div>

    `;


    alert(
        "🌱 Your produce has been listed!"
    );
}


// ===============================
// JOIN POWER POOL
// ===============================

function joinPool() {

    const status =
        document.getElementById(
            "poolStatus"
        );


    status.innerHTML = `

        <div class="success-box">

            <h3>
                ✅ Joined Power Pool!
            </h3>

            <p>
                Your produce is now combined
                with nearby farmers.
            </p>

            <p>
                🎯 Buyer demand matched successfully.
            </p>

        </div>

    `;


    alert(
        "👥 You joined the Farmer Power Pool!"
    );
}


// ===============================
// HOLD CROP
// ===============================

function holdCrop() {

    alert(
        "🟢 Produce added to 3-day HOLD plan!"
    );
}


// ===============================
// SELL CROP
// ===============================

function sellCrop() {

    alert(
        "💰 Produce marked for SELL NOW!"
    );
}


// ===============================
// BUY PRODUCT
// ===============================

function buyProduct(product, price) {

    const orderProduct =
        document.getElementById(
            "orderProduct"
        );

    const orderTotal =
        document.getElementById(
            "orderTotal"
        );


    if (orderProduct) {

        orderProduct.innerText =
            product;
    }


    if (orderTotal) {

        orderTotal.innerText =
            "₹" + price;
    }


    show("order");
}
