import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Pagination } from "react-bootstrap";

const App = ({ className }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [active, setActive] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(10);

  console.log(start, end);

  /**
   * Function to fetch table data
   */
  const fetchTotalPagination = async () => {
    let url = `https://jsonplaceholder.typicode.com/comments`;
    const { data } = await axios({
      url,
      method: "get",
    });
    setTotalPages(Math.floor(data.length / 5));
  };

  useEffect(() => {
    const fetchPaginationData = async () => {
      let url = `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=${5}`;
      const { data } = await axios({
        url,
        method: "get",
      });
      setData(data);
    };

    fetchPaginationData();
    fetchTotalPagination();
  }, [page]);

  const onPageChange = (page) => {
    console.log(page);
    setPage(page);
    setActive(page);
  };

  let items = [];
  for (let number = start; number <= end; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => onPageChange(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  const paginationBasic = (
    <div>
      <Pagination>{items}</Pagination>
    </div>
  );

  const prevClassName = start === 1 ? "disabled" : "";

  const nextClassName = end === totalPages ? "disabled" : "";

  const prevHandler = () => {
    setStart(start - 10);
    setEnd(end - 10);
  };

  const nextHandler = () => {
    setStart(start + 10);
    setEnd(end + 10);
  };

  return (
    <div className={className}>
      <h2>Table Pagination</h2>
      <table aria-label="table-output" className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <tr key={item.id}>
                <th>{item.id}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.body}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      <nav
        aria-label="Page navigation example"
        className="d-flex justify-content-center"
      >
        <ul className="pagination mb-0">
          <li className={`page-item ${prevClassName}`}>
            <a
              className="page-link"
              href="#page"
              aria-label="Previous"
              onClick={prevHandler}
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {paginationBasic}
          <li className={`page-item ${nextClassName}`}>
            <a
              className="page-link"
              href="#page"
              aria-label="Next"
              onClick={nextHandler}
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default styled(App)`
  width: 500px;
  margin: 100px auto;

  th,
  h2 {
    text-align: center;
  }

  td:not(:first-child) {
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
