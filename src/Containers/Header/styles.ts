import { CSSProperties } from "react";

export const containerBody = {
  width: "100%",
};

export const individualHeaderBody = (active: boolean) => ({
  padding: "3.5%",
  backgroundColor: active ? "rgb(238, 38, 119)" : "rgb(242,242,242)",
  width: "100%",
});
export const individualHeaderText = (active: boolean): CSSProperties => ({
  color: active ? "white" : "black",
  fontWeight: 700,
  whiteSpace: "nowrap",
});
