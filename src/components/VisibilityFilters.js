import React from "react";
import cx from "classnames";
import { connect } from "react-redux";
import { setFilter } from "../redux/actions";
import { VISIBILITY_FILTERS } from "../constants";

const VisibilityFilters = ({ activeFilter, setFilter }) => {
  return (
    <div className="visibility-filters">
      {Object.keys(VISIBILITY_FILTERS).map(filterKey => {
        const currentFilter = VISIBILITY_FILTERS[filterKey];
        return (
          <span
            key={`visibility-filter-${currentFilter}`}
            className={cx(
              "filter",
              currentFilter === activeFilter && "filter--active"
            )}
            onClick={() => {
              setFilter(currentFilter);
            }}
          >
            {currentFilter}
          </span>
        );
      })}
    </div>
  );
};

const mapStateToProps = state => {
  return { activeFilter: state.visibilityFilter };
};
/**
 * <VisiblityFilterse/>组件需要从store中读取当前选中的过滤条件，并且分发actions。
 * 因此，我们需要把mapStateToProps以及mapDispatchToProps都传递给connect方法。
 * mapStateToProps能够作为visiblityFilter状态的一个简单的访问器。
 * mapDispatchToProps会包括setFilteraction创建函数。
 */
export default connect(
  mapStateToProps,
  { setFilter }
)(VisibilityFilters);
