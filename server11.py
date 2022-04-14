from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)



lessons = {
 
    "1": {
        "lesson_id": "1",
        "title": "SETTING",
        "image": "https://i.ibb.co/tKTB75g/setter.png",
        "gif": "https://i.ibb.co/9cct0C4/setting.gif",
        "text": " You are the quarterback of the team! Setters set the ball up for the attackers/hitters to score. A coach must be able to rely on the setter to make sound, consistent decisions.",
        "demands": "1. Ability to set the ball to the left-front position. 2. Move all around the court 3. Set high enough and position properly for the hitter to attack.",
        "next_lesson":"2",
    },

    "2": {
        "lesson_id": "2",
        "title": "LIBERO",
        "image": "https://i.ibb.co/4Vmy6mp/libero.png",
        "gif": "https://i.ibb.co/mBKLpGy/libero.gif",
        "text": "You are the defender of the team. As the libero you know you’ll be receiving serves all day long. Adapt and make changes when your teammates are getting picked on.",
        "demands": "1. Always play in the back row. 2. Receive opponent’s attacks and serves 3. Wear a different color jersey.",
        "next_lesson":"3",  
    },

    "3": {
        "lesson_id": "3",
        "title": "OUTSIDE HITTER",
        "image": "https://i.ibb.co/K7c3Hfg/outsidehitter.png",
        "gif": "https://i.ibb.co/qx9J19b/outside-hitter.gif",
        "text": "You are the “bag of tools”. You play both the front row and the back row and should develop a variety of ways to attack the ball.",
        "demands": "1. After the serve place yourself to the left front position. 2. Read the opponent’s defense and call out hitters.",
        "next_lesson":"4",  
    },

    "4": {
        "lesson_id": "4",
        "title": "MIDDLE BLOCKING",
        "image": "https://i.ibb.co/HKZhsVf/middleblocker.png",
        "gif": "https://i.ibb.co/4SypYDP/blocker.gif",
        "text": "You are the team’s tallest athlete! Your role is to block the opposing team’s attack so be ready for the opponent’s quick middle attacks. But also move to either side to help teammates close blocks with the opposite hitter and outside hitter.",
        "demands": "1. Also work as a hitter to attack. 2. Quick evaluation skills to anticipate the opposing team’s attack.",
        "next_lesson":"5",
    },

    "5": {
        "lesson_id": "5",
        "title": "OPPOSITE HITTER",
        "image": "https://i.ibb.co/dGkJ8XH/oppositehitter.png",
        "gif": "https://i.ibb.co/MV62r1r/opposite.gif",
        "text": "You most often scores the most points in the team - no pressure! Your role is to score and block the ball. Be the backup of the setter when the traditional setter is unable to get to the ball.",
        "demands": "1. Attack the ball when receiving a set. 2. Work with the middle hitter on blocks. 3. Best for left-handed players.",
        "next_lesson":"end",
    }
}


# ROUTES
  

@app.route('/')
def home_page():

    return render_template('home_page.html')  


@app.route('/learn/<lesson_id>')
def learn(lesson_id):
    
    lesson = lessons[lesson_id]

    
    return render_template('learn.html', lesson = lesson)




if __name__ == '__main__':
   app.run(debug = True)




