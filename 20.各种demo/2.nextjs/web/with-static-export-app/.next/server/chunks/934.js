"use strict";
exports.id = 934;
exports.ids = [934];
exports.modules = {

/***/ 8934:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "P": () => (/* binding */ GetPosts),
/* harmony export */   "o": () => (/* binding */ GetPost)
/* harmony export */ });
async function GetPost(id) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const postData = await response.json();
    return postData;
}
async function GetPosts() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts?_page=1");
    const postList = await response.json();
    return postList;
}


/***/ })

};
;