let confirmationResult = null;
let recaptchaVerifier = null;

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


// REAL OTP SEND

async function sendOTP() {

    const mobile =
        document.getElementById("mobileNumber").value.trim();

    if (!/^[0-9]{10}$/.test(mobile)) {
        alert("Please enter a valid 10-digit mobile number.");
        return;
    }

    try {

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

        const phoneNumber = "+91" + mobile;

        confirmationResult =
            await window.signInWithPhoneNumber(
                window.firebaseAuth,
                phoneNumber,
                recaptchaVerifier
            );

        document.getElementById("otpMessage").innerText =
            "OTP sent to +91 " + mobile;

        show("otp");

        alert("✅ Real OTP sent to your mobile!");

    } catch (error) {

        console.error(error);

        alert(
            "❌ OTP could not be sent.\n\n" +
            error.message
        );

        if (recaptchaVerifier) {
            recaptchaVerifier.clear();
            recaptchaVerifier = null;
        }
    }
}


// VERIFY OTP

async function verifyOTP() {

    const otp =
        document.getElementById("otpInput").value.trim();

    if (!confirmationResult) {
        alert("Please request OTP first.");
        return;
    }

    if (!/^[0-9]{6}$/.test(otp)) {
        alert("Enter the 6-digit OTP.");
        return;
    }

    try {

        await confirmationResult.confirm(otp);

        alert("✅ Mobile number verified!");

        document.getElementById("otpInput").value = "";

        show("role");

    } catch (error) {

        console.error(error);

        alert(
            "❌ Incorrect OTP.\n\n" +
            "Please check the OTP and try again."
        );
    }
}
