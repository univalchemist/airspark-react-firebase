import { CSSProperties } from "react";
import { mainColor } from "../../Components/providers/consts";

export const subtotalContainer: CSSProperties = {
  width: "100%",
  textAlign: "center",
  padding: "5%",
  borderBottom: "1px solid rgb(238, 41, 119)",
};

export const subtotal: CSSProperties = {
  fontWeight: 600,
};

export const containerBody: CSSProperties = {
  borderTop: "1px solid rgb(238, 41, 119)",
  padding: "2%",
};

export const button: CSSProperties = {
  borderRadius: 0,
  fontWeight: "bold",
  whiteSpace: "nowrap",
};

export const backwardButtonIcon: CSSProperties = {
  stroke: mainColor,
  strokeWidth: 1.5,
  fill: mainColor
};

export const forwardButtonIcon: CSSProperties = {
  stroke: "white",
  strokeWidth: 1.5,
  fill: "white"
};
export const disabledForwardButtonIcon: CSSProperties = {
  stroke: "#C9C9C9",
  strokeWidth: 1.5,
  fill: "#C9C9C9"
};

export const containerBodyMobile: CSSProperties = {
  padding: "4%",
};
