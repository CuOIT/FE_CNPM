const btn1 = document.getElementById("button1")
const p1 = document.getElementById("p1") 

let state = 1
let content1 = "Hello World"
let content2 = "Tôi tên là Quân!" 
console.log(1);
btn1.addEventListener("click",fire)

function fire()
{
    if(state == 1)
    {
        state = 2
        p1.innerText = content2
        p1.style.color = "red"
    }
    else
    {
        state = 1
        p1.innerText = content1
        p1.style.color = "black"
    }
}
