import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function NewProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fundingGoal, setFundingGoal] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/project/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        fundingGoal,
        image,
        category,
      }),
    });
    const project = await response.json();
    history.push(`/project/${project.title}`);
  };

  return (
    <form>
      <div>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <input
          placeholder="Description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        $
        <input
          placeholder="Your funding goal "
          type="number"
          min="0.00"
          step="1.00"
          max="10000000.00"
          value={fundingGoal}
          onChange={(e) => setFundingGoal(e.target.value)}
        />
      </div>
      <div>
        <input
          placeholder="Image for project"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <div>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value=""></option>
          <option value="Art">Art</option>
          <option value="Comic">Comic</option>
          <option value="Crafts">Crafts</option>
          <option value="Dance">Dance</option>
          <option value="Design">Design</option>
          <option value="Fashion">Fashion</option>
          <option value="Film/Video">Film & Video</option>
          <option value="Food">Food</option>
          <option value="Games">Games</option>
          <option value="Journalism">Journalism</option>
          <option value="Music">Music</option>
          <option value="Photography">Photography</option>
          <option value="Publishing">Publishing</option>
          <option value="Technology">Technology</option>
          <option value="Theater">Theater</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <button onClick={submit}>Submit</button>
    </form>
  );
}

export default NewProject;
