import React, { useEffect, useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { taskAction } from "../store/taskSlice";
import "./Home.css";
import axios from "axios";
import Paginate from "./Paginate";
import { loginAction } from "../store/loginSlice";
import { Redirect } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.taskReducer.tasks);
  const editing = useSelector((state) => state.taskReducer.editing);
  const token = localStorage.getItem("idToken");
  const login = useSelector((state) => state.loginReducer.login);
  const [load, setLoad] = useState(false);
  const todoRef = useRef();
  const statusRef = useRef();
  const [pageData, setPageData] = useState({});
  let pageSize = localStorage.getItem("size") || 2;
  let currPage = localStorage.getItem("currentPage") || 1;
  let sort = localStorage.getItem("sort") || "All";
  const [redirect,setRedirect]=useState(false)

  useEffect(() => {
    getTasks(currPage, pageSize, sort);
    // eslint-disable-next-line
  }, []);

  async function getTasks(currPage = 1, size = 2, status = "All") {
    const token = localStorage.getItem("idToken");
    const response = await axios.get(
      `http://44.215.170.76:5000/getTasks?page=${currPage}&size=${size}&status=${status}`,
      {
        headers: { Authorization: token },
      }
    );
    const data = await response.data;
    try {
      if (data.ok) {
        localStorage.setItem("currentPage", currPage);
        localStorage.setItem("size", size);
        localStorage.setItem("sort", status);
        setPageData(data);
        pageSize = size;
        currPage = data.currentPage;
        sort = status;
        const task = data.tasks.map((task) => task);
        dispatch(taskAction.loadTask(task));
        !login && dispatch(loginAction.setLogin(true));
      } else {
        throw new Error();
      }
    } catch (error) {
      alert(data.message);
      setRedirect(true)
    }
  }
  async function addTask(e) {
    e.preventDefault();
    setLoad(true);
    let details = {
      todo: todoRef.current.value,
      status: statusRef.current.value,
    };
    if (editing === null) {
      const response = await axios.post(
        "http://44.215.170.76:5000/addTask",
        details,
        { headers: { Authorization: token } }
      );
      const data = await response.data;
      try {
        setLoad(false);
        if (data.ok) {
          emptyForm();
          getTasks(1, pageSize, sort);
        } else {
          throw new Error();
        }
      } catch (error) {
        alert(data.message);
      }
    } else {
      const response = await axios.put(
        `http://44.215.170.76:5000/editTask/${editing}`,
        details,
        {
          headers: { Authorization: token },
        }
      );
      const data = await response.data;
      try {
        setLoad(false);
        if (data.ok) {
          const editArray = tasks.map((item) => {
            if (item._id === editing) {
              return {
                id: editing,
                todo: todoRef.current.value,
                status: statusRef.current.value,
              };
            }
            return item;
          });
          dispatch(taskAction.loadTask(editArray));
          dispatch(taskAction.editTask(null));
        } else {
          throw new Error();
        }
      } catch (error) {
        alert(data.message);
      }
      emptyForm();
    }
  }
  async function deleteTask(e) {
    setLoad(true);
    const key = e.target.parentElement.id;
    const response = await axios.delete(
      `http://44.215.170.76:5000/deleteTask/${key}`,
      { headers: { Authorization: token } }
    );
    const data = await response.data;
    try {
      setLoad(false);
      if (data.ok) {
        getTasks(currPage, pageSize, sort);
      } else {
        throw new Error();
      }
    } catch (error) {
      alert(data.error.message);
    }
  }
  async function editTask(e) {
    setLoad(true);
    const key = e.target.parentElement.id;
    const response = await axios.get(`http://44.215.170.76:5000/getTask/${key}`, {
      headers: { Authorization: token },
    });
    const data = await response.data;
    try {
      setLoad(false);
      if (data.ok) {
        todoRef.current.value = data.task.todo;
        statusRef.current.value = data.task.status;
        dispatch(taskAction.editTask(key));
      } else {
        throw new Error();
      }
    } catch (error) {
      alert(data.message);
    }
  }
  function emptyForm() {
    todoRef.current.value = "";
    statusRef.current.value = "";
  }
  function cancelUpdate() {
    emptyForm();
    dispatch(taskAction.editTask(null));
  }
  return (
    <>
      {redirect&& <Redirect to='/'/>}
      {login && (
        <div className="home_layout">
          <i
            className="fa-solid fa-arrow-right-from-bracket logout"
            onClick={() => {
              dispatch(loginAction.setLogin(false))
              setRedirect(true)
              localStorage.removeItem('idToken')
            }}
          />
          <h3>TO-DO LIST</h3>
          <Form className="form" onSubmit={addTask}>
            <Form.Control
              placeholder="Write To-do"
              type="text"
              ref={todoRef}
              required
            />

            <Form.Select defaultValue="Me" ref={statusRef} required>
              <option>Completed</option>
              <option>Pending</option>
            </Form.Select>

            <Button variant="dark" type="submit">
              {editing === null ? "ADD" : "UPDATE"}
            </Button>
            {editing !== null && (
              <Button variant="danger" type="button" onClick={cancelUpdate}>
                CANCEL
              </Button>
            )}
          </Form>
          <>
            {load && <h3>Loading...</h3>}
            {editing === null &&
              tasks.map((item) => {
                return (
                  <li
                    id={item._id}
                    className={
                      item.status === "Pending"
                        ? "pendingItem"
                        : "completedItem"
                    }
                  >
                    <span>{item.todo} </span>
                    <span>{item.status}</span>

                    <button
                      onClick={editTask}
                      class="fa-solid fa-pen button"
                    ></button>
                    <button
                      onClick={deleteTask}
                      class="fa-solid fa-trash-can button"
                      style={{ color: "red" }}
                    ></button>
                  </li>
                );
              })}
            {tasks.length === 0 && <h3>No tasks to show</h3>}
          </>
          {editing === null && (
            <Paginate
              data={pageData}
              onChangePage={getTasks}
              onChangeSort={getTasks}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Home;
