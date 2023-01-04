const button = document.getElementById("button");
const hello = document.getElementById("hello");

button.addEventListener("click", () => {
  hello.textContent = `Toi ten la NTD`;
  hello.style.color = "red";
});
