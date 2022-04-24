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
        "summary": "Setters set the ball up for the attackers/hitters to score. A coach must be able to rely on the "
                   "setter to make sound, consistent decisions.",
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
        "summary": "As the libero you know you’ll be receiving serves all day long. Adapt and make changes when your "
                   "teammates are getting picked on.",
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
        "summary": "You play both the front row and the back row and should develop a variety of ways to attack the "
                   "ball.",
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
        "summary": "Your role is to block the opposing team’s attack so be ready for the opponent’s quick middle "
                   "attacks. But also move to either side to help teammates close blocks with the opposite hitter and "
                   "outside hitter.",
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
        "summary": "Your role is to score and block the ball. Be the backup of the setter when the traditional setter "
                   "is unable to get to the ball.",
        "demands": ["1. Attack the ball when receiving a set.", "2. Work with the middle hitter on blocks.",
                    "3. Best for left-handed players."],
        "next_lesson": "end"
    },
}

quiz_level_1 = {
    '1': {
        'question_id': '1',
        'question': 'Which of the following is NOT required for a game of volleyball?',
        'options': {'1': 'High Net',
                    '2': 'Ball',
                    '3': 'Whistle',
                    '4': 'Court'},
        'answer_id': '3',
        'next_id': '2'
    },
    '2': {
        'question_id': '2',
        'question': 'How many players are on a volleyball team?',
        'options': {'1': 'five',
                    '2': 'six',
                    '3': 'seven',
                    '4': 'eight'},
        'answer_id': '2',
        'next_id': '3'
    },
    '3': {
        'question_id': '3',
        'question': 'What move is used to begin a round of volleyball?',
        'options': {'1': 'spike',
                    '2': 'block',
                    '3': 'hit',
                    '4': 'serve'},
        'answer_id': '4',
        'next_id': '4'
    },
    '4': {
        'question_id': '4',
        'question': 'How many touches does a team have in a round?',
        'options': {'1': 'one',
                    '2': 'two',
                    '3': 'three',
                    '4': 'four'},
        'answer_id': '3',
        'next_id': '5'
    },
    '5': {
        'question_id': '5',
        'question': 'If a player grounds the ball on the opponent’s court, he/she scores a point by making a _____.',
        'options': {'1': 'kill',
                    '2': 'dig',
                    '3': 'fault',
                    '4': 'block'},
        'answer_id': '1',
        'next_id': 'end'
    },
}

quiz_level_2 = {
    'roles': {'1': 'Outside Hitter',
              '2': 'Middle Blocker',
              '3': 'Libero',
              '4': 'Setter',
              '5': 'Opposite Hitter (Left)',
              '6': 'Opposite Hitter (Right)'},
}

quiz_level_3 = {
    'roles': {'1': 'Outside Hitter',
              '2': 'Middle Blocker',
              '3': 'Libero',
              '4': 'Setter',
              '5': 'Opposite Hitter'},
    'questions': {
        '1': {
            'question_id': '1',
            'question_prompt': 'You are the defender of the team. \n '
                               'You receive serves all day long. \n '
                               'You always play in the back row \n '
                               'You should wear a different color jersey',
            'answer_id': '3',
            'next_id': '2'
        },

        '2': {
            'question_id': '2',
            'question_prompt': 'You are the team\'s tallest athlete \n '
                               'You should block the opposing team’s attack \n '
                               'You should also hit to attack \n '
                               'You should act as a decoy to help confuse opponents and spread out their blockers.',
            'answer_id': '2',
            'next_id': '3'
        },

        '3': {
            'question_id': '3',
            'question_prompt': 'You are the quarterback of the team. \n '
                               'The coach relies on you to make sound consistent decisions. \n '
                               'By applying your strategy well, you should position properly for the hitter to '
                               'attack. \n ',
            'answer_id': '4',
            'next_id': '4'
        },

        '4': {
            'question_id': '4',
            'question_prompt': 'You most often scores the most points in the team. \n '
                               'You should not only score but also block the ball.  \n '
                               'Sometimes you are the backup of the setter. \n '
                               'Work with the middle hitter on blocks.',
            'answer_id': '5',
            'next_id': '5'
        },

        '5': {
            'question_id': '5',
            'question_prompt': 'You are the “bag of tools. \n '
                               'You play both the front row and the back row and should develop a variety of ways to '
                               '<b> attack </b> the ball. \n '
                               'You should read the opponent’s defense and call out hitters. \n',
            'answer_id': '1',
            'next_id': '0'
        },

    }
}

score = 0

quiz_level_1_responses = dict()


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
    global score

    score = 0
    return quiz_lv1('1')


# ajax for checking answer (LV 1, 3)
@app.route('/check', methods=['GET', 'POST'])
def check():
    global data
    global current_id
    global score

    json_data = request.get_json()

    user_ans = json_data["answer"]
    question = json_data["id"]
    lv = json_data["level"]

    print(user_ans, question, lv)
    correct_ans = '0'
    correct = False

    if lv == 1:
        correct_ans_id = quiz_level_1.get(question).get('answer_id')
        correct_ans = quiz_level_1.get(question).get('options').get(correct_ans_id)

    if lv == 3:
        correct_ans = quiz_level_3.get(question).get('answer_id')

    if user_ans == correct_ans:
        correct = True
        score += 1

    return jsonify(correct=correct, answer=correct_ans)


@app.route('/get_score', methods=['GET'])
def get_score():
    global score
    print('Inside get_score')
    return jsonify(score=str(score))


@app.route('/update_response', methods=['GET', 'POST'])
def update_response():
    global quiz_level_1_responses

    json_data = request.get_json()
    question_id = json_data["question_id"]
    option_id = json_data["option_id"]

    quiz_level_1_responses[question_id] = option_id

    return jsonify(responses=quiz_level_1_responses)


@app.route('/increase_score', methods=['GET'])
def increase_score():
    global score
    score += 1
    return jsonify(score=str(score))


@app.route('/quiz/1/<question_id>')
def quiz_lv1(question_id):
    if question_id == 'end':
        return render_template('quiz_intertitle.html', question_id=question_id, score=score)
    question = quiz_level_1[question_id]
    return render_template('quiz_level_1.html', question=question, question_id=question_id)


@app.route('/quiz/2/<quiz_id>')
def quiz_lv2(quiz_id):
    roles = quiz_level_2.get('roles')
    return render_template('quiz_level_2.html', roles=roles)

@app.route('/quiz/3/<question_id>')
def quiz_lv3(question_id):
    question = quiz_level_3['questions'][question_id]
    roles = quiz_level_3['roles']
    return render_template('quiz_level_3.html', question=question, question_id=question_id, roles=roles)


@app.route('/quiz/end')
def quiz_fin():
    # end page with score
    return render_template('quiz_end.html', score=score)


if __name__ == '__main__':
    app.run(debug=True)
