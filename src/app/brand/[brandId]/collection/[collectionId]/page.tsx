"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/component/fetch/frontend/fetchProductList";
import { getCollectionDetail } from "@/component/fetch/frontend/fetchCollectionDetail";
import { TitleBar } from "@/component/atoms/titleBar";
import { ProductList } from "@/component/organisms/productList";

export default function Page({ params }: any) {
  const [collectionData, setCollectionData] = useState<any>();
  const [listProduct, setListProduct] = useState([]);

  useEffect(() => {
    const product = async () => {
      const data1 = await getCollectionDetail(params.collectionId);
      data1 && setCollectionData(data1.data.collections.nodes[0]);
      const data2 = await getProducts(params.collectionId);
      data2 && setListProduct(data2.data.collections.nodes[0].products.nodes);
    };

    product();
    return () => {};
  }, [params.collectionId]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <TitleBar title={collectionData?.title} />
        <ProductList
          data={listProduct}
          brand={params.brandId}
          collection={params.collectionId}
        />
      </div>
    </div>
  );
}
