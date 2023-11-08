import React, { useRef, useState } from "react";
import { Form, Row, Col, Image, Alert } from "react-bootstrap";
import mainStyles from "../../App.module.css";
import styles from "../../styles/CreatePostForm.module.css";
import MainButton from "../../components/buttons/MainButton";
import Loader from "../../components/tools/Loader";
import uploadIcon from "../../assets/upload_icon.png";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import Avatar from "../../components/Avatar";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import BackButton from "../../components/buttons/BackButton";
import btnStyles from "../../styles/Buttons.module.css";
import { useRedirectUser } from "../../hooks/useRedirectUser";
import { useErrorContext } from "../../contexts/ErrorContext";

const CreatePostForm = () => {
	useRedirectUser("loggedOut");

	const { showSuccessAlert } = useErrorContext();
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
		formData.append("image", imageSelection.current.files[0] || "");
		formData.append("title", title);
		formData.append("content", content);

		if (imageSelection.current.files.length === 0) {
			setErrors({
				...errors,
				image: ["Please select an image for your post."],
			});
			return;
		}

		try {
			const response = await axiosReq.post("/posts/", formData);
			showSuccessAlert(
				"Success",
				"Your post was successfully created.",
				"success"
			);
			history.push(`/posts/${response.data.id}`);
		} catch (err) {
			console.log(err);
			setErrors(err.response?.data || {});
		}
	};

	return (
		<Col
			sm={12}
			md={10}
			lg={8}
			className={`${mainStyles.Content} p-0 mt-3`}
		>
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
						<h1 className="mt-2">Create a post</h1>
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
						text="Post!"
						className={btnStyles.Wide}
					/>
				</Row>
			</Form>
		</Col>
	);
};

export default CreatePostForm;
