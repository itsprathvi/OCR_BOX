from flask import Flask, render_template, request, url_for, jsonify
import pytesseract
from PIL import Image
import json
import os
from gtts import gTTS
from google_trans_new2 import google_translator
import constant

app = Flask(__name__)

app.config["IMAGE_UPLOADS"] = os.path.join(app.root_path, 'static/img/uploads')


def getAudioUrl(filename):
    return "audio-"+filename.split(".")[0]+".mp3"


@app.route("/home")
@app.route("/", methods=["GET", "POST"])
def upload_image():
    if request.method == "POST":
        filename = ""
        language = ""
        if request.files:

            l = request.form['select']
            image = request.files["image"]

            filename = image.filename

            langCode = list(constant.LANGUAGES.keys())
            print(langCode)
            langName = list(constant.LANGUAGES.values())
            print(langName)

            langIdx = langName.index(l)
            language = langCode[langIdx]
            print(language, end="\n")

            image.save(os.path.join(app.root_path,
                       'static/img/uploads', filename))

            image_url = os.path.join(
                app.root_path, 'static/img/uploads', filename)
            image = Image.open(image_url)

            # extracting text from image
            # try:
            imageText = pytesseract.image_to_string(image, lang=language)
            if(not(imageText)):
                imageText = "No Text Found"
            # except:
            #     print("Error")
            #     imageText = "No Text Found"

            if l == "Kannada":
                language = 'kn'
            elif l == "English":
                language = 'en'
            elif l == "Hindi":
                language = 'hi'
            else:
                language = 'en'

            myObj = gTTS(text=imageText, lang=language, slow=False)
            audioFile = getAudioUrl(filename)
            myObj.save("static/audio/"+audioFile)

            obj = {
                "imgText": imageText,
                "audioFile": audioFile,
            }

            return render_template("upload_image.html", obj=obj)

    else:
        return render_template("upload_image.html", langs=constant.LANGUAGES.values())


@app.route("/langTranslator", methods=["GET", "POST"])
def langTranslator():
    translator = google_translator()
    if request.method == "POST":
        data = json.loads(request.data)

        ORIGINAL_TEXT = data['ORIGINAL_TEXT']
        LANG_TO = data['LANG_TO']

        try:
            translatedText = translator.translate(
                ORIGINAL_TEXT, lang_tgt=LANG_TO)
            print(translatedText)
        except:
            translatedText = translator.translate(
                "Sorry.. Cant convert at this time :)", lang_tgt=LANG_TO)
        return jsonify(
            {"translatedText": translatedText}
        )


@app.route("/langAvailable", methods=["GET"])
def langAvailable():
    return jsonify(
        {'af': 'afrikaans', 'sq': 'albanian', 'am': 'amharic', 'ar': 'arabic', 'hy': 'armenian', 'az': 'azerbaijani', 'eu': 'basque', 'be': 'belarusian', 'bn': 'bengali', 'bs': 'bosnian', 'bg': 'bulgarian', 'ca': 'catalan', 'ceb': 'cebuano', 'ny': 'chichewa', 'zh-cn': 'chinese (simplified)', 'zh-tw': 'chinese (traditional)', 'co': 'corsican', 'hr': 'croatian', 'cs': 'czech', 'da': 'danish', 'nl': 'dutch', 'en': 'english', 'eo': 'esperanto', 'et': 'estonian', 'tl': 'filipino', 'fi': 'finnish', 'fr': 'french', 'fy': 'frisian', 'gl': 'galician', 'ka': 'georgian', 'de': 'german', 'el': 'greek', 'gu': 'gujarati', 'ht': 'haitian creole', 'ha': 'hausa', 'haw': 'hawaiian', 'iw': 'hebrew', 'hi': 'hindi', 'hmn': 'hmong', 'hu': 'hungarian', 'is': 'icelandic', 'ig': 'igbo', 'id': 'indonesian', 'ga': 'irish', 'it': 'italian', 'ja': 'japanese', 'jw': 'javanese', 'kn': 'kannada', 'kk': 'kazakh', 'km': 'khmer', 'ko': 'korean', 'ku': 'kurdish (kurmanji)',
         'ky': 'kyrgyz', 'lo': 'lao', 'la': 'latin', 'lv': 'latvian', 'lt': 'lithuanian', 'lb': 'luxembourgish', 'mk': 'macedonian', 'mg': 'malagasy', 'ms': 'malay', 'ml': 'malayalam', 'mt': 'maltese', 'mi': 'maori', 'mr': 'marathi', 'mn': 'mongolian', 'my': 'myanmar (burmese)', 'ne': 'nepali', 'no': 'norwegian', 'ps': 'pashto', 'fa': 'persian', 'pl': 'polish', 'pt': 'portuguese', 'pa': 'punjabi', 'ro': 'romanian', 'ru': 'russian', 'sm': 'samoan', 'gd': 'scots gaelic', 'sr': 'serbian', 'st': 'sesotho', 'sn': 'shona', 'sd': 'sindhi', 'si': 'sinhala', 'sk': 'slovak', 'sl': 'slovenian', 'so': 'somali', 'es': 'spanish', 'su': 'sundanese', 'sw': 'swahili', 'sv': 'swedish', 'tg': 'tajik', 'ta': 'tamil', 'te': 'telugu', 'th': 'thai', 'tr': 'turkish', 'uk': 'ukrainian', 'ur': 'urdu', 'uz': 'uzbek', 'vi': 'vietnamese', 'cy': 'welsh', 'xh': 'xhosa', 'yi': 'yiddish', 'yo': 'yoruba', 'zu': 'zulu', 'fil': 'Filipino', 'he': 'Hebrew'}
    )


if __name__ == "__main__":
    app.run(debug=True)
