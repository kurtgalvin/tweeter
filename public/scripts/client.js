/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const createTweetElement = function({user, content}) {
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

const newTweetValidation = function(val) {
  return new Promise((resolve, reject) => {
    if (val && val.length <= 140) {
      resolve(val)
    } else {
      reject()
    }
  })
}

const newTweetSubmit = function(event) {
  event.preventDefault();
  const $this = $(this)
  newTweetValidation($this.find('textarea').val())
  .then(val => {
    $.post({
      url: '/tweets/',
      data: $this.serialize()
    }).then(_ => loadTweets())
  })
  .catch(err => {
    alert('Bad Tweet')
  })
}

const attachEventHandlers = function() {
  $('.new-tweet form').submit(newTweetSubmit)
}

$(document).ready(function() {
  loadTweets()
  attachEventHandlers()
})
