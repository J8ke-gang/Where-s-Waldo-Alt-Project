export default function ItemDropDown({ allItems, itemsFound }) {
  return (
    <div>
      <h3>Items to Find:</h3>
      <ul>
        {allItems.map((item) => (
          <li
            key={item}
            style={{
              color: itemsFound.includes(item) ? "green" : "black",
              fontWeight: itemsFound.includes(item) ? "bold" : "normal",
            }}
          >
            {item} {itemsFound.includes(item) ? "✓" : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}
