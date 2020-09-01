from flask import Flask, render_template, request,url_for
import pytesseract
from PIL import Image
import os
from gtts import gTTS


pytesseract.pytesseract.tesseract_cmd = r"C:\Users\User\Flask\TesseractOCR\tesseract.exe"

app = Flask(__name__)

app.config["IMAGE_UPLOADS"] = r"D:\Flask\static\img\uploads"
@app.route("/home")
@app.route("/",methods=["GET","POST"])
def upload_image():
    if request.method =="POST":

        if request.files:
            l = request.form['select']
            print(l)
            if l == "Kannada":
                language = 'kan'
            elif l == "English":
                language = 'eng'
            elif l == "Hindi":
                language = 'hin'
            elif l == "Sanskrit":
                language = 'san'


            image = request.files["image"]
            # i = Image.open(image.filename)
            # picture_name = image.filename
            # picture_path = os.path.join(app.root_path, 'static/img/uploads', picture_name)
            # i.save(picture_path)
            image.save(os.path.join(app.root_path, 'static/img/uploads', image.filename))
            print("IMAGE SAVED")
            print(image.filename)

            # image_url = r"D:\Flask\static\img\uploads\\" + image.filename
            image_url =  os.path.join(app.root_path, 'static/img/uploads', image.filename)
            image = Image.open(image_url)
            imageText = pytesseract.image_to_string(image, lang=language)

        print("Audio playing...")

        if l == "Kannada":
            language = 'kn'
        elif l == "English":
            language = 'en'
        elif l == "Hindi":
            language = 'hi'
        elif l == "Sanskrit":
            language = 'sk'

        myObj = gTTS(text=imageText, lang=language ,slow=False)
        myObj.save("static/audio/sophistsOCR.mp3")
        data = imageText
        return render_template("upload_image.html", data=data)

    else:
        return render_template("upload_image.html")

if __name__ == "__main__":
   app.run(debug=True)
