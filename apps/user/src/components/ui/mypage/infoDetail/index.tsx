import * as globalStyle from "@/styles/global.css";
import type { InfoDetail as Info } from "@/types/apis/mypage.type";
import Image from "next/image";
import * as style from "./infoDetail.css";

interface InfoDetailProps {
  infoDetail?: Info;
}

const InfoDetail = async (props: InfoDetailProps) => {
  const { infoDetail } = props;

  if (!infoDetail) {
    return (
      <div className={style.errorWrapper}>
        <Image src="/images/character2.png" alt="loading" width={120} height={120} />

        <h2>관련 내용을 찾을 수 없습니다.</h2>
      </div>
    );
  }

  return (
    <div className={globalStyle.innerPadding}>
      <h2 className={style.title}>{infoDetail.title}</h2>
      <p className={style.date}>{new Date(infoDetail.createdAt).toLocaleDateString()}</p>
      <p className={style.content}>{infoDetail.content}</p>
    </div>
  );
};

export default InfoDetail;
