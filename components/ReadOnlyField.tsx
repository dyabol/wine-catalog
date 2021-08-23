import { Input, Space, Tag } from "antd";
import moment from "moment";
import React from "react";

type Props = {
  value?: string | number | moment.Moment | string[];
  dateFormat?: string;
};
const ReadOnlyField: React.FC<Props> = ({ value, dateFormat }) => {
  let result: string | number = "";
  if (moment.isMoment(value)) {
    result = value.format(dateFormat);
  } else if (Array.isArray(value)) {
    return (
      <Space wrap size="small">
        {value.map((v, key) => (
          <Tag key={key} color="default" style={{ marginRight: 0 }}>
            {v}
          </Tag>
        ))}
      </Space>
    );
  } else {
    result = value ?? "";
  }
  return (
    <Input
      readOnly={true}
      bordered={false}
      value={result !== "" ? result.toString() : "-"}
    />
  );
};

export default ReadOnlyField;
