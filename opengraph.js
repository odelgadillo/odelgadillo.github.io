document.addEventListener("DOMContentLoaded", function () {
    fetch("opengraph.html")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error al cargar OpenGraph: ${response.status}`);
            }
            return response.text();
        })
        .then((html) => {
            // Insertar los metadatos en el <head>
            document.head.insertAdjacentHTML("beforeend", html);

            // Establecer dinámicamente el valor de og:url
            const ogUrlMeta = document.querySelector('meta[property="og:url"]');
            if (ogUrlMeta) {
                ogUrlMeta.setAttribute("content", window.location.origin + window.location.pathname);
            }
        })
        .catch((error) => {
            console.error("Error al cargar los metadatos de OpenGraph:", error);
        });
});
