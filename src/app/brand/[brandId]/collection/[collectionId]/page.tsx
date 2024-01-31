"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/component/fetchProducts";
import { getDetailCollection } from "@/component/fetchDetailCollection";
import Link from "next/link";

export default function Page({ params }: any) {
  const [collectionData, setCollectionData] = useState<any>();
  const [listProduct, setListProduct] = useState([]);

  useEffect(() => {
    const product = async () => {
      const data1 = await getDetailCollection(params.collectionId);
      data1 && setCollectionData(data1.collection);
      const data2 = await getProducts(params.collectionId);
      data2 && setListProduct(data2.products);
    };

    product();
    return () => {};
  }, [params.collectionId]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-black font-bold leading-7 sm:truncate sm:text-3xl sm:tracking-tight mb-10">
          {collectionData?.title}
        </h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {listProduct.map((product: any) => (
            <Link
              key={product.id}
              href={`/product/${product.id}?brand=${params.brandId}&collection=${params.collectionId}`}
              className="group"
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  src={product?.image?.src}
                  alt={product?.title}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                {product.variants[0].price}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
