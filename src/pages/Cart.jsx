import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useState } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems,updateQuantity } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const {navigate} = useContext(ShopContext);
  useEffect(() => {
    const tempData = [];
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          tempData.push({
            _id: itemId,
            size: size,
            quantity: cartItems[itemId][size], // Fixed this line to access cartItems correctly
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>
      <div>
        {cartData.map((item, index) => {
          const productData = products.find(
            (products) => products._id === item._id
          );
          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid-cols-[4fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
          >
              <div className="flex items-start gap-6">
                <img
                  src={productData.image[0]}
                  className="w-16 sm:w-20"
                  alt=""
                />
                <div>
                  <p className="text-xs sm:text-lg font-medium">
                    {productData.name}
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>
                      {currency}
                      {productData.price}
                    </p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                      {item.size}
                    </p>
                  </div>
                </div>
                <div className="flex con ">
                <input onChange={(e)=> e.target.value === "" || e.target.value === '0' ? null : updateQuantity(item._id,item.size,Number(e.target.value))} type="number" className="border name max-w-10   sm:max-w-20  px-1 sm:px-2 py-1 mt-10 ml-[300px] "   min={1} max={10}  defaultValue={item.quantity}   />
                
                <img onClick={()=>updateQuantity(item._id,item.size,0)} className="w-5 ml-48 icon sm:w-5 cursor-pointer mt-12 img " src={assets.bin_icon} alt="" />
                
                </div>
              </div>
            </div>
          );
        })}
      </div>

     <div className="flex justify-end my-20"> 
       <div className="w-full sm:w-[450px]">
       <CartTotal/>
       <div className="w-full text-end">
            <button className="bg-black text-white text-sm my-8 px-8 py-3" onClick={()=> navigate('/place-order')}>PROCEED TO CHECKOUT</button>
       </div>
       </div>
     </div>

    </div>
  );
};

export default Cart;
