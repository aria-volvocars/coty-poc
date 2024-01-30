"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/component/fetchProducts";
import Link from "next/link";

export default function Page() {
  const [listBrand, setListBrand] = useState([]);

  useEffect(() => {
    const brands = async () => {
      const data = await getProducts();
      data && setListBrand(data.products);
    };

    brands();
    return () => {};
  }, []);

  return (
    <div style={{ margin: 10 }}>
      <h3>Brands</h3>
      <hr />
      <ul>
        {listBrand.map((brand: any, i) => (
          <li key={i}>
            <Link href={`/brand/${brand.body_html}?name=${brand.title}`}>
              {brand.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
