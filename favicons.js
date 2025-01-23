document.addEventListener("DOMContentLoaded", function () {
    fetch("favicons.html")
      .then((response) => response.text())
      .then((html) => {
        document.head.insertAdjacentHTML("beforeend", html);
      });
  });
  