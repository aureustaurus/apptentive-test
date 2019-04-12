import { connect } from "react-redux";
import _ from "lodash";
import { getTotal } from "../../data/ufo";

const mapStateToProps = state => {
  const total = _.get(state, "total", {});

  return { total };
};

const mapDispatchToProps = {
  getTotal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
