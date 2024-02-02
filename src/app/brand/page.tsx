"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/component/fetchProducts";
import Link from "next/link";

export default function Page() {
  const [listBrand, setListBrand] = useState([]);

  useEffect(() => {
    const brands = async () => {
      const data = await getProducts();
      data && setListBrand(data.data.collections.nodes[0].products.nodes);
    };

    brands();
    return () => {};
  }, []);

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl text-black font-bold leading-7 sm:truncate sm:text-3xl sm:tracking-tight mb-10">
            Brands
          </h2>
          <hr />
          <ul role="list" className="divide-y divide-gray-100">
            {listBrand.map((brand: any) => (
              <li key={brand.id} className="flex justify-between gap-x-6 py-5">
                <Link
                  href={`/brand/${brand.description}`}
                  className="self-center text-gray-900"
                >
                  <div className="flex min-w-0 gap-x-4">
                    {brand?.featuredImage && (
                      <img
                        className="h-12 w-12 flex-none bg-gray-50"
                        src={brand?.featuredImage?.url}
                        alt={brand.title}
                      />
                    )}
                    <div className="min-w-0 flex items-center">
                      {brand.title}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
