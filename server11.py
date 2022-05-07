from flask import Flask
from flask import render_template
from flask import Response, request, jsonify

app = Flask(__name__)

score = 0

score_lvl_1 = 0

score_lvl_2 = 0

score_lvl_3 = 0

lessons = {

    "1": {"lesson_id": "1", "title": "SETTING", "image": "https://i.ibb.co/tKTB75g/setter.png",
        "gif": "https://i.ibb.co/9cct0C4/setting.gif", "text": "You are the quarterback of the team!",
        "summary": "Setters set the ball up for the attackers/hitters to score. A coach must be able to rely on the "
                   "setter to make sound, consistent decisions.",
        "demands": ["1.Ability to set the ball to the left-front position", "2. Move all around the court",
                    "3. Set high enough and position properly for the hitter to attack."], "next_lesson": "2"},

    "2": {"lesson_id": "2", "title": "LIBERO", "image": "https://i.ibb.co/4Vmy6mp/libero.png",
        "gif": "https://i.ibb.co/mBKLpGy/libero.gif", "text": "You are the defender of the team.",
        "summary": "As the libero you know you’ll be receiving serves all day long. Adapt and make changes when your "
                   "teammates are getting picked on.",
        "demands": ["1. Always play in the back row.", "2. Receive opponent’s attacks and serves",
                    "3. Wear a different color jersey."], "next_lesson": "3"},

    "3": {"lesson_id": "3", "title": "OUTSIDE HITTER", "image": "https://i.ibb.co/pZKk0KT/layout-2.png",
        "gif": "https://i.ibb.co/qx9J19b/outside-hitter.gif", "text": "You are the “bag of tools”. ",
        "summary": "You play both the front row and the back row and should develop a variety of ways to attack the "
                   "ball.", "demands": ["1. After the serve, place yourself to the left front position",
                                        "2. Read the opponent’s defense and call out hitters."], "next_lesson": "4"},

    "4": {"lesson_id": "4", "title": "MIDDLE BLOCKING", "image": "https://i.ibb.co/HKZhsVf/middleblocker.png",
        "gif": "https://i.ibb.co/4SypYDP/blocker.gif", "text": "You are the team’s tallest athlete! ",
        "summary": "Your role is to block the opposing team’s attack so be ready for the opponent’s quick middle "
                   "attacks. But also move to either side to help teammates close blocks with the opposite hitter and "
                   "outside hitter.", "demands": ["1. Also work as a hitter to attack.",
                                                  "2. Quick evaluation skills to anticipate the opposing team’s attack."],
        "next_lesson": "5"},

    "5": {"lesson_id": "5", "title": "OPPOSITE HITTER", "image": "https://i.ibb.co/dGkJ8XH/oppositehitter.png",
        "gif": "https://i.ibb.co/MV62r1r/opposite.gif",
        "text": "You most often score the most points in the team - no pressure!",
        "summary": "Your role is to score and block the ball. Be the backup of the setter when the traditional setter "
                   "is unable to get to the ball.",
        "demands": ["1. Attack the ball when receiving a set.", "2. Work with the middle hitter on blocks.",
                    "3. Best for left-handed players."], "next_lesson": "end"}, }

quiz_level_1 = {
    '1': {'question_id': '1', 'question': 'Which of the following is NOT required for a game of volleyball?',
        'options': {'1': 'High Net', '2': 'Ball', '3': 'Whistle', '4': 'Court'}, 'answer_id': '3', 'next_id': '2'},
    '2': {'question_id': '2', 'question': 'How many players are on a volleyball team?',
        'options': {'1': 'five', '2': 'six', '3': 'seven', '4': 'eight'}, 'answer_id': '2', 'next_id': '3'},
    '3': {'question_id': '3', 'question': 'What move is used to begin a round of volleyball?',
        'options': {'1': 'spike', '2': 'block', '3': 'hit', '4': 'serve'}, 'answer_id': '4', 'next_id': '4'},
    '4': {'question_id': '4', 'question': 'How many touches does a team have in a round?',
        'options': {'1': 'one', '2': 'two', '3': 'three', '4': 'four'}, 'answer_id': '3', 'next_id': '5'},
    '5': {'question_id': '5',
        'question': 'If a player grounds the ball on the opponent’s court, he/she scores a point by making a _____.',
        'options': {'1': 'kill', '2': 'dig', '3': 'fault', '4': 'block'}, 'answer_id': '1', 'next_id': 'end'}, }

quiz_level_2 = {
    'roles': {'1': 'Setter', '2': 'Libero', '3': 'Outside hitter', '4': 'Outside hitter (left)', '5': 'Opposite hitter',
              '6': 'Middle blocker'}, }

