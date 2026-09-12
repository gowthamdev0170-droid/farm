function show(screenId) {

    let screens = document.querySelectorAll(".screen");

    screens.forEach(function(screen) {
        screen.classList.remove("active");
    });

    document.getElementById(screenId).classList.add("active");

    window.scrollTo(0, 0);
}
