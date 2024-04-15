// Import stylesheets
//import './style.css';


const form: HTMLFormElement = document.querySelector('#defineform')!;


form.onsubmit = () => {
  const formData = new FormData(form);

  console.log(formData);
  const text = formData.get('defineword') as string;
  console.log(text);

  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${text}`)
.then(function (response) {
    return response.json();
})
.then(function(data) {
    appendData(data);
})
.catch(function(err) {
    console.log('error: ' + err);
})
  return false; // prevent reload
};

function appendData(data) {
  let mainContainer = document.getElementById("quotes")!;
  // let p = document.createElement("p");
  // let w = document.createElement("p");
  let w = document.getElementById("word")!;
  let definition = document.getElementById("definition")!;
  let phonetics = document.getElementById("phenotics")!;
  let synonyms = document.getElementById("synonyms")!;
  let antonyms = document.getElementById("antonyms")!;
  //let p = document.getElementById("definition")!;
  w.innerHTML = data[0].word;
  //p.innerHTML = data[0].meanings[0].definitions[0].definition;
  // mainContainer.appendChild(w);
  // mainContainer.appendChild(p);

  let phoneticFound = false;
  
  for (let i = 0; i < data[0].phonetics.length; i++) {
  if (data[0].phonetics[i].text) {
    phonetics.innerHTML = data[0].phonetics[i].text;
    phoneticFound = true;
    break;
  }
  }
  if (!phoneticFound) {
    phonetics.innerHTML = "N/A";
  }
  let audio = document.getElementById("audio")as HTMLAudioElement;
  let audioSource = document.getElementById("audioSource") as HTMLSourceElement;
  let audioFound = false;
  for (let i = 0; i < data[0].phonetics.length; i++) {
    if (data[0].phonetics[i].audio) {
      audioSource.src = data[0].phonetics[i].audio;
      audio.load();
      audioFound = true;
      break;
    }
  }
  if (!audioFound) {
    audio.innerHTML = "N/A";
  }
  let definitionFound = false;

for (let i = 0; i < data[0].meanings.length; i++){
  if(data[0].meanings[i].definitions[0].definition){
    definition.innerHTML = `<strong>Definition:</strong> ${data[0].meanings[i].definitions[0].definition}`;
    definitionFound = true;
    break;
  }
}

  if (!definitionFound) {
    definition.innerHTML = "N/A";
  }
  

  let synonymsFound = false;
  synonyms.innerHTML = "";
  

  for(let i = 0; i < data[0].meanings.length; i++){
   if(data[0].meanings[i].synonyms[0]){
     let synonymsThing = document.createElement("ul");
     synonymsThing.textContent = data[0].meanings[i].synonyms;
     synonymsFound = true;
     synonyms.appendChild(synonymsThing);
   }
  }
  if (!synonymsFound) {
    synonyms.innerHTML = "N/A";
  }

  //antonyms
  let antonymsFound = false;
  antonyms.innerHTML = "";
  for (let i = 0; i < data[0].meanings.length; i++) {
      if (data[0].meanings[i].antonyms[0]) {
          let antonymsThing = document.createElement("li");
          antonymsThing.textContent = data[0].meanings[i].antonyms;
          antonymsFound = true;
          antonyms.appendChild(antonymsThing);
      }
    }
    if (!antonymsFound) {
      antonyms.innerHTML = "N/A";
    }
  console.log(data[0])
  
}