quiz_level_3 = {
    'roles': {'1': "Outside Hitter", '2': "Middle Blocker", '3': "Libero", '4': "Setter", '5': "Opposite Hitter"},
    'questions': {'1': {'question_id': '1', 'question_prompt': 'You are the defender of the team. \n '
                                                               'You receive serves all day long. \n '
                                                               'You always play in the back row \n '
                                                               'You should wear a different color jersey',
        'answer_id': 3, 'next_id': '2'},

        '2': {'question_id': '2', 'question_prompt': 'You are the team\'s tallest athlete \n '
                                                     'You should block the opposing team’s attack \n '
                                                     'You should also hit to attack \n '
                                                     'You should act as a decoy to help confuse opponents and spread out their blockers.',
            'answer_id': 2, 'next_id': '3'},

        '3': {'question_id': '3', 'question_prompt': 'You are the quarterback of the team. \n '
                                                     'The coach relies on you to make sound consistent decisions. \n '
                                                     'You should position properly for the hitter to '
                                                     'attack. \n ', 'answer_id': 4, 'next_id': '4'},

        '4': {'question_id': '4', 'question_prompt': 'You most often scores the most points in the team. \n '
                                                     'You should not only score but also block the ball.  \n '
                                                     'Sometimes you are the backup of the setter. \n '
                                                     'Work with the middle hitter on blocks.', 'answer_id': 5,
            'next_id': '5'},

        '5': {'question_id': '5', 'question_prompt': 'You are the “bag of tools". \n '
                                                     'You play both the front row and the back row and should develop a variety of ways to '
                                                     'attack the ball. \n '
                                                     'You should read the opponent’s defense and call out hitters. \n',
            'answer_id': 1, 'next_id': 'end'},

    }}

quiz_level_1_responses = {}

quiz_level_2_empty_dic = {'empty_roles': {'1': '', '2': '', '3': '', '4': '', '5': '', '6': ''}, }

contents = {
    '1': {
        'content_id': '1',
        'long_title': 'Team Layout',
        'short_title': 'Team Layout',
        'url': '/team_layout',
        'prev_id': 'home',
        'next_id': '2',
    },
    '2': {
        'content_id': '2',
        'long_title': 'Gameplay',
        'short_title': 'Gameplay',
        'url': '/gameplay',
        'prev_id': '1',
        'next_id': '3',
    },
    '3': {
        'content_id': '3',
        'long_title': 'Role 1: Setter',
        'short_title': 'Setter',
        'url': '/learn/1/1',
        'prev_id': '2',
        'next_id': '4',
    },
    '4': {
        'content_id': '4',
        'long_title': '&nbsp;&nbsp;&nbsp;&nbsp;Strategy',
        'short_title': 'Set Strategy',
        'url': '/learn/1/2',
        'prev_id': '3',
        'next_id': '5',
    },
    '5': {
        'content_id': '5',
        'long_title': 'Role 2: Libero',
        'short_title': 'Libero',
        'url': '/learn/2/1',
        'prev_id': '4',
        'next_id': '6',
    },
    '6': {
        'content_id': '6',
        'long_title': '&nbsp;&nbsp;&nbsp;&nbsp;Strategy',
        'short_title': 'Libero Strategy',
        'url': '/learn/2/2',
        'prev_id': '5',
        'next_id': '7',
    },
    '7': {
        'content_id': '7',
        'long_title': 'Role 3: Outside Hitter',
        'short_title': 'Outside Hitter',
        'url': '/learn/3/1',
        'prev_id': '6',
        'next_id': '8',
    },
    '8': {
        'content_id': '8',
        'long_title': '&nbsp;&nbsp;&nbsp;&nbsp;Strategy',
        'short_title': 'Hit Strategy',
        'url': '/learn/3/2',
        'prev_id': '7',
        'next_id': '9',
    },
    '9': {
        'content_id': '9',
        'long_title': 'Role 4: Middle Blocker',
        'short_title': 'Middle Blocker',
        'url': '/learn/4/1',
        'prev_id': '8',
        'next_id': '10',
    },
    '10': {
        'content_id': '10',
        'long_title': '&nbsp;&nbsp;&nbsp;&nbsp;Strategy',
        'short_title': 'Block Strategy',
        'url': '/learn/4/2',
        'prev_id': '9',
        'next_id': '11',
    },
    '11': {
        'content_id': '11',
        'long_title': 'Role 5: Opposite Hitter',
        'short_title': 'Opposite Hitter',
        'url': '/learn/5/1',
        'prev_id': '10',
        'next_id': '12',
    },
    '12': {
        'content_id': '12',
        'long_title': '&nbsp;&nbsp;&nbsp;&nbsp;Strategy',
        'short_title': 'Hit Strategy',
        'url': '/learn/5/2',
        'prev_id': '11',
        'next_id': '13',
    },
    '13': {
        'content_id': '13',
        'long_title': '',
        'short_title': 'Quiz',
        'url': '/quiz/1/1',
        'prev_id': '12',
        'next_id': '',
    },
}

