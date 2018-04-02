defmodule Tasktracker.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset
  alias Tasktracker.Users.User


  schema "tasks" do
    field :complete, :boolean, default: false
    field :description, :string
    field :time, :integer, default: 0
    field :title, :string
    belongs_to :designer, User
    belongs_to :worker, User

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:title, :description, :time, :complete, :designer_id, :worker_id])
    |> validate_required([:title, :description, :time, :complete, :designer_id, :worker_id])
  end
end
