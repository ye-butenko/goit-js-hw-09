const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");let l=null;function a(){t.toggleAttribute("disabled"),e.toggleAttribute("disabled")}t.addEventListener("click",(()=>{l||(l=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3),a())})),e.addEventListener("click",(()=>{l&&(clearInterval(l),l=null,a())}));
//# sourceMappingURL=01-color-switcher.a73b175c.js.map