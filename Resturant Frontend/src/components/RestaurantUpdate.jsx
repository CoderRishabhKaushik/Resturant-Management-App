import React from "react";
import "./update.css";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PropTypes from "prop-types";
export default class RestaurantUpdate extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    id: PropTypes.number.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      email: null,
      rating: null,
      address: null,
      id: null,
    };
  }

  componentDidMount() {
    fetch(
      "http://localhost:3000/restaurant/" + this.props.match.params.id
    ).then((response) => {
      response.json().then((result) => {
        this.setState({
          name: result.name,
          email: result.email,
          id: result.id,
          rating: result.rating,
          address: result.address,
        });
      });
    });
  }

  update = () => {
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
      fetch("http://localhost:3000/restaurant/" + this.props.match.params.id, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id: this.state.id,
          name: this.state.name,
          email: this.state.email,
          rating: this.state.rating,
          address: this.state.address,
        }),
      }).then((result) => {
        result.json().then(() => {
          this.setState({
            message: (
              <div className="success">
                <CheckCircleIcon sx={{ fontSize: 15 }} /> Restaurant has been
                updated
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
        <h1>Restaurant Update</h1>

        <div>
          <input
            onChange={(event) => {
              this.setState({ name: event.target.value });
            }}
            placeholder="Restaurant name"
            value={this.state.name}
          />
          <br />
          <br />
          <input
            onChange={(event) => {
              this.setState({ email: event.target.value });
            }}
            placeholder="Restaurant Email"
            value={this.state.email}
          />
          <br />
          <br />
          <input
            onChange={(event) => {
              this.setState({ rating: event.target.value });
            }}
            placeholder="Restaurant Rating"
            value={this.state.rating}
          />
          <br />
          <br />
          <input
            onChange={(event) => {
              this.setState({ address: event.target.value });
            }}
            placeholder="Restaurant Address"
            value={this.state.address}
          />
          <br />
          <br />
          <button
            className="button-30"
            role="button"
            onClick={() => {
              this.update(this.state.id);
            }}
          >
            Update Restaurant
          </button>
        </div>
      </div>
    );
  }
}
