import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import Productitem from "../components/Productitem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [fillterProducts, setFiltterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const toggleCategory = (e) => {
    setCategory(prev => 
      prev.includes(e.target.value) ? prev.filter(item => item !== e.target.value) : [...prev, e.target.value]
    );
  };

  const toggleSubCategory = (e) => {
    setSubCategory(prev => 
      prev.includes(e.target.value) ? prev.filter(item => item !== e.target.value) : [...prev, e.target.value]
    );
  };

  const applyfilter = () => {
    let productsCopy = products.slice();

    if (showSearch && typeof search === 'string') {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    setFiltterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = fillterProducts.slice();

    switch (sortType) {
      case 'low-high':
        fpCopy.sort((a, b) => a.price - b.price);
        break;

      case 'high-low':
        fpCopy.sort((a, b) => b.price - a.price);
        break;

      default:
        applyfilter();
        return;
    }

    setFiltterProducts(fpCopy);
  };

  useEffect(() => {
    applyfilter();
  }, [category, subCategory, search, showSearch]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* {Filter Options} */}
      <div className="min-w-60">
        <p onClick={() => setShowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2">
          FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>
        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Men"} onChange={toggleCategory} /> Men
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Women"} onChange={toggleCategory}/> Women
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Kids"} onChange={toggleCategory} /> Kids
            </p>
          </div>
        </div>
        {/* SubCategory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Topwear"} onChange={toggleSubCategory} /> Topwear
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Bottomwear"} onChange={toggleSubCategory} /> Bottom Wear
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Winterwear"} onChange={toggleSubCategory} /> Winter Wear
            </p>
          </div>
        </div>
      </div>
      {/* Right side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={'COLLECTIONS'} />
          {/* Product sort */}
          <select onChange={(e) => setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        {/* Map products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {fillterProducts.map((item, index) => (
            <Productitem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;