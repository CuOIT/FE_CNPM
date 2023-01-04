
function changeColorText() {
    let name = "Nam"
    const hello = document.getElementsByTagName("h1")[0]
    if (hello.classList.contains("red")) {
        hello.classList.remove("red")
        hello.innerText = "Hello World"
    } else {
        hello.innerText = "Xin chào " + name
        hello.classList.add("red")
    }
}