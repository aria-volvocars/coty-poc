"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/component/fetchProducts";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Page({ params }: any) {
  const searchParams = useSearchParams();
  const [listProduct, setListProduct] = useState([]);

  useEffect(() => {
    const product = async () => {
      const data = await getProducts(params.collectionId);
      data && setListProduct(data.products);
    };

    product();
    return () => {};
  }, [params.collectionId]);

  return (
    <div style={{ margin: 10 }}>
      <h3>{searchParams.get("name")}</h3>
      <hr />
      <ul>
        {listProduct.map((product: any, i) => (
          <li key={i}>
            <Link href={`/product/${product.id}`}>{product.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
