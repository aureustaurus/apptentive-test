import React, { Component } from "react";
import "./Widget0.css";
import connect from "./connect";

class Widget0 extends Component {
  componentDidMount = () => {
    this.props.getTotal();
  };

  render() {
    const { total } = this.props;
    const { count = 0 } = total;

    return (
      <div className="Widget0Info">
        <h4> Total in DB </h4>
        <div>We have {count} rows in DB</div>
        <button onClick={() => this.props.getTotal()}>Refresh Total</button>
      </div>
    );
  }
}

export default connect(Widget0);
