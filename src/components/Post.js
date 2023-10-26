import React from "react";
import styles from "../styles/Post.module.css";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { Card, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import Avatar from "./Avatar";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import mainStyles from "../App.module.css";
import BackButton from "../components/buttons/BackButton";
import { axiosRes } from "../api/axiosDefaults";

const Post = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    profile_job,
    profile_location,
    comments_count,
    likes_count,
    like_id,
    title,
    content,
    image,
    updated_on,
    setPosts,
  } = props;

  const currentUser = useCurrentUser();

  const is_owner = currentUser?.username === owner;

  const unlikePost = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count - 1, like_id: null }
            : post;
        }),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const likePost = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
            : post;
        }),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className={`${styles.Post} ${mainStyles.Content}`}>
      <Card.Body>
        <Row className="m-2 mb-3 align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`} className={styles.Author}>
            <Avatar src={profile_image} height={55} />
            <div className="ml-2">
              <Card.Title as="h4">{owner}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {profile_job && profile_job}
                {profile_location && (
                  <span className="ml-1">
                    <i class="fa-solid fa-location-dot"></i> {profile_location}
                  </span>
                )}
              </Card.Subtitle>
            </div>
          </Link>
          <div className="d-flex align-items-center mb-auto">
            <p className="mb-0">{updated_on}</p>
            {is_owner && (
              <span className={styles.Settings}>
                <i class="fa-solid fa-wrench"></i>
              </span>
            )}
            <BackButton />
          </div>
        </Row>
        {title && (
          <Card.Text as="h3" className="m-2">
            {title}
          </Card.Text>
        )}
        {content && (
          <Card.Text className={styles.Description}>{content}</Card.Text>
        )}
      </Card.Body>
      <Link to={`/posts/${id}`} className="m-2">
        <Card.Img className={styles.Img} src={image} alt={title} />
      </Link>
      <Card.Footer className="d-flex align-items-center justify-content-end">
        <div className={styles.Controls}>
        <span className={styles.Count}>{comments_count}</span>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Join the discusion below.</Tooltip>}
          >
            <span className={styles.CommentIcon}>
              <i class="fa-solid fa-message fa-sm"></i>
            </span>
          </OverlayTrigger>
          <span className={styles.Count}>{likes_count}</span>
          {/* {is_owner ? (
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip>You cant like your own posts.</Tooltip>}
            >
              <i class="fa-regular fa-thumbs-up"></i>
            </OverlayTrigger>
          ) : */}
          {like_id ? (
            <span className={styles.LikeIcon} onClick={unlikePost}>
              <i class="fa-solid fa-thumbs-up"></i>
            </span>
          ) : currentUser ? (
            <span className={styles.LikeIcon} onClick={likePost}>
              <i class="fa-regular fa-thumbs-up"></i>
            </span>
          ) : (
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip>You must login or signup to like posts.</Tooltip>
              }
            >
              <i class="fa-regular fa-thumbs-up"></i>
            </OverlayTrigger>
          )}
        </div>
      </Card.Footer>
    </Card>
  );
};

export default Post;
