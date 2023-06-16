function closeNavigation() {
    document.getElementById("container").classList.remove("container-open")
    document.getElementById("header").classList.remove("header-open")
    document.getElementById("nav-panel").classList.remove("nav-panel-open")
    document.getElementById("row").classList.remove("row-open")
    document.getElementById("cover").classList.remove("cover-open")
}
function openNavigation() {
    document.getElementById("container").classList.add("container-open")
    document.getElementById("header").classList.add("header-open")
    document.getElementById("nav-panel").classList.add("nav-panel-open")
    document.getElementById("row").classList.add("row-open")
    document.getElementById("cover").classList.add("cover-open")
};
