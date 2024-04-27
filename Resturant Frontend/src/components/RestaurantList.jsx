import React from "react";
import "./list.css";
import { Link } from "react-router-dom";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";

export default class RestaurantList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: null,
    };
  }

  componentDidMount() {
    this.getData()
  }
  getData = () => {
    fetch("http://localhost:3000/restaurant").then((response) => {
      response.json().then((result) => {
        this.setState({ list: result });
      });
    });
  }
  delete = (id) => {
    fetch('http://localhost:3000/restaurant/' + id,
      {
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
          this.getData();
        })
      })
  }
  render() {

    return (
      <div className="main-list">
        <div className="alert-list">
          {this.state.message && (
            <div className="alert">
              <h3>{this.state.message}</h3>
            </div>
          )}
        </div>

        <h1>Restaurant List</h1>

        {this.state.list ? (
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
                {this.state.list.map((item, i) => (
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
                        style={{ textDecoration: "none", color: "red" }}
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
          <p>please wait.....</p>
        )}
      </div>
    );
  }
}
