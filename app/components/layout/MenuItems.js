export default function MenuItems() {
  return (
    <div className="bg-gray-200 text-center p-4 rounded-lg hover:bg-white hover: shadow-md hover: shadow-black/25 transition-all">
      <img className="max-h-auto max-h-24 mx-auto" src="/pizza.png" alt="pizza"></img>
      <h4 className="font-semibold text-xl my-2">pizza hawie</h4>
      <p className="text-gray-500 text-sm">hfkdhfkshfkdhfkshfk</p>
      <button className="bg-primary rounded-full px-6 py-2 mt-4 text-white">
        Add to cart $12
      </button>
    </div>
  );
}
