import { useRef } from 'react';

const ProductCarousel = ({ products }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="mt-4 mx-10 relative bg-[#eff9fa]">
      {/* Left Button */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2"
      >
        &#8249;
      </button>

      {/* Scrollable area */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 p-4 scroll-smooth no-scrollbar"
      >
        {products.map((product, index) => (
          <div
            key={index}
            className="min-w-[250px] max-w-[250px] bg-white rounded-xl shadow-md"
          >
            <div className="bg-green-600 text-white px-2 py-1 rounded-tl-xl rounded-br-xl text-xs font-bold w-fit">
              {product.discount}
            </div>
            <div className="flex justify-center p-4 h-40">
              <img src={product.image} alt={product.name} className="w-20" />
            </div>
            <div className="m-2 text-lg font-medium text-center">
              {product.name}
            </div>
            <hr className="mx-2 my-2" />
            <div className="mx-2 text-sm text-teal-600 font-medium my-2">
              MRP <span className="line-through"> ₹{product.mrp}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="my-2 mx-2 font-bold text-lg">₹{product.price}</span>
              <button className="my-2 mx-2 p-2 px-4 border rounded-2xl text-[#1B69DE] bg-[#E7F6FF]">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Right Button */}
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2"
      >
        &#8250;
      </button>
    </div>
  );
};

export default ProductCarousel;
