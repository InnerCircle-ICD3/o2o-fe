import InfoItem from "@/components/ui/mypage/infoItem";
import * as globalStyle from "@/styles/global.css";
import type { Info } from "@/types/apis/mypage.type";
import classNames from "classnames";
import * as style from "./infoList.css";

interface InfoListProps {
  infos: Info[];
  basePath: string;
}

const InfoList = (props: InfoListProps) => {
  const { infos, basePath } = props;

  return (
    <section className={classNames(globalStyle.innerPadding, style.container)}>
      <ul>
        {infos.map((Info) => (
          <InfoItem key={Info.id} info={Info} basePath={basePath} />
        ))}
      </ul>
    </section>
  );
};

export default InfoList;
