import React from 'react';
import "./create.css";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
class RestaurantCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      email: null,
      rating: null,
      address: null,
    };
  }

  create = () => {
    if (
      this.state.name === null ||
      this.state.email === null ||
      this.state.rating === null ||
      this.state.address === null
    ) {
      this.setState({
        message: (
          <div className="error">
            <AddAlertIcon sx={{ fontSize: 15 }} />
            Please enter some data first
          </div>
        ),
      });
      setTimeout(() => {
        this.setState({ message: "" });
      }, 3000);
    } else {
      fetch("http://localhost:3000/restaurant", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(this.state),
      }).then((result) => {
        result.json().then(() => {
          this.setState({
            message: (
              <div className="success">
                <CheckCircleIcon sx={{fontSize:15}}/> Restaurant has been
                added
              </div>
            ),
            
          });
           setTimeout(() => {
             this.setState({ message: "" });
           }, 3000);
        });
      });
    }
  };

  render() {
    return (
      <div className="main-create">
        {this.state.message && (
          <div className="alert">
            <h3>{this.state.message}</h3>
          </div>
        )}
        <h1>Restaurant Create</h1>

        <div>
          <input
            onChange={(event) => {
              this.setState({ name: event.target.value });
            }}
            placeholder="Restaurant name"
          />
          <br />
          <br />
          <input
            onChange={(event) => {
              this.setState({ email: event.target.value });
            }}
            placeholder="Restaurant Email"
          />
          <br />
          <br />
          <input
            onChange={(event) => {
              this.setState({ rating: event.target.value });
            }}
            placeholder="Restaurant Rating"
          />
          <br />
          <br />
          <input
            onChange={(event) => {
              this.setState({ address: event.target.value });
            }}
            placeholder="Restaurant Address"
          />
          <br />
          <br />
          <button
            className="button-30"
            role="button"
            onClick={() => {
              this.create();
            }}
          >
            Add Restaurant
          </button>
        </div>
      </div>
    );
  }
}

export default RestaurantCreate;
