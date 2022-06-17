import { useState } from 'react';
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import Moment from 'react-moment';
function PostFeed({ post }) {
  const [comment, setComment] = useState('');
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [usersComments, setUsersComments] = useState([]);
  const [like, setLike] = useState('');

  const sendComment = async () => {
    if (loading) return;
    setLoading(true);

    await addDoc(collection(db, 'posts', post.id, 'comments'), {
      commentSend: comment,
      userName: session.user.name,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
    setLoading(false);
    setComment('');
  };

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, 'posts', post.id, 'comments'),
        orderBy('timestamp', 'desc')
      ),
      (snapshot) => {
        setUsersComments(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      }
    );
  }, []);

  const likePost = async () => {
    // await addDoc(collection(db, 'posts', post.id, 'likes'), {
    //   userName: session.user.name,
    // });
    await deleteDoc(doc(db, 'posts', post.id, 'likes', session.user.name));
  };
  console.log(like);
  return (
    <div
      key={post.id}
      id={post.id}
      className=" w-[400px] sm:w-[500px] m-auto mt-3 rounded-md bg-white"
    >
      <div className="flex items-center py-3 pl-3">
        <img
          className="w-[40px] h-[40px] object-cover rounded-full"
          src={post.userProfile}
          alt=""
        />
        <h3 className="ml-3 text-sm font-semibold flex-grow">
          {post.userName}
        </h3>
        <i className="fas fa-ellipsis-v mr-4 cursor-pointer"></i>
      </div>

      <img className="w-full sm:w-[500px]" src={post.image} alt="" />

      <div className="space-x-5 pt-3 pl-5 flex items-center">
        <div className="cursor-pointer">
          <i
            onClick={likePost}
            className="far fa-heart hover:scale-125 sm:text-xl cursor-pointer"
          ></i>
          <span className="ml-3">0</span>
        </div>

        <div className="cursor-pointer">
          <i className="far fa-comment sm:text-xl hover:scale-125"></i>
          <span className="ml-3">{usersComments.length}</span>
        </div>

        <div className="cursor-pointer">
          <i className="fas fa-share sm:text-xl hover:scale-125"></i>
          <span className="ml-3">0</span>
        </div>
      </div>

      <div className="flex items-center pl-5 py-3 border-b">
        <h4 className="mr-[10px] text-sm font-semibold">{post.userName} |</h4>
        <p className="font-light">{post.userCaption}</p>
      </div>

      {session && (
        <div className="overflow-y-scroll space-y-4 px-3 py-3 text-sm border-gray-400">
          {usersComments.map((userComment) => (
            <div key={userComment.id} className="flex items-center">
              <img
                className="w-[30px] h-[30px] mr-3 rounded-full object-cover"
                src={userComment.userImage}
                alt=""
              />
              <h3 className="font-semibold mr-2">{userComment.userName} |</h3>
              <p className="flex-grow">{userComment.commentSend}</p>
              <Moment className="text-xs text-gray-400" fromNow>
                {userComment.timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}
      {session && (
        <div className="py-3 flex items-center border-t">
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full text-sm pl-3 outline-none"
            type="text"
            placeholder="Type a comment"
          />
          <h3
            onClick={sendComment}
            className={`${!comment && 'opacity-60 cursor-default'} ${
              loading && 'cursor-not-allowed text-opacity-60'
            } text-blue-500 cursor-pointer font-semibold rounded-md text-sm py-1 pr-3`}
          >
            {loading ? 'loading...' : 'Post'}
          </h3>
        </div>
      )}
    </div>
  );
}

export default PostFeed;
