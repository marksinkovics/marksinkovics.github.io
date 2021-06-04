function page(urlString) {
    const url = new URL(urlString);
    const components = url.pathname.split('/');
    return components[1];
}

function setActive() {
    linkObj = document.getElementById('nav-panel').getElementsByTagName('a');
    path = document.location.href;
    for (i = 0; i < linkObj.length; i++) {
        if (page(document.location.href) === page(linkObj[i].href)) {
            linkObj[i].classList.add("active");
        }
    }
}
window.onload = setActive;
