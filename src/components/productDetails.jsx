import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./navbar";
import { toast, Bounce } from "react-toastify";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.id
    );
    if (existingProductIndex !== -1) {
      if (!cart[existingProductIndex].quantity) {
        cart[existingProductIndex].quantity = 1;
      }
      cart[existingProductIndex].quantity += 1;
    } else {
      product.quantity = 1;
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success(`"${product.title}" Added to cart`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  }

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => setProduct(data))
      .catch(() => setError("Failed to load product"));
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50 min-h-full">
        <div className="relative">
          <div className="relative w-32 h-32">
            <div
              className="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-r-[#0ff] border-b-[#0ff] animate-spin"
              style={{ animationDuration: "3s" }}
            ></div>

            <div
              className="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-t-[#0ff] animate-spin"
              style={{ animationDuration: "2s", animationDirection: "reverse" }}
            ></div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-tr from-[#0ff]/10 via-transparent to-[#0ff]/5 animate-pulse rounded-full blur-sm"></div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="flex items-center justify-center md:mt-20 flex-wrap md:flex-nowrap min-h-full bg-background">
        <div className="border-r-4 border-gray-600 border-t-4 p-4 rounded-lg shadow-lg m-10 bg-buttonbg">
          <img
            src={product.image}
            alt={product.title}
            className="w-80 object-contain rounded-lg"
          />
        </div>
        <div className="max-w-xl">
          <h1 className="text-2xl font-bold mt-4 text-text">{product.title}</h1>
          <p className="text-text mt-2">{product.description}</p>
          <p className="text-lg font-semibold mt-4 text-accent">${product.price}</p>
          <button
            className="mt-4 px-4 py-2 bg-buttonbg text-text rounded-lg"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
          <button className="mt-4 px-4 py-2 bg-primary text-buttontext rounded-lg m-3">
            Buy Now
          </button>
        </div>
      </div>
    </>
  );
}
