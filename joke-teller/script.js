const button = document.getElementById('button');
const audioElement = document.getElementById('audio');


// Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
  }
//passing joke to voiceRss Api
function tellMe(joke){
    console.log('tell me: ', joke);
    VoiceRSS.speech({
        key: '0fcfa92dcbcb40ef83e583f1b4a57d6b',
        src: joke,
        hl: 'en-us',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false,
      });
}



  //get joke from joke Api
  async function getJokes(){
     let joke = '';
    const apiUrl= 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,racist,sexist';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
        if(data.setup){
            joke =`${data.setup} ... ${data.delivery}`;
        }
        else{
            joke = data.joke;
        }
        // Passing Joke to VoiceRSS API
        tellMe(joke)
     // Disable Button
    toggleButton();
    } 
    catch (error) {
        console.log('error',error);
    }
  }
  // Event Listeners
    button.addEventListener('click', getJokes);
    audioElement.addEventListener('ended', toggleButton);


//   getJokes();
