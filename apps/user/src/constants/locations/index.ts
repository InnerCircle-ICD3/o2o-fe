export const RANGE_OPTIONS = [
  { value: 0.5, label: "가까워요" },
  { value: 1, label: "" },
  { value: 1.5, label: "" },
  { value: 2, label: "멀어요" },
] as const;

export const ADDRESS_TYPES = ["HOME", "WORK"] as const;

export const CLUSTERER_STYLE = {
  width: "40px",
  height: "40px",
  background: "rgba(53, 168, 101, 0.8)",
  boxShadow: "0 0 0 12px rgba(53, 168, 101, 0.5)",
  borderRadius: "50%",
  color: "#fff",
  textAlign: "center",
  fontSize: "14px",
  fontWeight: "bold",
  lineHeight: "40px",
};