# ROUTES

@app.route('/')
def home_page():
    return render_template('home_page.html')


@app.route('/team_layout')
def team_layout():
    return render_template('team_layout.html', contents=contents)


@app.route('/gameplay')
def gameplay():
    return render_template('gameplay.html', contents=contents)


# Learning Section

@app.route('/learn/<lesson_id>/1')
def learn_role(lesson_id):
    print(lesson_id)
    lesson = lessons[lesson_id]
    return render_template('learn_role.html', contents=contents, lesson=lesson, lesson_id=lesson_id)


@app.route('/learn/<lesson_id>/2')
def learn_strategy(lesson_id):
    print(lesson_id)
    lesson = lessons[lesson_id]
    return render_template('learn_strategy.html', contents=contents, lesson=lesson, lesson_id=lesson_id)


# Quiz Utilities

@app.route('/get_score/<level_id>', methods=['GET'])
def get_score(level_id):
    global score_lvl_1
    global score_lvl_2
    global score_lvl_3

    if level_id == '1':
        return jsonify(score=str(score_lvl_1))
    elif level_id == '2':
        return jsonify(score=str(score_lvl_2))
    else:
        return jsonify(score=str(score_lvl_3))


@app.route('/increase_score/<level_id>', methods=['GET'])
def increase_score(level_id):
    global score_lvl_1
    global score_lvl_2
    global score_lvl_3

    if level_id == '1':
        score_lvl_1 += 1
        return jsonify(score=str(score_lvl_1))
    elif level_id == '2':
        score_lvl_2 += 1
        return jsonify(score=str(score_lvl_2))
    else:
        score_lvl_3 += 1
        return jsonify(score=str(score_lvl_3))


@app.route('/quiz')
def quiz():
    global score_lvl_1
    global score_lvl_2
    global score_lvl_3

    score_lvl_1 = 0
    score_lvl_2 = 0
    score_lvl_3 = 0
    return quiz_lv1('1')


# For Quiz 1

@app.route('/quiz/1/<question_id>')
def quiz_lv1(question_id):
    if question_id == 'end':
        return render_template('quiz_intertitle.html', level='1', score=score_lvl_1, total=5)
    question = quiz_level_1[question_id]
    return render_template('quiz_level_1.html', question=question, question_id=question_id)


@app.route('/update_response', methods=['GET', 'POST'])
def update_response():
    global quiz_level_1_responses

    json_data = request.get_json()
    question_id = json_data["question_id"]
    option_id = json_data["option_id"]

    quiz_level_1_responses[question_id] = option_id

    return jsonify(responses=quiz_level_1_responses)


# For Quiz 2

@app.route('/quiz/2/<quiz_id>')
def quiz_lv2(quiz_id):
    if quiz_id == 'end':
        return render_template('quiz_intertitle.html', level='2', score=score_lvl_2, total=6)
    roles = quiz_level_2.get('roles')
    test_roles = quiz_level_2_empty_dic.get('empty_roles')
    return render_template('quiz_level_2.html', roles=roles, test_roles=test_roles, totalquizscore=score)


# For Quiz 3

@app.route('/quiz/3/<question_id>')
def quiz_lv3(question_id):
    global score_lvl_3

    if (question_id == "end"):
        total_score = int(score_lvl_1) + int(score_lvl_2) + int(score_lvl_3)
        return render_template('quiz_final_score.html', score_lvl_1=score_lvl_1, score_lvl_2=score_lvl_2,
                               score_lvl_3=score_lvl_3, total_score=total_score)

    active = {1: "Outside Hitter", 2: "Middle Blocker", 3: "Libero", 4: "Setter", 5: "Opposite Hitter"}

    for x in range(int(question_id) - 1):
        active.pop(int(quiz_level_3.get('questions').get(str(x + 1)).get('answer_id')))

    question = quiz_level_3['questions'][question_id]
    return render_template('quiz_level_3.html', roles=active, score=score_lvl_3, question=question,
                           question_id=question_id)


@app.route('/submit_role', methods=['GET', 'POST'])
def submit_role():
    global score_lvl_3
    json_data = request.get_json()
    question_id = json_data["question_id"]

    user_answer = json_data["answer"]

    correct = False

    answer_id = quiz_level_3.get('questions')[question_id].get("answer_id")
    answer = quiz_level_3.get('roles').get(str(answer_id))
    print(user_answer, answer)
    if user_answer == answer:
        score_lvl_3 += 1
        correct = True

    return jsonify(correct=correct, answer=answer)


if __name__ == '__main__':
    app.run(debug=True)
