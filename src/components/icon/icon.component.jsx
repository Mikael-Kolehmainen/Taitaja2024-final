import "./icon.styles.css";

const Icon = ({ iconPath, onClick, width = "70px", height = "70px" }) => {
  return (
    <div className="icon" onClick={onClick} style={{ width: width, height: height }}>
      <i style={{ background: `url(${iconPath}) no-repeat center` }} />
    </div>
  );
};

export default Icon;
