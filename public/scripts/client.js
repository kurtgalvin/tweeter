/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

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
  $('#tweets').append(...tweets.map(tweet => {
    return createTweetElement(tweet)
  }))
}

$(document).ready(function() {
  renderTweets(data)
})
