import React from 'react'

// ProductPrice.jsx (new component)
export const ProductPrice = ({ product, user }) => {
  const isPro = user?.subscription?.plan === 'pro';
  const hasDiscount = product.discounts?.length > 0;
  const discount = hasDiscount ? product.discounts[0] : null;
  
  if (isPro && hasDiscount) {
    return (
      <div className="text-primary-600 font-medium mt-1">
        <span className="line-through text-gray-400 mr-2">
          Rs {product.price?.toLocaleString() || "N/A"}
        </span>
        Rs {discount.discountedPrice?.toLocaleString()}
        <span className="ml-2 text-green-600 text-sm">
          ({Math.round((product.price - discount.discountedPrice) / product.price * 100)}% off)
        </span>
      </div>
    );
  }

  return (
    <div className="text-primary-600 font-medium mt-1">
      Rs {product.price?.toLocaleString() || "N/A"}
      {!isPro && hasDiscount && (
        <span className="ml-2 text-sm text-gray-500">
          (Pro members save {Math.round((product.price - discount.discountedPrice) / product.price * 100)}%)
        </span>
      )}
    </div>
  );
};