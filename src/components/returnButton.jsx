export const ReturnButton = ({ onClick }) => {
  const style = {
    backgroundColor: "black",
    position: "absolute",
    top: "2rem",
    left: "2rem",
    borderRadius: "10px",
    padding: "0.3rem",
    color: "white",
    border: "none",
    cursor: "pointer",
  };
  return (
    <button onClick={onClick} style={style}>
      Tillbaka
    </button>
  );
};
