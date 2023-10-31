import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import WorkOfTheWeek from "../components/WorkOfTheWeek";
import stylesW from "../styles/WotW.module.css";
import mainStyles from "../App.module.css";
import ProfileCard from "../components/ProfileCard";
import { axiosReq } from "../api/axiosDefaults";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const ProfilePage = () => {
    const { id } = useParams();

    const [profile, setProfileData] = useState({ results: [] })

	useEffect(() => {
		const getProfileData = async () => {
			try {
				const [{ data: profile }] = await Promise.all([
					axiosReq.get(`/profiles/${id}`),
				]);
                console.log("Fetched Profile Data:", profile);
				setProfileData({ results: [profile] });
			} catch (err) {
				console.log(err);
			}
		};

		getProfileData();
	}, [id]);

	return (
		<Row className="w-100 p-2">
			<Col className="p-0">
				<Row
					className={`${mainStyles.Content} bg-warning border-dark m-0 mt-3 d-md-none`}
				>
					<p className={`${stylesW.Heading} mb-0 mt-2 ml-3 ml-sm-4`}>
						Work of the week
					</p>
					<WorkOfTheWeek />
				</Row>
                <ProfileCard {...profile.results[0]}/>
			</Col>
			<Col
				className={`${stylesW.WotwContainer} ${mainStyles.Content} bg-warning border-dark ml-2 mt-3 p-0 d-none d-md-block`}
				md={4}
			>
				<p className={`${stylesW.Heading} m-0 mt-2 ml-2`}>
					Work of the week
				</p>
				<WorkOfTheWeek />
			</Col>
		</Row>
	);
};

export default ProfilePage;
