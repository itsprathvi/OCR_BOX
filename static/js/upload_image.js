let WEB_URL = window.location.origin;

var clipboard = new ClipboardJS(".btn");
clipboard.on('success', function() {
    M.toast({
        html: "copied successfully",
        classes: "white"
    });
});

// loading symbol displayer
function loadingDisplay(params) {
    var formFilled = true;
    document.getElementById("img-form").querySelectorAll("[required]").forEach(function(i) {
        if (!i.value) {
            formFilled = false;
            return;
        };
    })
    if (formFilled) {
        document.getElementById("loader").innerHTML = "<div class=\"loader-div\"><div class=\"loader\"><div class=\"square\"></div><div class=\"path\"><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div><p class=\"text-load\">Loading</p></div></div>";
    }
}


//image displayer
var imgName;

function showPreviewOne(event) {
    if (event.target.files.length > 0) {
        let src = URL.createObjectURL(event.target.files[0]);
        imgName = src;
        let preview = document.getElementById("file-ip-1-preview");
        preview.src = src;
        preview.style.display = "block";
    } else {
        myImgRemoveFunctionOne()
    }
}

function myImgRemoveFunctionOne() {
    document.getElementById("file-ip-1-preview").src = "";
}

//get langset
// async function getLanguageSet() {
//     await fetch(WEB_URL + '/langAvailable', {
//             method: "GET"
//         })
//         .then(response => response.json())
//         .then(json => {
//             console.log(json);
//             langSets = json;
//         });
// }

async function addLanguages() {
    let langSets;
    await fetch(WEB_URL + '/langAvailable', {
            method: "GET"
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            langSets = json;
        });

    var langDropdown = document.getElementById("languages");
    var newOption, optionText;
    for (x in langSets) {
        // console.log(x, l[x]);

        // create option using DOM
        newOption = document.createElement('option');
        optionText = document.createTextNode(langSets[x]);
        // set option text
        newOption.appendChild(optionText);
        // and option value
        newOption.setAttribute('value', x);

        newOption.classList.add("p-3");
        newOption.classList.add("mb-2");

        langDropdown.appendChild(newOption);
    }
}


// Translated text getter
ORIGINAL_TEXT = document.getElementById("content").innerText;

async function getTranslatedText(txt, langTo) {
    let _data = {
        ORIGINAL_TEXT: txt,
        LANG_TO: langTo
    }
    var translatedText

    await fetch(WEB_URL + '/langTranslator', {
            method: "POST",
            body: JSON.stringify(_data),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            translatedText = json
        });
    return translatedText;
}

async function translateNow() {
    var langTo = document.getElementById("languages").value;
    let _data = {
        ORIGINAL_TEXT: ORIGINAL_TEXT,
        LANG_TO: langTo
    }
    var translatedText

    await fetch(WEB_URL + '/langTranslator', {
            method: "POST",
            body: JSON.stringify(_data),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            translatedText = json
        });

    var dispElement = document.getElementById("tranContainer");

    dispElement.style.display = "block";

    var para = document.getElementById("transText");

    para.innerText = translatedText["translatedText"];
}

addLanguages();

// Dropdown