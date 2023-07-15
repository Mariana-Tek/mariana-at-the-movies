from flask import Flask, render_template, jsonify
from helper import get_movies
import conf
app = Flask(__name__)


@app.route('/movies', methods=["GET"])
def movies():
    movies = get_movies()
    return render_template(
        'movies.html',
         movies=movies
    )

if __name__ == '__main__':
    app.config.from_object(conf)
    app.run('localhost', port=5000)
