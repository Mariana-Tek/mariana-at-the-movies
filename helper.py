import os
import json

def get_movies():
    try:
        movies_json = os.path.abspath(os.path.join(os.path.abspath(os.path.dirname(__file__)),  'movies', 'index.json'))
        fp = open(movies_json, 'r')
        return json.loads(fp.read())
    except Exception as err:
        print(err)
        return {}
