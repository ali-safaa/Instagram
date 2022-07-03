import { useState } from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRef } from 'react';

function PostFeed({ post }) {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [like, setLike] = useState(false);
  const [liked, setLiked] = useState([]);

  const likePost = async () => {
    setLike(false);
    await deleteDoc(doc(db, 'posts', post.id, 'likes', session.user.name));
  };

  const likePost2 = async () => {
    setLike(true);
    await setDoc(doc(db, 'posts', post.id, 'likes', session.user.name), {
      userName: session.user.name,
    });
  };

  useEffect(() => {
    onSnapshot(collection(db, 'posts', post.id, 'likes'), (snapshot) => {
      setLiked(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, []);

  const sendComment = async () => {
    setLoading(true);
    await addDoc(collection(db, 'posts', post.id, 'comments'), {
      comment: comment,
      userName: session.user.name,
      userImage: session.user.image,
    });
    setLoading(false);
    setComment('');
  };

  useEffect(() => {
    onSnapshot(collection(db, 'posts', post.id, 'comments'), (snapshot) => {
      setComments(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, []);
  return (
    <div
      key={post.id}
      id={post.id}
      className=" w-[400px] bg-white sm:w-[500px] m-auto mt-3 rounded-md"
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
          {like ? (
            <i
              onClick={likePost}
              className={`fas fa-heart hover:scale-125 text-red-600 sm:text-xl cursor-pointer`}
            ></i>
          ) : (
            <i
              onClick={likePost2}
              className="far fa-heart hover:scale-125 sm:text-xl cursor-pointer"
            ></i>
          )}
          {liked.length > 0 && <span className="ml-2"> {liked.length} </span>}
        </div>
        <div className="cursor-pointer">
          <i className="far fa-comment sm:text-xl hover:scale-125"></i>
          {comments.length > 0 && (
            <span className="ml-3">{comments.length}</span>
          )}
        </div>

        <div className="cursor-pointer">
          <i className="fas fa-share sm:text-xl hover:scale-125"></i>
          <span className="ml-3">0</span>
        </div>
      </div>

      <div className="flex items-center pl-5 py-3">
        <h4 className="mr-[10px] text-sm font-semibold">{post.userName} |</h4>
        <p className="font-light">{post.userCaption}</p>
      </div>

      <div className="space-y-5 px-5 overflow-y-auto w-full border-t">
        {comments.map((comment) => (
          <div key={comment.id} className="text-sm flex items-center">
            <img
              className="w-[30px] h-[30px] mr-3 rounded-full object-cover"
              src={comment.userImage}
              alt=""
            />
            <h3 className="font-semibold mr-2">{comment.userName} |</h3>
            <p>{comment.comment}</p>
          </div>
        ))}
      </div>
      {session && (
        <form className="py-3 flex items-center border-t">
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full text-sm pl-3 outline-none"
            type="text"
            placeholder="Type a comment"
          />
          <button
            type="submit"
            onClick={sendComment}
            className={`${!comment && 'text-blue-300 cursor-default'} ${
              loading && 'cursor-not-allowed text-opacity-60'
            } text-blue-500 cursor-pointer font-semibold rounded-md text-sm py-1 pr-3`}
          >
            {loading ? 'loading...' : 'Post'}
          </button>
        </form>
      )}
    </div>
  );
}

export default PostFeed;
