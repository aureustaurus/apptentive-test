import React, { Component } from "react";
import "./Widget1.css";
import connect from "./connect";

class Widget1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      by: "shape",
      empty: false
    };
    this.changeAmountFildName = this.changeAmountFildName.bind(this);
    this.toggleAmountEmpty = this.toggleAmountEmpty.bind(this);
  }

  componentDidMount = () => {
    this.props.getAmount();
  };

  changeAmountFildName = e => {
    const value = e.target && e.target.value ? e.target.value : "shape";
    this.setState({ by: value });
  };

  toggleAmountEmpty = () => {
    const value = !this.state.empty;
    this.setState({ empty: value });
  };

  render() {
    const { amount } = this.props;
    const { count = 0 } = amount;
    const { by, empty } = this.state;

    return (
      <div className="Widget1Info">
        <h4> Amounts by field name </h4>
        <div>
          We have {count} rows in DB with different {by}
        </div>
        Include empty value:
        <input
          type="checkbox"
          name="amountEmpty"
          value={empty}
          onChange={this.toggleAmountEmpty}
        />
        <input type="text" onChange={this.changeAmountFildName} />
        <button onClick={() => this.props.getAmount({ by, empty })}>
          Get Uniq by field name
        </button>
      </div>
    );
  }
}

export default connect(Widget1);
