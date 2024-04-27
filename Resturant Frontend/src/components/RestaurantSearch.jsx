import React from 'react';
import "./search.css"
import { Link } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
export default class RestaurantSearch extends React.Component {
  constructor() {
    super();
    this.state = {
      searchDate: null,
      noData: false,
      lastSeach:"",
    };
  }
  search = (key) => {
    this.setState({lastSeach:key})
    fetch("http://localhost:3000/restaurant?q=" + key).then((date) => {
      date.json().then((resp) => {
        console.warn("resp", resp);
        if (resp.length > 0) {
          this.setState({ searchDate: resp, noData: false });
        } else {
          this.setState({ noData: true, searchData: null });
        }
      });
    });
  };
  delete = (id) => {
    fetch("http://localhost:3000/restaurant/" + id, {
      method: "DELETE",
    }).then((result) => {
      result.json().then(() => {
        this.setState({
          message: (
            <div className="del">
              <DeleteForeverIcon sx={{ fontSize: 15 }} /> This list has been
              deleted
            </div>
          ),
        });
        setTimeout(() => {
          this.setState({ message: "" });
        }, 3000);
        this.search(this.state.lastSeach);
      });
    });
  };
  render() {
    return (
      <div className="main-search">
        <div className="alert-list">
          {this.state.message && (
            <div className="alert">
              <h3>{this.state.message}</h3>
            </div>
          )}
        </div>
        <h1 >Restaurant Search</h1>
        <input
          type="text"
          placeholder="Search Restaurant"
          onChange={(event) => this.search(event.target.value)}
        />
        <div>
          {this.state.searchDate ? (
            <div>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>RATING</th>
                    <th>ADDRESS</th>
                    <th>OPTION</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.searchDate.map((item, i) => (
                    <tr key={i}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.rating}</td>
                      <td>{item.address}</td>
                      <td>
                        <Link
                          className="edit"
                          to={"/Update/" + item.id}
                          style={{ textDecoration: "none" ,color:"red"}}
                        >
                          <SystemUpdateAltIcon />
                        </Link>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span onClick={() => this.delete(item.id)}>
                          <DeleteForeverIcon />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            ""
          )}
          {this.state.noData ? <h3>No data found</h3> : null}
        </div>
      </div>
    );
  }
}
