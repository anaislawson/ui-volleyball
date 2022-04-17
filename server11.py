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
        "text": "You are the quarterback of the team!",
        "summary": "Setters set the ball up for the attackers/hitters to score. A coach must be able to rely on the setter to make sound, consistent decisions.",
        "demands": ["1.Ability to set the ball to the left-front position", "2. Move all around the court",
                    "3. Set high enough and position properly for the hitter to attack."],
        "next_lesson": "2"
    },

    "2": {
        "lesson_id": "2",
        "title": "LIBERO",
        "image": "https://i.ibb.co/4Vmy6mp/libero.png",
        "gif": "https://i.ibb.co/mBKLpGy/libero.gif",
        "text": "You are the defender of the team.",
        "summary": "As the libero you know you’ll be receiving serves all day long. Adapt and make changes when your teammates are getting picked on.",
        "demands": ["1. Always play in the back row.", "2. Receive opponent’s attacks and serves",
                    "3. Wear a different color jersey."],
        "next_lesson": "3"
    },

    "3": {
        "lesson_id": "3",
        "title": "OUTSIDE HITTER",
        "image": "https://i.ibb.co/K7c3Hfg/outsidehitter.png",
        "gif": "https://i.ibb.co/qx9J19b/outside-hitter.gif",
        "text": "You are the “bag of tools”. ",
        "summary": "You play both the front row and the back row and should develop a variety of ways to attack the ball.",
        "demands": ["1. After the serve place yourself to the left front position",
                    "2. Read the opponent’s defense and call out hitters."],
        "next_lesson": "4"
    },

    "4": {
        "lesson_id": "4",
        "title": "MIDDLE BLOCKING",
        "image": "https://i.ibb.co/HKZhsVf/middleblocker.png",
        "gif": "https://i.ibb.co/4SypYDP/blocker.gif",
        "text": "You are the team’s tallest athlete! ",
        "summary": "Your role is to block the opposing team’s attack so be ready for the opponent’s quick middle attacks. But also move to either side to help teammates close blocks with the opposite hitter and outside hitter.",
        "demands": ["1. Also work as a hitter to attack.",
                    "2. Quick evaluation skills to anticipate the opposing team’s attack."],
        "next_lesson": "5"
    },

    "5": {
        "lesson_id": "5",
        "title": "OPPOSITE HITTER",
        "image": "https://i.ibb.co/dGkJ8XH/oppositehitter.png",
        "gif": "https://i.ibb.co/MV62r1r/opposite.gif",
        "text": "You most often scores the most points in the team - no pressure!",
        "summary": "Your role is to score and block the ball. Be the backup of the setter when the traditional setter is unable to get to the ball.",
        "demands": ["1. Attack the ball when receiving a set.", "2. Work with the middle hitter on blocks.",
                    "3. Best for left-handed players."],
        "next_lesson": "end"
    },
}

level_1_questions = {
    '1': {
        'question_id': '1',
        'question': 'Which of the following is NOT required for a game of volleyball?',
        'options': {'1': 'High Net',
                    '2': 'Ball',
                    '3': 'Whistle',
                    '4': 'Court'},
        'answer_index': '3',
        'next_id': '2'
    }
}

level_2_questions = {
    'roles': {'1': 'Outside Hitter',
              '2': 'Middle Blocker',
              '3': 'Libero',
              '4': 'Setter',
              '5': 'Opposite Hitter (Left)',
              '6': 'Opposite Hitter (Right)'},
}

level_3_questions = {
    'roles': {'1': 'Outside Hitter',
              '2': 'Middle Blocker',
              '3': 'Libero',
              '4': 'Setter',
              '5': 'Opposite Hitter (Left)',
              '6': 'Opposite Hitter (Right)'},
    'questions': {
        '1': {
            'question_id': '1',
            'question_prompt': 'You are the defender of the team. \n '
                               'You receive serves all day long. \n '
                               'You always play in the back row \n '
                               'You should wear a different color jersey',
            'answer_id': '3',
            'next_id': '2'
        }
    }
}


# ROUTES


@app.route('/')
def home_page():
    return render_template('home_page.html')


@app.route('/teamlayout')
def teamlayout():
    return render_template('team-layout.html')


@app.route('/inaction')
def inaction():
    return render_template('inaction.html')


@app.route('/learn/<lesson_id>')
def learn(lesson_id):
    print(lesson_id)
    lesson = lessons[lesson_id]

    return render_template('learn.html', lesson=lesson, lesson_id=lesson_id)


@app.route('/quiz')
def quiz():
    return quiz_level_1('1')

@app.route('/quiz/lvl_1/<question_id>')
def quiz_level_1(question_id):
    print(question_id)
    question = level_1_questions[question_id]

    return render_template('quiz_level_1.html', question=question, question_id=question_id)

if __name__ == '__main__':
    app.run(debug=True)
