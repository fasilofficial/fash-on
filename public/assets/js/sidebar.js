document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("toggle-btn");
    const targetElement = document.getElementById("body");

    button.addEventListener("click", function () {
        targetElement.classList.toggle('aside-mini', true)
    });
});