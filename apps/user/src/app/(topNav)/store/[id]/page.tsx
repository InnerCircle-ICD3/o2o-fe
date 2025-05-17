import ProductSelector from "@/components/ui/storeDetail/productSelector";
import StoreInfo from "@/components/ui/storeDetail/storeInfo";
import StoreProduct from "@/components/ui/storeDetail/storeProduct";
import * as style from "./storeDetail.css";

const mock = [
  {
    id: 1,
    name: "냠냠 샌드위치",
    originalPrice: 10000,
    discountPrice: 8000,
    variant: "샌드위치, 햄버거",
    type: "small",
    length: 10,
  },
  {
    id: 2,
    name: "길고 기다라고 기다란 냠냠 치킨너겟",
    originalPrice: 10000,
    discountPrice: 8000,
    variant: "샌드위치, 햄버거",
    type: "medium",
    length: 1,
  },
  {
    id: 3,
    name: "냠냠 햄버거",
    originalPrice: 10000,
    discountPrice: 8000,
    variant: "샌드위치, 햄버거",
    type: "large",
    length: 2,
  },
  {
    id: 4,
    name: "냠냠 피자",
    originalPrice: 10000,
    discountPrice: 8000,
    variant: "샌드위치, 햄버거",
    type: "large",
    length: 0,
  },
];

const Page = () => {
  return (
    <section className={style.container}>
      <StoreInfo />
      <StoreProduct products={mock} />
      <ProductSelector products={mock} />
    </section>
  );
};

export default Page;
