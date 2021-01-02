import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

function ProjectEdit(props) {
  // const [project, setProject] = useState({})
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fundingGoal, setFundingGoal] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/projects/${id}`);
      const res = await response.json();
      setTitle(res.title);
      setDescription(res.description);
      setFundingGoal(res.funding_goal);
      setImage(res.image);
      setCategory(res.category);
    })();
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
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
      <div className="edit-project-page__main-container">
        <div className="edit-project-form__main-container">
          <form className="edit-project-form__form-container">
            <div className="edit-project-form__title">
              <input
                className="edit-project-form__input-field"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="edit-project-form__description">
              <textarea
                value={description}
                className="edit-project-form__textarea"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="edit-project-form__description">
              <input
                value={fundingGoal}
                className="edit-project-form__input-field"
                type="number"
                min="0.00"
                step="1.00"
                max="10000000.00"
                onChange={(e) => setFundingGoal(e.target.value)}
              />
            </div>
            <div className="edit-project-form__image">
              <input
                value={image}
                className="edit-project-form__input-field"
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <div className="edit-project-form__category">
              <select
                className="edit-project-form__select-field"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value=""></option>
                <option
                  selected={category === 'Arts' ? true : false}
                  value="Art"
                >
                  Art
                </option>
                <option
                  selected={category === 'Comics' ? true : false}
                  value="Comic"
                >
                  Comic
                </option>
                <option
                  selected={category === 'Crafts' ? true : false}
                  value="Crafts"
                >
                  Crafts
                </option>
                <option
                  selected={category === 'Dance' ? true : false}
                  value="Dance"
                >
                  Dance
                </option>
                <option
                  selected={category === 'Design' ? true : false}
                  value="Design"
                >
                  Design
                </option>
                <option
                  selected={category === 'Fashion' ? true : false}
                  value="Fashion"
                >
                  Fashion
                </option>
                <option
                  selected={category === 'Film' ? true : false}
                  value="Film/Video"
                >
                  Film & Video
                </option>
                <option
                  selected={category === 'Food' ? true : false}
                  value="Food"
                >
                  Food
                </option>
                <option
                  selected={category === 'Games' ? true : false}
                  value="Games"
                >
                  Games
                </option>
                <option
                  selected={category === 'Journalism' ? true : false}
                  value="Journalism"
                >
                  Journalism
                </option>
                <option
                  selected={category === 'Music' ? true : false}
                  value="Music"
                >
                  Music
                </option>
                <option
                  selected={category === 'Photography' ? true : false}
                  value="Photography"
                >
                  Photography
                </option>
                <option
                  selected={category === 'Publishing' ? true : false}
                  value="Publishing"
                >
                  Publishing
                </option>
                <option
                  selected={category === 'Technology' ? true : false}
                  value="Technology"
                >
                  Technology
                </option>
                <option
                  selected={category === 'Theater' ? true : false}
                  value="Theater"
                >
                  Theater
                </option>
                <option
                  selected={category === 'Other' ? true : false}
                  value="Other"
                >
                  Other
                </option>
              </select>
            </div>
            <button
              className="edit-project-form__submit-button"
              onClick={submit}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ProjectEdit;
