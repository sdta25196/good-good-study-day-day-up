import pic from "./1.jpg"

const img = new Image()
img.src = pic

const body = document.querySelector("body")
body.append(img)

console.log("hello img");