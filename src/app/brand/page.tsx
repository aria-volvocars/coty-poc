"use client";

import { useEffect, useState } from "react";
import { getBrands } from "@/component/fetch/frontend/fetchBrandList";
import { TitleBar } from "@/component/atoms/titleBar";
import { BrandList } from "@/component/organisms/brandList";

export default function Page() {
  const [listBrand, setListBrand] = useState([]);

  useEffect(() => {
    const brands = async () => {
      const data = await getBrands();
      data && setListBrand(data.data.collections.nodes[0].products.nodes);
    };

    brands();
    return () => {};
  }, []);

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <TitleBar title="Brands" />
          <hr />
          <BrandList data={listBrand} />
        </div>
      </div>
    </div>
  );
}
