$(".rate-input").starRating({
  initialRating: 0,
  starSize: 25,
  totalStars: 5,
  starShape: '',
  emptyColor: 'lightgray',
  hoverColor: '#f2b01e',
});

$(".rate-display").each(function () {
  let initial = $(this).data('rate')
  $(this).starRating({
    readOnly: true,
    initialRating: initial,
    starSize: 20,
    totalStars: 5,
    starShape: '',
    emptyColor: 'lightgray',
    hoverColor: '#f2b01e',
  });
})
