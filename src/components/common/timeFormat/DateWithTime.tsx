import moment from "moment";

const DateWithTime = ({ timestamp }: { timestamp: Date }) => {
  const formattedDateTime = moment(timestamp).format("YYYY-MM-DD HH:mm");
  return <span>{formattedDateTime}</span>;
};

export default DateWithTime;
