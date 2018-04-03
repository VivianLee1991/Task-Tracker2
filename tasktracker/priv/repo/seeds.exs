# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Tasktracker.Repo.insert!(%Tasktracker.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

defmodule Seeds do
  alias Tasktracker.Repo
  alias Tasktracker.Users.User
  alias Tasktracker.Tasks.Task

  def run do
    p = Comeonin.Argon2.hashpwsalt("password1")

    Repo.delete_all(User)
    alice = Repo.insert!(%User{ name: "alice", email: "alice@gmail.com", password_hash: p })
    bob   = Repo.insert!(%User{ name: "bob", email: "bob@gmail.com", password_hash: p })
    carol = Repo.insert!(%User{ name: "carol", email: "carol@gmail.com", password_hash: p })
    dave  = Repo.insert!(%User{ name: "dave", email: "dave@gmail.com", password_hash: p })

    Repo.delete_all(Task)
    Repo.insert!(%Task{ title: "task1", description: "alice assigns task1 to bob",
                        time: 0, complete: false,
                        designer_id: alice.id, worker_id: bob.id})
    Repo.insert!(%Task{ title: "task2", description: "alice assigns task2 to carol",
                        time: 0, complete: false,
                        designer_id: alice.id, worker_id: carol.id})
    Repo.insert!(%Task{ title: "task3", description: "bob assigns task3 to carol",
                        time: 0, complete: false,
                        designer_id: bob.id, worker_id: carol.id})
    Repo.insert!(%Task{ title: "task4", description: "dave assigns task4 to alice",
                        time: 0, complete: false,
                        designer_id: dave.id, worker_id: alice.id})
  end
end

Seeds.run
