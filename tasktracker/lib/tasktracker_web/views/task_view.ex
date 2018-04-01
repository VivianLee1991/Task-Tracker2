defmodule TasktrackerWeb.TaskView do
  use TasktrackerWeb, :view
  alias TasktrackerWeb.TaskView
  alias TasktrackerWeb.UserView

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    %{id: task.id,
      title: task.title,
      description: task.description,
      time: task.time,
      complete: task.complete,
      designer: render_one(task.designer, UserView, "user.json"),
      worker: render_one(task.worker, UserView, "user.json")
    }
  end
end
