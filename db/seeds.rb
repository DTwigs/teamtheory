# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

superuser = Role.create(:id => 1, :identifier => "superuser")
admin = Role.create(:id => 2, :identifier => "admin")
community_user = Role.create(:id => 3, :identifier => "community_user")

g = Game.create({short_name: 'CS:GO', long_name: 'Counter-Strike: Global Offensive'})
m = Map.create({name: 'Mirage'})
i = Instructor.create({name: 'Anarchay'})
v = Video.create({game: g, youtube_id: 'scxS-MK3HMo', map: m, title: 'How To Execute Mirage A', description: 'A quick video describing a straight forward ramp and palace A take on Mirage', duration: '5:25', instructor: i})
vts = VideoBookmarkType.create(identifier: 'smoke')
vtm = VideoBookmarkType.create(identifier: 'fire')
vtf = VideoBookmarkType.create(identifier: 'flash')

bookmarks = [
      {
        time_in_seconds: 0,
        description: 'Mirage A Site: Smokes, Molly, Flash',
        video: v,
      },
      {
        time_in_seconds: 2,
        description: 'Smoke: Stairs',
        video: v,
        video_bookmark_type_id: vts.id,
      },
      {
        time_in_seconds: 6,
        description: 'Smoke: CT',
        video: v,
        video_bookmark_type_id: vts.id,
      },
      {
        time_in_seconds: 13,
        description: 'Smoke: Jungle/Connector',
        video: v,
        video_bookmark_type_id: vts.id,
      },
      {
        time_in_seconds: 18,
        description: 'Flash: Entry',
        video: v,
        video_bookmark_type_id: vtf.id,
      },
      {
        time_in_seconds: 32,
        description: 'Molotov: Under Palace',
        video: v,
        video_bookmark_type_id: vtm.id,
      },
      {
        time_in_seconds: 72,
        description: 'Angles to deal with when entering A',
        video: v,
      },
      {
        time_in_seconds: 144,
        description: 'Tetris Hold',
        video: v,
      },
      {
        time_in_seconds: 200,
        description: 'The Ground Push: Various ways to push on A site',
        video: v,
      },
    ]

bookmarks.each do |b|
  VideoBookmark.create(b)
end


