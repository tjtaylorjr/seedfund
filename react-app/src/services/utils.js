// a and b are javascript Date objects
export function dateDiffInDays(date_goal) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  const a = new Date();
  const b = new Date(date_goal);
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

export const getPledgeCount = async(id) => {
  const res = await fetch(`/api/projects/${id}/pledges`, {
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    throw res
  }

  const data = await res.json();
  const totalPledged = data.pledges.length;
  return totalPledged;
}

export const getCreatorName = async(id) => {
  const res = await fetch(`/users/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    throw res
  }

  const data = await res.json();
  const {firstname, lastname} = data;
  return firstname + ' ' + lastname;
}

export const fillBar = (balance, funding_goal) => {
  const current = parseInt((balance * 100) / funding_goal)
  let progress;
  if (current > 100) {
    progress = "100%"
  } else {
    progress = current + "%"
  }
  const styling = { width: progress }
  return styling;
}
