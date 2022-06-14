import Moment from 'react-moment';

function CommentValue({ userComment }) {
  return (
    <div className="grid items-center overflow-x-scroll bg-white text-sm pl-3 pb-3 border-gray-400">
      <div className="flex items-center">
        <img
          className="w-[30px] h-[30px] mr-3 rounded-full object-cover"
          src={userComment.userImage}
          alt=""
        />
        <h3 className="font-semibold mr-2">{userComment.userName} |</h3>
        <p className="flex-grow">{userComment.commentSend}</p>
        <Moment className="pr-3 text-xs text-gray-400" fromNow>
          {userComment.timestamp?.toDate()}
        </Moment>
      </div>
    </div>
  );
}

export default CommentValue;
