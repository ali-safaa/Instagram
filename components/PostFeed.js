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
import CommentValue from '../components/CommentValue';
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
    <div key={post.id} id={post.id} className=" w-max m-auto mt-3">
      <div>
        {!session ? (
          <>
            <div className="flex border rounded-t-md items-center py-3 pl-3 bg-white">
              <img
                className="w-[40px] h-[40px] object-cover rounded-full"
                src={post.userProfile}
                alt=""
              />
              <h3 className="ml-3">{post.userName}</h3>
            </div>
            <img className="w-[400px] sm:w-[500px]" src={post.image} alt="" />
          </>
        ) : (
          <div className="space-x-5 pt-3 pl-5 flex bg-white items-center">
            <div className="cursor-pointer">
              <i
                onClick={likePost}
                className="far fa-heart hover:text-2xl sm:text-xl cursor-pointer"
              ></i>
              <span className="ml-3">0</span>
            </div>
            <div className="cursor-pointer">
              <i className="far fa-comment sm:text-xl"></i>
              <span className="ml-3">0</span>
            </div>
            <div className="cursor-pointer">
              <i className="fas fa-share sm:text-xl"></i>
              <span className="ml-3">0</span>
            </div>
          </div>
        )}
        <div className="flex items-center bg-white pl-5 py-3">
          <h4 className="mr-[10px] text-sm font-semibold">{post.userName} |</h4>
          <p className="font-light">{post.userCaption}</p>
        </div>
        <div>
          {usersComments.map((userComment) => (
            <CommentValue key={userComment} userComment={userComment} />
          ))}
        </div>
        <div className="bg-white border-t border-gray-300 mb-3 border-b rounded-b-md flex items-center px-3 py-2">
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
            } text-blue-500 cursor-pointer font-semibold rounded-md text-sm py-1`}
          >
            {loading ? 'loading...' : 'Post'}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default PostFeed;
