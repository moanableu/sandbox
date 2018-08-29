/** instantiate the layout based on <div> root element
* using method .getElementById(args)
*/
const app = document.getElementById('root');

/** instantiate/draw an image/logo
* find out more
* using method .createElement(args)
*/
const logo = document.createElement('img');
logo.src = 'logo.png';

/** instantiate the view as per CSS style doc
* using
* a) .createElement()
* by using the 'div' we are delimiting each instance of this container element
* b) .setAttribute()
* instantiates the class and the container
*/
const container = document.createElement('div');
container.setAttribute('class', 'container');

// these are iterations that will recycle thru the views setup
app.appendChild(logo);
app.appendChild(container);

/** the beginning of our API request
* by creating a request variable
* instantiate a new XMLHttpRequest() object
*   the following methods are abstract to this object
*   allow the following functions:
*   Read Only ALL
*   HEADERS RECEIVED
*   LOADING
*   OPENED
*   UNSENT
* open a  new connection with the .open() method
* specify the request as GET in the arguments section as well as the URL endpoint

* In Python this would be the equivalent of
* urllib2.urlopen('[URL]').read()
*/
var request = new XMLHttpRequest();
request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);
// access the data in the following function:
request.onload = function () {

  /** Begin accessing JSON data here
  * based on response code
  * uses method .parse()
  * and assgins a context
  */
  var data = JSON.parse(this.response);
  // if 200 [GET] + status under 400 [NOT AVAILABLE]
  if (request.status >= 200 && request.status < 400) {

    /** uses method .forEach()
    * where a func is passed as an argument
    */
    data.forEach(movie => {
      /** based on a card element that has been defined as a constant,
      * .setAttributes()
      * view attributes
      */
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      // style the view by applying h1 tags where title
      const h1 = document.createElement('h1');
      // movie.title is the JSON format for the API qry
      h1.textContent = movie.title;

      /** assign <p> tags to everything else
      * method .substring(n, n); where each n determines beginning and end chars
      * therefore it ellipsizes the text
      */
      const p = document.createElement('p');
      movie.description = movie.description.substring(0, 300);
      // get the text content extracted from the query
      p.textContent = `${movie.description}...`;

      // draw elements, extends Node child
      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
    });
  } else {
    // log an error
    const errorMessage = document.createElement('marquee');
    // appends given txt
    errorMessage.textContent = `Gah, it's not working!`;
    app.appendChild(errorMessage);
  }
}
/**
* .send()
* Initiates the request. The optional argument provides the request body.
* The argument is ignored if request method is GET or HEAD.
* Throws an "InvalidStateError" DOMException if either state is not opened or the send() flag is set.
*/
request.send();