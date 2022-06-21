
const quoteContainer= document.getElementById('quote-container');
const longQuote= document.getElementById('long-quote');
const quoteAuthor= document.getElementById('quote-author');
const newQuote= document.getElementById('new-quote');
const twitter= document.getElementById('twitter');
const loader= document.getElementById('loader');


let apiquotes=[];


//show loading
function loading() {
    loader.hidden= false;
    quoteContainer.hidden= true;
}
//hide loading
function complete() {
    quoteContainer.hidden= false;
    loader.hidden= true;
}

function newQuotes() {
    loading();
    const quote = apiquotes[Math.floor(Math.random() * apiquotes.length)];
    // console.log(quote);
    if (!quote.author) {
        quoteAuthor.textContent='Unknown';
    }
    else{
        quoteAuthor.textContent=quote.author;
    }

    if (quote.text.length>100) {
        longQuote.classList.add('long-quote');
    } else {
        longQuote.classList.remove('long-quote');
    }
   
    longQuote.textContent = quote.text;
    complete();
}
async function getQuotes() {
    loading();
const apiUrl='https://type.fit/api/quotes';

try {
    const res= await fetch(apiUrl);
    apiquotes= await res.json();
    // console.log(apiquotes);
    newQuotes();
}
 catch (error) {
    
 }
}

//tweet quote
function tweetQuote(){
    const twitterUrl= `https://twitter.com/intent/tweet?text=${longQuote.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterUrl,'_blank')
}

//event Listener
newQuote.addEventListener('click',newQuotes);
twitter.addEventListener('click',tweetQuote);

//onload
getQuotes();
// loading();

