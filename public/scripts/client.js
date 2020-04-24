/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const daysAgoDisplay = function(created_at) {
  // render created_at time in a presentable string
  console.log(created_at - (1000 * 60 * 60 * 24));
  const daysAgo = Math.floor((new Date() - created_at) / (1000 * 60 * 60 * 24));

  if (daysAgo === 0) {
    return "Today";
  } else if (daysAgo === 1) {
    return "Yesterday";
  } else if (daysAgo <= 10) {
    return `${daysAgo} days ago`;
  } else {
    return "10+ days ago";
  }

};

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function({user, content, created_at}) {
  return `
    <article class="tweet">
      <header>
        <section>
          <img src="${escape(user.avatars)}" alt="">
          <span>${escape(user.name)}</span>
        </section>
        <span class="username">${escape(user.handle)}</span>
      </header>

      <main>
        <p>${escape(content.text)}</p>
      </main>

      <footer>
        <time>
          ${daysAgoDisplay(created_at)}
        </time> 
        <div class="icons">
          <span class="material-icons">flag</span>
          <span class="material-icons">autorenew</span>
          <span class="material-icons">thumb_up_alt</span>
        </div>
      </footer>
    </article>
  `;
};

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  const $tweets = $('#tweets');
  $tweets.empty();
  $tweets.append(...tweets.map(tweet => {
    return createTweetElement(tweet);
  }).reverse());
};

const loadTweets = function() {
  $.get('/tweets/')
    .then(tweets => {
      renderTweets(tweets);
    });
};

const newTweetValidation = function(val) {
  // Resolve promise when tweet value meets requirements
  return new Promise((resolve, reject) => {
    if (!val.trim()) {
      reject('No Tweet!');
    } else if (val.length > 140) {
      reject('Tweet Too Long!');
    } else {
      resolve(val);
    }
  });
};

const newTweetSubmit = function(event) {
  // Event handler to render error message or clear and submit tweet
  event.preventDefault();
  const $this = $(this);
  const $text = $this.find('textarea');
  const $warning = $this.find('strong.red');
  $warning.empty();

  newTweetValidation($text.val())
    .then(_ => {
      $.post({
        url: '/tweets/',
        data: $this.serialize()
      }).then(_ => {
        $text.val('');
        $('.new-tweet .counter').val(140);
        loadTweets();
      });
    })
    .catch(err => {
      $warning.append(document.createTextNode(err));
    });
};

const toggleDisableNewTweet = function() {
  // Event handler to toggle hiding tweet form
  $container = $('.container');
  $container.toggleClass('disable-new-tweet');
  if (!$container.hasClass('disable-new-tweet')) {
    $('#tweet-text').focus();
  }
};

const attachEventHandlers = function() {
  $('.new-tweet form').submit(newTweetSubmit);
  $('#nav-tweet-toggle').click(toggleDisableNewTweet);
};

$(document).ready(function() {
  loadTweets();
  attachEventHandlers();
});
