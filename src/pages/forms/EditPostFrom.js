import React, { useEffect, useRef, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import mainStyles from "../../App.module.css";
import styles from "../../styles/CreatePostForm.module.css";
import MainButton from "../../components/buttons/MainButton";
import Loader from "../../components/tools/Loader";
import uploadIcon from "../../assets/upload_icon.png";
import {
	useHistory,
	useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import Avatar from "../../components/Avatar";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import BackButton from "../../components/buttons/BackButton";
import btnStyles from "../../styles/Buttons.module.css";
import { useRedirectUser } from "../../hooks/useRedirectUser";
import { useErrorContext } from "../../contexts/ErrorContext";

const EditPostForm = () => {
	useRedirectUser("loggedOut");

	const { showErrorAlert } = useErrorContext();
	const currentUser = useCurrentUser();

	const [errors, setErrors] = useState({});
	const [postData, setPostData] = useState({
		title: "",
		content: "",
		image: "",
	});

	const { title, content, image } = postData;

	const imageSelection = useRef(null);
	const history = useHistory();
	const { id } = useParams();

	useEffect(() => {
		const getPostData = async () => {
			try {
				const { data } = await axiosReq.get(`/posts/${id}/`);
				if (data.is_owner) {
					setPostData(data);
				} else {
					showErrorAlert(
						"Unauthorized",
						`You are not the owner of this post, you cannot edit this post (id:${id}).`,
						"danger"
					);
					history.push("/");
				}
			} catch (err) {
				if (err.response.status === 404) {
					showErrorAlert(
						`${err.response.status} error!`,
						"Requested post could not be found or does not exist.",
						"warning"
					);
					history.push("/page-not-found");
				} else {
					showErrorAlert(
						`${err.response.status} error!`,
						`${err.message}`,
						"warning"
					);
					history.push("/");
				}
			}
		};

		getPostData();
	}, [history, id, showErrorAlert]);

	const handleImage = (event) => {
		const selectedFile = event.target.files[0];
		if (selectedFile) {
			const imageUrl = URL.createObjectURL(selectedFile);

			setPostData({
				...postData,
				image: imageUrl,
			});
		}
	};

	const handleChange = (event) => {
		setPostData({
			...postData,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const formData = new FormData();
		if (imageSelection?.current?.files[0]) {
			formData.append("image", imageSelection.current.files[0]);
		}
		formData.append("title", title);
		formData.append("content", content);

		try {
			await axiosReq.put(`/posts/${id}/`, formData);
            history.goBack()
		} catch (err) {
			setErrors(err.response?.data || {});
		}
	};

	return (
		<Col sm={12} md={10} lg={8} className="p-0">
			<Form
				onSubmit={handleSubmit}
				className={`${styles.Form} ${mainStyles.Content} border m-3 pt-2 pb-2`}
			>
				<Row className="m-2 pb-2 border-bottom">
					<Col xs={{ span: 6, order: 1 }} md={{ span: 4, order: 1 }}>
						<Avatar
							src={currentUser?.profile_image}
							height={40}
							text={currentUser?.username}
						/>
					</Col>
					<Col
						className="text-center pt-2 pt-md-0"
						xs={{ span: 12, order: 3 }}
						md={{ span: 4, order: 2 }}
					>
						<h1 className="mt-2">edit a post</h1>
					</Col>
					<Col
						className="text-right"
						xs={{ span: 6, order: 2 }}
						md={{ span: 4, order: 3 }}
					>
						<BackButton />
					</Col>
				</Row>

				<Row
					id="inputs"
					className={`${styles.FormWrap} ${mainStyles.Content} border m-2 p-2 p-md-0 flex-column flex-md-row`}
				>
					<Col className="m-md-2 p-0">
						{errors.non_field_errors?.map((message, idx) => (
							<Alert variant="warning" key={idx} className="mt-3">
								{message}
							</Alert>
						))}
						<Form.Group>
							<Form.Label className="d-none">Title</Form.Label>
							<Form.Control
								type="text"
								name="title"
								placeholder="Title..."
								value={title}
								onChange={handleChange}
							/>
						</Form.Group>
						{errors.title?.map((message, idx) => (
							<Alert variant="warning" key={idx}>
								{message}
							</Alert>
						))}
						<Form.Group>
							<Form.Label className="d-none">
								Description
							</Form.Label>
							<Form.Control
								as="textarea"
								rows={5}
								name="content"
								placeholder="Share more details..."
								value={content}
								onChange={handleChange}
							/>
						</Form.Group>
						{errors.content?.map((message, idx) => (
							<Alert variant="warning" key={idx}>
								{message}
							</Alert>
						))}
					</Col>

					<Col
						className={`${styles.ImgContainer} ${mainStyles.Content} border flex-column m-md-2 p-0 pt-2`}
					>
						<Form.Group className="m-0">
							<Form.Label className="d-none">Image</Form.Label>
							{image ? (
								<>
									<figure>
										<Image
											className={styles.Image}
											src={image}
										/>
									</figure>
									<div
										className={`${styles.ChangeImgBtn} p-0 mb-2`}
									>
										<Form.Label
											className="btn"
											htmlFor="upload"
										>
											<i className="fa-solid fa-images mr-2" />
											Click to change image.
										</Form.Label>
									</div>
								</>
							) : (
								<Form.Label className="btn" htmlFor="upload">
									<Loader
										src={uploadIcon}
										message="Click here to upload an image."
									/>
								</Form.Label>
							)}

							<Form.File
								id="upload"
								accept="image/*"
								name="image"
								onChange={handleImage}
								ref={imageSelection}
								hidden
							/>
						</Form.Group>
						{errors.image?.map((message, idx) => (
							<Alert variant="warning" key={idx}>
								{message}
							</Alert>
						))}
					</Col>
				</Row>
				<Row className="m-2">
					<MainButton
						type="submit"
						text="Update Post!"
						className={btnStyles.Wide}
					/>
				</Row>
			</Form>
		</Col>
	);
};

export default EditPostForm;
