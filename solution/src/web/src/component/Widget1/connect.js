import { connect } from "react-redux";
import _ from "lodash";
import { getAmount } from "../../data/ufo";

const mapStateToProps = state => {
  const amount = _.get(state, "amount", {});

  return { amount };
};

const mapDispatchToProps = {
  getAmount
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
