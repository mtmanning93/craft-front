import React, { useEffect, useRef, useState } from "react";
import MainButton from "../../components/buttons/MainButton";
import mainStyles from "../../App.module.css";
import btnStyles from "../../styles/Buttons.module.css";
import { Alert, Col, Form, Image, Row } from "react-bootstrap";
import BackButton from "../../components/buttons/BackButton";
import Loader from "../../components/tools/Loader";
import uploadIcon from "../../assets/upload_icon.png";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/UpdateProfileForm.module.css";

const UpdateProfileForm = () => {

    const [profileData, setProfileData] = useState({
        name: "",
        image: "",
        job: "",
        bio: "",
    });

    const { name, image, job, bio } = profileData;

    const [errors, setErrors] = useState({});

    const imageSelection = useRef(null);

    const history = useHistory();

    const { id } = useParams();

    useEffect(() => {

        const getProfileData = async () => {
            try {
                const response = await axiosReq.get(`/profiles/${id}/`);
                const data = response.data;

                setProfileData({
                    name: data.name,
                    image: data.image,
                    job: data.job,
                    bio: data.bio,
                });
            } catch (error) {
                console.error(error);
            }
        };

        getProfileData();
    }, [id]);

    const handleChange = (event) => {
        setProfileData({
            ...profileData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append("name", name);
        formData.append("job", job);
        formData.append("bio", bio);
        formData.append("image", imageSelection?.current?.files[0] || "");

        try {
            await axiosReq.put(`/profiles/${id}/`, formData);
            history.push(`/profiles/${id}`);
        } catch (error) {
            console.error(error);
            error.response && error.response.data &&
                setErrors(error.response.data)
        }
    };

    return (
        <Col sm={12} md={10} lg={8} className="p-0">
            <Form onSubmit={handleSubmit} className={`${mainStyles.Content} m-3 pt-2 pb-2`}>
                <Row className="m-2 pb-2 border-bottom justify-content-end">
                    <Col className="text-right" xs={{ span: 6, order: 2 }} md={{ span: 4, order: 3 }}>
                        <BackButton />
                    </Col>
                </Row>

                <Row className={`${mainStyles.Content} m-2`}>
                    <Col className="border m-2">
                        <Form.Group className="m-0">
                            <Form.Label className="d-none">Image</Form.Label>
                            {image ? (
                                <>
                                    <figure>
                                        <Image className={styles.Image} src={image} />
                                    </figure>
                                    <div className={`p-0 mb-2`}>
                                        <Form.Label className="btn" htmlFor="upload">
                                            <i className="fa-solid fa-images mr-2" />
                                            Click to change image.
                                        </Form.Label>
                                    </div>
                                </>
                            ) : (
                                <Form.Label className="btn" htmlFor="upload">
                                    <Loader src={uploadIcon} message="Click here to upload an image." />
                                </Form.Label>
                            )}

                            <Form.File
                                id="upload"
                                accept="image/*"
                                onChange={(e) => {
                                    if (e.target.files.length) {
                                        setProfileData({
                                            ...profileData,
                                            image: URL.createObjectURL(e.target.files[0]),
                                        });
                                    }
                                }}
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
                    <Col className="border m-2">
                        <Form.Group>
                            <Form.Label>
                                <i className="fa-solid fa-user" /> Name:
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {errors.name?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}

                        <Form.Group>
                            <Form.Label>
                                <i className="fa-solid fa-trowel-bricks" /> Craft:
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="job"
                                placeholder="Job"
                                value={job}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {errors.job?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}

                        <Form.Group>
                            <Form.Label>
                                <i className="fa-solid fa-pencil" /> Bio
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                name="bio"
                                placeholder="Tell us about yourself..."
                                value={bio}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {errors.bio?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
                    </Col>
                </Row>

                <Row className="m-2">
                    <MainButton type="Update" text="Update Post!" className={btnStyles.Wide} />
                </Row>
            </Form>
        </Col>
    );
};

export default UpdateProfileForm;
