import React from "react";
import ReactTooltip from "react-tooltip";
import "./List.css";

const List = ({ items, handleClick }) => (
  <>
    <ul className="List">
      {items.map((item) => (
        <li
          className="List__item"
          key={item.CharCode}
          data-tip={item.meta.Name}
          onClick={handleClick}
        >
          {Object.values(item.data).map((val) => (
            <span>{val}</span>
          ))}
        </li>
      ))}
    </ul>
    <ReactTooltip place="bottom" type="dark" effect="float" />
  </>
);

export default React.memo(List);
