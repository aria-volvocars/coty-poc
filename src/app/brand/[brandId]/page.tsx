"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/component/fetchProducts";
import { getDetailCollection } from "@/component/fetchDetailCollection";
import Link from "next/link";

export default function Page({ params }: any) {
  const [collectionData, setCollectionData] = useState<any>();
  const [listCollection, setListCollection] = useState([]);

  useEffect(() => {
    const collection = async () => {
      const data1 = await getDetailCollection(params.brandId);
      data1 && setCollectionData(data1.data.collections.nodes[0]);
      const data2 = await getProducts(params.brandId);
      data2 &&
        setListCollection(data2.data.collections.nodes[0].products.nodes);
    };

    collection();
    return () => {};
  }, [params.brandId]);

  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl text-black font-bold leading-7 sm:truncate sm:text-3xl sm:tracking-tight mb-5">
            {collectionData?.title}
          </h2>
          <hr />
          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {listCollection.map((collection: any) => (
              <div key={collection.id} className="group relative">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                  <img
                    src={collection?.featuredImage?.url}
                    alt={collection?.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-6 text-base font-semibold text-gray-900">
                  <Link
                    href={`/brand/${params.brandId}/collection/${collection.description}`}
                  >
                    <span className="absolute inset-0" />
                    {collection.title}
                  </Link>
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
