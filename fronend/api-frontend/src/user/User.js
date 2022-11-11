import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";

function User(props) {
  const [users, setUsers] = useState();
  const [options, setOptions] = useState({ isLoading: false, hasMore: false });
  const [filters, setFilters] = useState({ pageIndex: 0, pageSize: 25 });

  const { id } = useParams();
  useEffect(() => {
    fetch("/users/v1/getAll")
      .then((response) => response.json())
      .then((response) => {
        setUsers(response);
      });
  });

  const handleDelete = (id) => {
    return new Promise((resolve, reject) => {
      fetch("/users/v1/delete/" + id, { method: "DELETE" })
        .then((response) => {
          resolve(response);
        })
        .catch((response) => {
          reject(response);
        });
    });
  };

  const handleDeleteConfirm = (e, item, index) => {
    e.preventDefault();
    handleDelete(item).then(() => {
      users.splice(index, 1);
      setUsers([...users]);
    });
  };

  const handleInfiniteScroll = () => {
    setOptions({ ...options, hasMore: false, isLoading: false });
    setFilters({ ...filters, pageIndex: filters.pageIndex + 1 });
  };

  var items = [];
  users &&
    users.data.map((item, index) =>
      items.push(
        <li key={index} className="bg-color-mid-blue p-4 mb-4 w-100">
          <div className="row">
            <div className="col-md-6 d-flex text-truncate">
              <div>
                <span className="d-block font-1_3em line-height-1_3em mb-1 font-medium text-truncate">
                  {item.name}
                </span>
              </div>
            </div>
            <div className="col-md-3 d-flex">
              <div className="m-auto">
                <span className="d-block font-1_1em">{item.location}</span>
              </div>
            </div>
            <div className="col-md-3 d-flex">
              <div className="my-auto ms-auto text-end">
                <span className="font-0_8em color-light-gray d-block">
                  Status
                </span>
              </div>
            </div>
          </div>
          <div className="border-top-1px border-dashed border-dark-gray mt-3 pt-3 d-flex">
            <div className="col-md-3 d-flex">
              <div className="ms-auto">
                <Link
                  to={"/common/assignments/" + item.id + "/edit"}
                  className="d-inline-block font-0_9em font-bold bg-color-black color-white border-rad-4px white-space-nowrap px-4 py-2 me-3"
                >
                  <i class="fa-duotone fa-file-pen me-2"></i>Edit
                </Link>
                <a
                  href="#"
                  onClick={(e) => handleDeleteConfirm(e, item.id)}
                  className="d-inline-block font-0_9em font-bold bg-color-black color-white border-rad-4px white-space-nowrap px-4 py-2"
                >
                  <i className="fa-duotone fa-trash-can me-2"></i>Delete
                </a>
              </div>
            </div>
          </div>
        </li>
      )
    );

  return (
    <div className="position-relative d-flex flex-column px-4 py-5 h-100">
      <div className="d-flex white-space-nowrap">
        <div className="d-flex flex-row m-auto">
          <div className="me-3 my-auto font-1_1em text-end font-medium">
            Create
            <br />
            New User
          </div>
          <div>
            <Link
              to="/users/new"
              className="option d-inline-block rounded-circle w-56px h-56px bg-color-green d-flex"
            >
              <i className="font-1_8em fa-solid fa-plus m-auto"></i>
            </Link>
          </div>
        </div>
      </div>
      {items.length === 0 ? (
        <div className="bg-color-mid-blue p-3 border-rad-8px font-0_9em">
          No items to display...
        </div>
      ) : (
        <InfiniteScroll
          element="ul"
          loadMore={handleInfiniteScroll}
          hasMore={options.hasMore && !options.isLoading}
          loader={
            <div className="w-100 text-center p-3 font-0_9em" key={0}>
              Loading...
            </div>
          }
        >
          {items}
        </InfiniteScroll>
      )}
    </div>
  );
}

export default User;
