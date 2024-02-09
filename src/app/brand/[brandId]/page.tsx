"use client";

import { useEffect, useState } from "react";
import { getCollections } from "@/component/fetch/frontend/fetchCollection";
import { getBrandDetail } from "@/component/fetch/frontend/fetchBrandDetail";
import { TitleBar } from "@/component/atoms/titleBar";
import { CollectionList } from "@/component/organisms/collectionList";

export default function Page({ params }: any) {
  const [collectionData, setCollectionData] = useState<any>();
  const [listCollection, setListCollection] = useState([]);

  useEffect(() => {
    const collection = async () => {
      const data1 = await getBrandDetail(params.brandId);
      data1 && setCollectionData(data1.data.collections.nodes[0]);
      const data2 = await getCollections(params.brandId);
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
          <TitleBar title={collectionData?.title} />
          <hr />
          <CollectionList data={listCollection} brand={params.brandId} />
        </div>
      </div>
    </div>
  );
}
