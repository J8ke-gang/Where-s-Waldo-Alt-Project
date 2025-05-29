export default function ItemDropDown({ allItems, itemsFound }) {
  return (
    <div className="item-dropdown">
      <label htmlFor="items">Items to Find</label>
      <select id="items" disabled>
        {allItems.map((item, index) => (
          <option key={index} value={item}>
            {item} {itemsFound.includes(item) ? "✓" : ""}
          </option>
        ))}
      </select>
    </div>
  );
}
