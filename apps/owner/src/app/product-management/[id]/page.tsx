"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { id } = useParams();

  useEffect(() => {
    console.log(id);
  }, [id]);
  return <p>product-id: {id}</p>;
}
