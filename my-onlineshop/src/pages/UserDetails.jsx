import { useParams } from "react-router-dom";

const UserDetails = () => {
  const { id } = useParams();

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users[id];

  if (!user) return <h2 className="not-found">User Not Found</h2>;

  return (
    <div className="user-details">

      <div className="user-card-large">

        <div className="avatar big">
          {user.username.charAt(0).toUpperCase()}
        </div>

        <h2>{user.username}</h2>

        <div className="info-box">
          <p><b>Email:</b> {user.email}</p>
        </div>

      </div>

    </div>
  );
};

export default UserDetails;