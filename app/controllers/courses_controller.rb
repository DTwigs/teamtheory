class CoursesController < ApplicationController
  def index

  end

  def show
    @notes = [
      {
        'id': '1',
        'time': 0,
        'description': 'Mirage A Site: Smokes, Molly, Flash'
      },
      {
        'id': '2',
        'time': 2,
        'description': 'Smoke: Stairs'
      },
      {
        'id': '3',
        'time': 6,
        'description': 'Smoke: CT'
      },
      {
        'id': '4',
        'time': 13,
        'description': 'Smoke: Jungle/Connector'
      },
      {
        'id': '5',
        'time': 18,
        'description': 'Flash: Entry'
      },
      {
        'id': '6',
        'time': 32,
        'description': 'Molotov: Under Palace'
      },
      {
        'id': '7',
        'time': 72,
        'description': 'Angles to deal with when entering A'
      },
      {
        'id': '8',
        'time': 144,
        'description': 'Tetris Hold'
      },
      {
        'id': '9',
        'time': 200,
        'description': 'The Ground Push: Various ways to push on A site'
      },
    ].to_json
  end
end