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
    const response = await fetch("/api/projects/", {
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
    history.push(`/project/${project.id}`);
  };

  return (
    <>
      <div className="new-project-page__main-container">
        <div className="new-project-form__main-container">
          <div className="new-project-form__header">New Project</div>
          <form className="new-project-form__form-container">
            <div className="new-project-form__title">
              <input
                placeholder="Title"
                className="new-project-form__input-field"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="new-project-form__description">
              <textarea
                placeholder="Tell us more about your idea!"
                className="new-project-form__textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="new-project-form__description">
              <input
                placeholder="Your funding goal ($USD)"
                className="new-project-form__input-field"
                type="number"
                min="0.00"
                step="1.00"
                max="10000000.00"
                value={fundingGoal}
                onChange={(e) => setFundingGoal(e.target.value)}
              />
            </div>
            <div className="new-project-form__image">
              <input
                placeholder="Project image (please insert an image link)"
                className="new-project-form__input-field"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <div className="new-project-form__category">
              <select
                value={category}
                className="new-project-form__select-field"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" disabled selected>
                  Select a category
                </option>
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
            <button
              className="new-project-form__submit-button"
              onClick={submit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default NewProject;
