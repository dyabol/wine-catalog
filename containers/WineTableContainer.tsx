import React from "react";
import WineTable from "../components/WineTable/WineTable";
import useStore from "../utils/store";

type Props = {
  className?: string;
};

const WineTableContainer: React.FC<Props> = ({ className }) => {
  const wines = useStore((state) => state.wines);
  return <WineTable className={className} dataSource={wines} />;
};

export default WineTableContainer;
