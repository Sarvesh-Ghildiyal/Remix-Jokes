export default function JokesNew() {
  return (
    <div>
      <p>Add your hilarious joke</p>
      <form action="" method="post">
        <div>
          <label>
            Name: <input type="text" name="name" />
          </label>
        </div>

        <div>
          <label>
            Content <input type="text" name="content" />
          </label>
        </div>

        <div>
          <button type="submit" className="button">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
