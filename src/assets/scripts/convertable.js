$(".convert").on("click", function (e) {
  e.preventDefault()
  let convertible = $(this).closest(".convertible"),
    form = convertible.find(".convertible__form"),
    data = convertible.find(".convertible__data")
  form.toggleClass("d-block")
  data.toggleClass("d-none")
})

