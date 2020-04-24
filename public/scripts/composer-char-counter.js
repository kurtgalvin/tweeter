$(document).ready(function() {
  const $newTweetText = $('#tweet-text');
  const $counter = $('.new-tweet .counter');

  $newTweetText.on('input', function() {
    const count = 140 - $(this).val().length;
    $counter.val(count);

    if (count < 0) {
      $counter.addClass('red');
    } else {
      $counter.removeClass('red');
    }
  });
});