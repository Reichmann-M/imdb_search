var uinput = document.getElementById("search-box");
uinput.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    IMDBQueryStart();
  }
});
