(function() {
  'use strict';

  var jsonURL = 'https://credentials-api.generalassemb.ly/explorer/posts';

  document.getElementById('load-more').addEventListener('click', e => {
    e.target.disabled = true;
    e.target.innerHTML = 'Exploring the Archive <i class="fa fa-circle-o-notch fa-spin"></i';

    const request = new XMLHttpRequest();
    request.open('GET', jsonURL, true);

    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        const resp = JSON.parse(request.responseText);
        console.log('resp', resp.posts);

        resp.posts.forEach(article => {
          console.log('article', article);

          const art = `
            <article>
              <i class="fa ${article.category}"></i>
              <h2>From the Archive</h2>
              <h1>${article.title}</h1>
              <h3>${article.date}</h3>
              <p>${article.blurb}</p>
            </article>
          `;

          const div = document.getElementById('article-list');
          div.insertAdjacentHTML('beforeend', art);
        });
      } else {
        // We reached our target server, but it returned an error

      }
    };

    request.onerror = () => {
      e.target.innerHTML = 'Something Went Wrong <i class="fa fa-exclamation-triangle"></i>';
    };

    request.send();
  });
})();
