import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

class NewProject(prop){
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [fundingGoal, setFundingGoal] = useState('')
  const [balance, setBalance] = useState('')
  const [image, setImage] = useState('')
  const [dateGoal, setDateGoal] = useState('')
  const [category, setCategory] = useState('')

  const onSubmit = () => {
    const formData = new FormData()
    formData.append('title', title)

  }


  return (
    <form>
      <div>
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      </div>
      <div>
        <input placeholder="Description" type='text' value={description} onChange={e => setDescription(e.target.value)} />
      </div>
      <div>
        <input placeholder="Your funding goal" type='number' value={fundingGoal} onChange={e => setFundingGoal(e.target.value)} />
      </div>
      <div>
        <input placeholder="balance" type='number' value={balance} onChange={e => setBalance(e.target.value)} />
      </div>
      <div>
        <input placeholder="Image for project"  value={image} onChange={e => setImage(e.target.value)} />
      </div>
      <div>
        <text placeholder="Date for reaching goal" value={dateGoal} onChange={e => setDateGoal(e.target.value)} />
      </div>
      <div>
        <text placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
      </div>
      <button onClick={onSubmit}>Submit</button>
    </form>
  )
}

export default NewProject;
