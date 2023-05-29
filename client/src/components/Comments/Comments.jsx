import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


import { ApiPath, AppRoute } from "../../common/constants";
import { UserContext } from "../../context/context";

import { useHttp } from "../../hooks/hooks";

import s from "./Comments.module.css";



function Comments() {
  const { filmId } = useParams();
  const { request, error } = useHttp();
  const navigate = useNavigate()
  const { user, saveUser } = useContext(UserContext)
  const [commentList, setCommentList] = useState([]);
  const [newComment, setNewComment] = useState('');

  const likePath = "/img/like.png";
  const dislikePath = "/img/dislike.png";
  const activeLikePath = "/img/active-like.png";
  const activeDislikePath = "/img/active-dislike.png";

  const handleTextareaOnChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleRateComment = (e) => {
    if (!user) {
      navigate(AppRoute.SIGN_IN);

    } else {
      const field = e.target.alt;
      const { id } = e.target.dataset;
      const { likes, dislikes } = commentList.find(item => item.id === id);
      const userComments = {};
      const commentRateCount = { likes, dislikes };
      for (const item in user.comments) {
        const commentIdList = user.comments[item];
        const isIncludes = commentIdList.includes(id);
        if (isIncludes) {
          userComments[item] = commentIdList.filter(commentId => commentId !== id);
          commentRateCount[item] -= 1;
        } else if (field === item) {
          userComments[item] = commentIdList.concat([id]);
          commentRateCount[item] += 1;
        } else {
          userComments[item] = commentIdList;
        }
      }
      saveUser({ ...user, comments: userComments });
      setCommentList(state => state.map(comment => comment.id === id ? ({ ...comment, ...commentRateCount }) : comment));
      request(ApiPath.userUpdate, "POST", { comments: userComments }, null, user.token)
        .then(res => res)
        .catch(e => console.log(e))
      request(ApiPath.commentUpdate, "POST", { ...commentRateCount, id })
        .then(res => res)
        .catch(e => console.log(e))

    }
  }

  const createComment = () => {
    const body = {
      author: `${user.firstName} ${user.lastName}`,
      video_id: filmId,
      content: newComment
    }
    setNewComment("");
    request(ApiPath.commentCreate, "POST", body)
      .then(res => setCommentList(state => state.concat([res])))
      .catch(e => console.log(e));
  }

  useEffect(() => {
    request(`${ApiPath.commentList}${filmId}`)
      .then(res => setCommentList(res))
      .catch(e => console.log(e));
  }, [])

  return (
    <>
      {user && (
        <>
          <textarea value={newComment} onChange={handleTextareaOnChange} className={s.textarea}></textarea>
          <button className={s.btn} onClick={createComment} disabled={!newComment}>leave a comment</button>
        </>
      )}
      <ul className={s.commentList}>
        {commentList.map(({ id, author, content, likes, dislikes }) => (
          <li className={s.commentItem} key={id}>
            <div className={s.commentWrapper}>
              <p className={s.commentAuthor}>{author}</p>
              <div className={s.commentContent}>
                <p className={s.commentText}>{content}</p>
                <span className={s.likes}>
                  <img
                    onClick={handleRateComment}
                    src={user?.comments.likes.includes(id) ? activeLikePath : likePath}
                    className={s.icon}
                    alt="likes"
                    data-id={id}
                    data-value={likes}
                  />
                  <span className={s.count}>{likes}</span>
                </span>
                <span className={s.dislikes}>
                  <img
                    onClick={handleRateComment}
                    src={user?.comments.dislikes.includes(id) ? activeDislikePath : dislikePath}
                    className={s.icon}
                    alt="dislikes"
                    data-id={id}
                    data-value={dislikes}
                  />
                  <span className={s.count}>{dislikes}</span>
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>

    </>
  );
};

export default Comments;