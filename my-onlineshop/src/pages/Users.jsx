import { useState } from "react";
import { Link } from "react-router-dom";

const Users = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const perPage = 5;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  // 🔍 SEARCH FILTER
  const filteredUsers = users.filter((u) =>
    u.username.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  // 📄 PAGINATION
  const totalPages = Math.ceil(filteredUsers.length / perPage);

  const start = (page - 1) * perPage;
  const paginatedUsers = filteredUsers.slice(
    start,
    start + perPage
  );

  // 🗑 DELETE USER
  const deleteUser = (index) => {
    const allUsers = [...users];
    allUsers.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(allUsers));
    window.location.reload();
  };

  // ✏ EDIT USER
  const editUser = (index) => {
    const newName = prompt("Enter new username:");
    if (!newName) return;

    const allUsers = [...users];
    allUsers[index].username = newName;

    localStorage.setItem("users", JSON.stringify(allUsers));
    window.location.reload();
  };

  // 👤 ROLE BADGE
  const getRole = (role) => {
    return role === "admin" ? "admin" : "user";
  };

  return (
    <div className="users-page">

      <h2>👥 Users Management</h2>

      {/* 🔍 SEARCH */}
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="search-box"
      />

      {/* EMPTY STATE */}
      {filteredUsers.length === 0 && (
        <p>No users found 😔</p>
      )}

      {/* USERS LIST */}
      <div className="users-grid">

        {paginatedUsers.map((u, i) => {
          const realIndex = start + i;

          return (
            <div className="user-card" key={realIndex}>

              {/* AVATAR */}
              <div className="avatar">
                {u.username.charAt(0).toUpperCase()}
              </div>

              {/* INFO */}
              <div className="user-info">
                <h3>{u.username}</h3>
                <p>{u.email}</p>

                <span className={getRole(u.role)}>
                  {getRole(u.role)}
                </span>
              </div>

              {/* ACTIONS */}
              <div className="actions">

                <Link to={`/users/${realIndex}`}>
                  View
                </Link>

                <button
                  onClick={() => editUser(realIndex)}
                >
                  ✏ Edit
                </button>

                <button
                  onClick={() => deleteUser(realIndex)}
                >
                  🗑 Delete
                </button>

              </div>

            </div>
          );
        })}

      </div>

      {/* 📄 PAGINATION */}
      <div className="pagination">

        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Prev
        </button>

        <span>
          Page {page} / {totalPages || 1}
        </span>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>

      </div>

    </div>
  );
};

export default Users;