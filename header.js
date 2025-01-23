document.addEventListener("DOMContentLoaded", function () {
    fetch("header.html")
        .then((response) => response.text())
        .then((html) => {
            document.getElementById("header").innerHTML = html;
        });
});