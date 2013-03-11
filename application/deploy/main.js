var el = document.getElementById("link");

el.addEventListener("mouseover", function(e) {
    this.style.color = "green", e.preventDefault();
}, !1), el.addEventListener("mouseout", function(e) {
    this.style.color = "black", e.preventDefault();
}, !1);

var funct = function() {
    return 40;
};