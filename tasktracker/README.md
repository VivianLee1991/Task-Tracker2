# Tasktracker Part 3

A single-page web application:

1. In the "Register" page, two lines of passwords should be same to successfully register a new account.

2. A registered user could login and logout in the navigation bar.

3. When logged in, the user could add new task in the "Home" page, and manages his own tasks in the "My Tasks" page

4. All tasks are shown in the home page for any user to inspect all existing tasks. They could also see existing users in the app and their tasks in "All Users" page. But they can't edit them.

5. "My Tasks" page will show tasks designed by and to do by the registered user. Clicking the "Details", the user can see all the contents of the specified task. 

6. A designer who has designed a task can modify the title, description and worker (whom the task is assigned to) of the task, and even delete it from the database.

7. A worker can modify the time spent on the task and set the task as completed or not. But he can't delete it.

Note: a worker can adjust the time in 15-minitue step by clicking the tiny buttons in the left of the time form.


--------------------------------------------------------------------------------

Deployment steps on VPS:

1. git clone this project to ~/src/

2. add "{:distillery, "~> 1.5", runtime: false}"
   in tasktracker/mix.exs "defp deps do ... end"

   $ mix deps.get

3. $ cd assets
   $ npm install --save bootstrap popper.js jquery
   $ npm install --save-dev sass-brunch

4. create DB user (tasktracker) on VPS, and remeber its password (pw).
   ( manually move prod.secret.exs file to tasktracker/config/)
   configure DB user and password in prod.secret.exs

   in config/prod.exs, add "server: true," before "load_from_system_env: true"

5. $ MIX_ENV=prod mix ecto.create
   $ MIX_ENV=prod mix ecto.migrate

6. modify the project name to "tasktracker" and port number in deploy.sh
   and start.sh

7. configure the tasktracker.nginx in sites-available/ and sites-enabled/;
   sudo service nginx restart

8. $ mix release.init
   $ mix release

9. $ ./deploy.sh
   $ ./start.sh

--------------------------------------------------------------------------------

   To start your local Phoenix server:

     * Install dependencies with `mix deps.get`
     * Create and migrate your database with `mix ecto.create && mix ecto.migrate`
     * Install Node.js dependencies with `cd assets && npm install`
     * Start Phoenix endpoint with `mix phx.server`

   Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

   Ready to run in production? Please [check our deployment guides](http://www.phoenixframework.org/docs/deployment).

## Learn more

  * Official website: http://www.phoenixframework.org/
  * Guides: http://phoenixframework.org/docs/overview
  * Docs: https://hexdocs.pm/phoenix
  * Mailing list: http://groups.google.com/group/phoenix-talk
  * Source: https://github.com/phoenixframework/phoenix
