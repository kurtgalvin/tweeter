/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function({user, content}) {
  return `
    <article class="tweet">
      <header>
        <section>
          <img src="${user.avatars}" alt="">
          <span>${user.name}</span>
        </section>
        <span class="username">${user.handle}</span>
      </header>

      <main>
        <p>${content.text}</p>
      </main>

      <footer>
        <time>
          <span>10</span> days ago
        </time> 
        <div class="icons">
          <span class="material-icons">flag</span>
          <span class="material-icons">autorenew</span>
          <span class="material-icons">thumb_up_alt</span>
        </div>
      </footer>
    </article>
  `
}

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  const $tweets = $('#tweets')
  $tweets.empty()
  $tweets.append(...tweets.map(tweet => {
    return createTweetElement(tweet)
  }));
}

const loadTweets = function() {
  $.get('/tweets/')
  .then(tweets => {
    renderTweets(tweets)
  })
}

const newTweetSubmit = function(event) {
  event.preventDefault();
  $.post({
    url: '/tweets/',
    data: $(this).serialize()
  })
  .then(_ => loadTweets())
}

const attachEventHandlers = function() {
  $('.new-tweet form').submit(newTweetSubmit)
}

$(document).ready(function() {
  loadTweets()
  attachEventHandlers()
})
