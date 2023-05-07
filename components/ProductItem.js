/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';

export default function ProductItem({ product, addToCartHandler }) {
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <h3>
          <img
            src={product.image}
            alt={product.name}
            className="rounded  object-cover h-74 w-full"
          />
        </h3>
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product.slug}`}>
          <h3>
            <h2 className="text-lg font-bold">{product.name}</h2>
          </h3>
        </Link>
        <p className="mb-2">{product.category}</p>
        <p className="font-bold">৳{product.price}</p>
        <button
          className="primary-button w-full"
          type="button"
          onClick={() => addToCartHandler(product)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
