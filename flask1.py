from flask import Flask, render_template, request, url_for
import pytesseract
from PIL import Image
import os
from gtts import gTTS
#from googletrans import Translator
from google_trans_new import google_translator

app = Flask(__name__)

app.config["IMAGE_UPLOADS"] = os.path.join(app.root_path, 'static/img/uploads')

def getAudioUrl(filename):
    return "audio-"+filename.split(".")[0]+".mp3"


@app.route("/home")
@app.route("/", methods=["GET", "POST"])
def upload_image():
    filename = ""
    if request.method == "POST":

        if request.files:
            l = request.form['select']
            if l == "Kannada":
                language = 'kan'
            elif l == "English":
                language = 'eng'
            elif l == "Hindi":
                language = 'hin'
            elif l == "Sanskrit":
                language = 'san'

            image = request.files["image"]
            filename = image.filename

            image.save(os.path.join(app.root_path, 'static/img/uploads', filename))

            image_url = os.path.join(app.root_path, 'static/img/uploads', filename)
            image = Image.open(image_url)

            try:
                imageText = pytesseract.image_to_string(image, lang=language)
                translator = google_translator() 
                translatedText = translator.translate(imageText)
            except:
                imageText ="No Text Found"
                translatedText = "No Text Found"
        print("Text Ready!")

        if l == "Kannada":
            language = 'kn'
        elif l == "English":
            language = 'en'
        elif l == "Hindi":
            language = 'hi'
        elif l == "Sanskrit":
            language = 'sk'

        myObj = gTTS(text=imageText, lang=language, slow=False)
        audioFile = getAudioUrl(filename)
        myObj.save("static/audio/"+audioFile)
        
        if l == "Kannada":
            language = 'kn'
        elif l == "English":
            language = 'eng'
        elif l == "Hindi":
            language = 'hi'

        try:
            kanText = translator.translate(imageText, lang_src=language, lang_tgt = 'kn')
        except:
            kanText = translator.translate("Can't convert, Sorry!!", lang_src=language, lang_tgt = 'kn')

        try:
            hinText = translator.translate(imageText, lang_src=language, lang_tgt = 'hi')
        except:
            hinText = translator.translate("Can't convert, Sorry!!", lang_src=language, lang_tgt = 'hi')

        obj = {
            "imgText" : imageText,
            "engText" : translatedText,
            "hinText" : hinText,
            "kanText" : kanText,
            "audioFile" : audioFile,
        }

        return render_template("upload_image.html", obj=obj)

    else:
        return render_template("upload_image.html")


if __name__ == "__main__":
    app.run(debug=True)
