import Image from "next/image";

const Page = () => {
  return (
    <div>
      <ul>
        <li>
          <div>
            <h3>가게명</h3>
            <p>라벨</p>
          </div>

          <div>
            <Image src="#" alt="#" width={50} height={50} />

            <div>
              <p>카테고리</p>
              <p>설명</p>
              <div>
                <p>가격</p>
                <p>가격</p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Page;
