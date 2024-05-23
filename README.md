<h1>Taitaja 2024 - finals</h1>
<h2>About</h2>
<p style='font-size: 16px; text-align: justify; text-justify: inter-word;'>
  This project is the Taitaja 2024 finals task.

This project includes an /assets folder, which includes 4 wireframe designs for
the website of Retro Game House. These wireframes include the front page and the
specific game page for both desktop and mobile.

The /assets folder also includes a planing document for the wireframes and the
reasons for specific design choices and what kind of effect they have on the
end-user.

<h5>Frontend</h5>
This project also includes a frontend website consisting of two pages / and /peli.
On the Index page: games can be browsed which are loaded from a JSON file and on the
Game page each specific game can be looked at. The Game page also includes an Hall of Fame
where players top scores are listed.

Note: Game images are not yet supported and a placeholder image is shown for all games.

<h5>Intranet</h5>
There's an intranet where admins and users can log in. The login can be seen under
the /login page. I have created two users (admin & user) with the credentials described in
the task.

On the intranet, admins can create, modify (change password) and delete other users. The delete functionality is
a hard deletion. Admins can also modify the title and Hall of Fame shown scores of games.

Games can also be viewed on the intranet and can be modified. New games can also be created.
Did not have time to finish the image support.

Users with the 'user' role can change their password on the intranet.

The username and a logout button are in the header for all logged in users.

<h5>Snake game</h5>
There's a snake game under /pelit/matopeli, with 2 snakes. One is moved by using WASD and the other one
is moved by using the arrow keys. The conditions for getting scores is eating the
randomly positioned apple with either snake. The game is lost if the snakes collide
with themself or each other.

After the game is over, the score can be stored with an username and then it can be
seen on the Hall of Fame at the start screen of the Snake game. Storing of the score
is not required and can be skipped by pressing no when asked about saving the score.

Note about the technical side: At the moment, for fetching the scores from the database
we're using hard-coded value for the Game title ("Snake"), the title column is UNIQUE
in the database, so there can't be two games with the same name.
</p>
<!-- <h2>Usage</h2> -->
<h2>Project Languages</h2>
<ul style='font-size 16px;'>
  <li>React / JavaScript</li>
  <li>CSS3</li>
</ul>
<h2>Project Libraries</h2>
<ul style='font-size: 16px'>
  <li>Node v21.2.0</li>
  <li>Check package.json...</li>
</ul>
