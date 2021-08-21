import { Button, ButtonProps, Tooltip } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import React from "react";

type Props = {
  children: string;
  icon: ButtonProps["icon"];
  responsive?: boolean;
  onlySmall?: boolean;
} & ButtonProps;

const ResponsiveButton: React.FC<Props> = ({
  children,
  responsive = true,
  onlySmall,
  ...props
}) => {
  const { xs } = useBreakpoint();
  if ((xs && responsive) || onlySmall) {
    return (
      <Tooltip title={children}>
        <Button {...props} />
      </Tooltip>
    );
  }
  return <Button {...props}>{children}</Button>;
};

export default ResponsiveButton;
