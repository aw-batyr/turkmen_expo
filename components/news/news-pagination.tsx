import { FC, useState } from "react";

interface Props {}

export const NewsPagination: FC<Props> = ({}) => {
  const [current, setCurrent] = useState(1);
  const [perPage, setPerPage] = useState(6);
  const [totalNews, setTotalNews] = useState(0);

  return <div className=""></div>;
};
