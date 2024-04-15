// Import stylesheets
//import './style.css';
var form = document.querySelector('#defineform');
form.onsubmit = function () {
    var formData = new FormData(form);
    console.log(formData);
    var text = formData.get('defineword');
    console.log(text);
    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/".concat(text))
        .then(function (response) {
        return response.json();
    })
        .then(function (data) {
        appendData(data);
    })
        .catch(function (err) {
        console.log('error: ' + err);
    });
    return false; // prevent reload
};
function appendData(data) {
    var mainContainer = document.getElementById("quotes");
    // let p = document.createElement("p");
    // let w = document.createElement("p");
    var w = document.getElementById("word");
    var definition = document.getElementById("definition");
    var phonetics = document.getElementById("phenotics");
    var synonyms = document.getElementById("synonyms");
    var antonyms = document.getElementById("antonyms");
    //let p = document.getElementById("definition")!;
    w.innerHTML = data[0].word;
    //p.innerHTML = data[0].meanings[0].definitions[0].definition;
    // mainContainer.appendChild(w);
    // mainContainer.appendChild(p);
    var phoneticFound = false;
    for (var i = 0; i < data[0].phonetics.length; i++) {
        if (data[0].phonetics[i].text) {
            phonetics.innerHTML = data[0].phonetics[i].text;
            phoneticFound = true;
            break;
        }
    }
    if (!phoneticFound) {
        phonetics.innerHTML = "N/A";
    }
    var audio = document.getElementById("audio");
    var audioSource = document.getElementById("audioSource");
    var audioFound = false;
    for (var i = 0; i < data[0].phonetics.length; i++) {
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
    var definitionFound = false;
    for (var i = 0; i < data[0].meanings.length; i++) {
        if (data[0].meanings[i].definitions[0].definition) {
            definition.innerHTML = "<strong>Definition:</strong> ".concat(data[0].meanings[i].definitions[0].definition);
            definitionFound = true;
            break;
        }
    }
    if (!definitionFound) {
        definition.innerHTML = "N/A";
    }
    var synonymsFound = false;
    synonyms.innerHTML = "";
    for (var i = 0; i < data[0].meanings.length; i++) {
        if (data[0].meanings[i].synonyms[0]) {
            var synonymsThing = document.createElement("ul");
            synonymsThing.textContent = data[0].meanings[i].synonyms;
            synonyms.appendChild(synonymsThing);
        }
    }
    if (!synonymsFound) {
        synonyms.innerHTML = "N/A";
    }
    //antonyms
    var antonymsFound = false;
    antonyms.innerHTML = "";
    for (var i = 0; i < data[0].meanings.length; i++) {
        if (data[0].meanings[i].antonyms[0]) {
            var antonymsThing = document.createElement("li");
            antonymsThing.textContent = data[0].meanings[i].antonyms;
            antonymsFound = true;
            antonyms.appendChild(antonymsThing);
        }
    }
    if (!antonymsFound) {
        antonyms.innerHTML = "N/A";
    }
    console.log(data[0]);
}
