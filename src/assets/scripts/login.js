// script reset page
var verification = (function () {
  //cache dom
  var $inputs = $("#verification").find("input");

  //bind events
  $inputs.on('keyup', processInput);

  //define methods
  function processInput(e) {
    var x = e.charCode || e.keyCode;
    if ((x == 8 || x == 46) && this.value.length == 0) {
      var indexNum = $inputs.index(this);
      if (indexNum != 0) {
        $inputs.eq($inputs.index(this) - 1).focus();
      }
    }

    if (ignoreChar(e))
      return false;
    else if (this.value.length == this.maxLength) {
      $(this).next('input').focus();
    }
  }
  function ignoreChar(e) {
    var x = e.charCode || e.keyCode;
    if (x == 37 || x == 38 || x == 39 || x == 40)
      return true;
    else
      return false
  }

})();


//login phone number

if ("intlTelInput" in window) {
  const phoneInputField = document.querySelector("#phone"),
    tokinMask = "5hy8RjDWfiqwO051SlFiQh1hkwDfwvJSSw2my7fF";

  const phoneInput = window.intlTelInput(phoneInputField, {
    initialCountry: "eg",
    utilsScript:
      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    preferredCountries: ["eg", "us"],
    utilsScript:
      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
  });


  const info = document.querySelector(".messages");
  const error = document.querySelector(".messages");

  phoneInputField.addEventListener("input", function process(event) {
    event.preventDefault();

    if (phoneInputField.value.length >= 20) {
      phoneInputField.value = '';
    }
    // IMask(phoneInputField, {
    //   mask: phoneInputField.getAttribute('placeholder').replace(/[0-9]/g, 0)
    // });
    const phoneNumber = phoneInput.getNumber();

    info.style.display = "none";
    error.style.display = "none";

    if (phoneInput.isValidNumber()) {
      info.style.display = "";
      info.innerHTML = `Phone number in E.164 format: <strong>${phoneNumber}</strong>`;
    } else {
      error.style.display = "";
      error.innerHTML = `Invalid phone number.`;
    }
  })
}
 
