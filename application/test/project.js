var el = document.getElementById("link");
el.addEventListener("mouseover", function(e)
{
  this.style.color = "green";
  e.preventDefault();
}, false);

el.addEventListener("mouseout", function(e)
{
  this.style.color = "black";
  e.preventDefault();
}, false);