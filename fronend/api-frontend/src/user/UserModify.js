import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function UserModify(props) {
  const [users, setUsers] = useState();
  const [options, setOptions] = useState({ isLoading: false, redirect: true });

  const { id } = useParams();
  let navigate = useNavigate();
  // this func. call all user if users exist, or create new user page
  useEffect(() => {
    const getUser = () => {
      return new Promise((resolve, reject) => {
        fetch("/services/assignments/" + (props.purpose === "new" ? "" : +id))
          .then((response) => response.json())
          .then((response) => resolve(response))
          .catch((response) => reject(response));
      });
    };

    Promise.all([getUser()])
      .then((results) => {
        setUsers(results[0]);
      })
      .finally(() => {
        setOptions({ ...options, isLoading: false });
      });
  });

  const handleUpdateAction = (redirect) => {
    setOptions({ ...options, redirect });
  };

  const handleUsersChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setUsers({ ...users, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOptions({ ...options, isLoading: true });

    let data = new FormData(e.target);

    if (props.purpose === "new")
      createUsers(data)
        .then(() => {
          setOptions({ ...options, isLoading: false });
          navigate("/user");
        })
        .finally(() => {
          setOptions({ ...options, isLoading: false });
        });
    else
      userEdit(data)
        .then(() => {
          setOptions({ ...options, isLoading: false });
          if (options.redirect) navigate("/authors");
        })
        .finally(() => {
          setOptions({ ...options, isLoading: false });
        });
  };
  const createUsers = (data) => {
    return new Promise((resolve, reject) => {
      fetch("/users/v1/create", { method: "POST", body: data })
        .then((response) => response.json())
        .then((response) => {
          resolve(response);
        })
        .catch((response) => {
          reject(response);
        });
    });
  };

  const userEdit = (data) => {
    return new Promise((resolve, reject) => {
      fetch("/users/v1/update/" + id, { method: "PUT", body: data })
        .then((response) => response.json())
        .then((response) => {
          resolve(response);
        })
        .catch((response) => {
          reject(response);
        });
    });
  };

  return (
    <div className="container h-100 position-relative">
      <form className="flat pb-5" onSubmit={handleSubmit}>
        <div className="bg-color-mid-blue p-5 border-rad-8px mb-5">
          <label className="color-light-gray font-bold mb-1">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Full Name"
            value={users.name}
            onChange={handleUsersChange}
          />
        </div>

        <div className="bg-color-mid-blue p-5 border-rad-8px mb-4">
          <div className="form-group mb-none">
            <label className="color-light-gray font-bold mb-1">Location</label>
            <input
              type="text"
              className="form-control"
              name="location"
              placeholder="Location"
              value={users.name}
              onChange={handleUsersChange}
            />
          </div>

          <div className="form-group mb-none mt-5">
            <label className="color-light-gray font-bold mb-1">Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              placeholder="Title"
              value={users.name}
              onChange={handleUsersChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 text-start">
            <Link
              to="/common/authors"
              className="d-inline-block bg-color-dark-gray border-rad-4px font-1_1em font-medium color-mid-gray px-5 py-2"
            >
              Cancel
            </Link>
          </div>
          <div className="col-md-6 text-end">
            {props.purpose === "new" ? (
              <button
                type="submit"
                className="bg-color-grad-green border-0 border-rad-4px font-1_1em font-bold color-white px-5 py-2"
              >
                Create
              </button>
            ) : (
              <>
                <button
                  type="submit"
                  className="bg-color-green border-0 border-rad-4px font-1_1em font-bold color-white px-5 py-2 me-3"
                  onClick={() => handleUpdateAction(false)}
                >
                  Save
                </button>
                <button
                  type="submit"
                  className="bg-color-green border-0 border-rad-4px font-1_1em font-bold color-white px-5 py-2"
                  onClick={() => handleUpdateAction(true)}
                >
                  Save & Close
                </button>
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default UserModify;
