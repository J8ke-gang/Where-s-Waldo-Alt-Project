import "../../styles/ItemDropDown.css";

export default function ItemDropDown({ allItems, itemsFound }) {
  return (
    <div className="item-dropdown">
      <h3>Items to Find:</h3>
      <ul className="item-list">
        {allItems.map((item) => (
          <li
            key={item}
            className={itemsFound.includes(item) ? "item-found" : ""}
          >
            {item} {itemsFound.includes(item) ? "✓" : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}

