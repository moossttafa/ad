// localStorage.setItem("darkmode", "off");
$(document).on("change", "#dark-mode-toggle", function () {
  // if ($("#dark-mode-toggle").is(":checked"))
  //   localStorage.setItem("darkmode", "on");
  // else localStorage.setItem("darkmode", "off");
  // localStorage.getItem("darkmode");
  if ($("#dark-mode-toggle").is(":checked")) {
    $("html").addClass("night-mode");
  } else {
    $("html").removeClass("night-mode");
  }
  // console.log(localStorage.darkmode);
});
