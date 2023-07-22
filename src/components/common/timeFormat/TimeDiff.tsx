import { Timestamp } from "firebase/firestore";
import moment from "moment";

type TimeDiffProps = {
  timestamp: Timestamp;
};

const TimeDiff = ({ timestamp }: TimeDiffProps): JSX.Element => {
  const getTimeDiff = (timestamp: Timestamp) => {
    const currentTime = moment();
    const postedTime = moment(timestamp.toDate());
    const diffInMinutes = currentTime.diff(postedTime, "minutes");
    const diffInHours = currentTime.diff(postedTime, "hours");

    if (diffInMinutes < 60) {
      return `${diffInMinutes}분 전`;
    } else if (diffInHours < 24) {
      return `${diffInHours}시간 전`;
    } else {
      return postedTime.format("YYYY-MM-DD");
    }
  };

  return <span>{getTimeDiff(timestamp)}</span>;
};

export default TimeDiff;
