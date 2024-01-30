"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/component/fetchProducts";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Page({ params }: any) {
  const searchParams = useSearchParams();
  const [listCollection, setListCollection] = useState([]);

  useEffect(() => {
    const collection = async () => {
      const data = await getProducts(params.brandId);
      data && setListCollection(data.products);
    };

    collection();
    return () => {};
  }, [params.brandId]);

  return (
    <div style={{ margin: 10 }}>
      <h3>{searchParams.get("name")}</h3>
      <hr />
      <ul>
        {listCollection.map((collection: any, i) => (
          <li key={i}>
            <Link
              href={`/brand/${params.brandId}/collection/${collection.body_html}?name=${collection.title}`}
            >
              {collection.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
