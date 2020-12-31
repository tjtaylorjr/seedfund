import React, { useEffect } from "react";

const UserProfile = (props) => {
  const user = props.user;
  const userName = `${user.firstname} ${user.lastname}`;

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/users/${user.id}/pledges`);
      const res = await response.json();
      let match = res.pledges.filter((pledge) => pledge.user_id === user.id);
      // if (match.length) setPledges(true);
      console.log(res);
    })();
  }, [user]);

  return <h1>{userName}</h1>;
};

export default UserProfile;
