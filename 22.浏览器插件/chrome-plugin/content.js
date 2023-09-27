const div = document.createElement('div')
const img = document.createElement('img')
img.src = "https://static-gkcx.gaokao.cn//upload/operate_img/gkcx_1610175818_5733_thumb.png"
img.style.cssText = "width:100%;height:100%"
div.style.cssText = "width:200px;height:200px;background:red;position: absolute;z-index: 9999;bottom: 10%;right: 5%;cursor: pointer;";
div.appendChild(img)
div.onclick = async function () {
  chrome.runtime.sendMessage({ action: "buttonClicked" });

}
document.querySelector('body').appendChild(div)
