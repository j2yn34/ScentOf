import moment from "moment"; // moment 라이브러리 import

const CustomDateTime = ({ timestamp }: { timestamp: Date }) => {
  const formattedDateTime = moment(timestamp).format("YYYY-MM-DD HH:mm");
  return <span>{formattedDateTime}</span>;
};

export default CustomDateTime;
