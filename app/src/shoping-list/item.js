export default function Item({ id, name, quantity, category, onSelect }) {
  const handleClick = () => {
    onSelect({ name }); 
  };

  return (
    <div className="mb-4 p-4 border bg-cyan-900 w-full hover:bg-orange-600" onClick={handleClick}>
      <p className="text-lg font-semibold divide-y divide-slate-300">{name}</p>
      <p className="text-slate-300">Buy {quantity} in {category}</p>
    </div>
  );
};