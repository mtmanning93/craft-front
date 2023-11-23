import { rest } from "msw";

const baseURL = "https://craft-api-aeec93e46ff2.herokuapp.com/";

// Automated Test handlers to support component tests.
export const handlers = [
	rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
		return res(
			ctx.json({
				pk: 1,
				username: "admin1",
				email: "",
				first_name: "",
				last_name: "",
				profile_id: 1,
				profile_image:
					"https://res.cloudinary.com/dsmfunyxk/image/upload/v1/media/images/emmanuil-androshchuk-lTWeAqwBKiM-unsplash_ldcyvn",
			})
		);
	}),
	rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
		return res(ctx.status(200));
	}),
	rest.get(`${baseURL}posts/`, (req, res, ctx) => {
		return res(
			ctx.json([
				{
					id: 20,
					owner: "Crossy",
					title: "A 3D puzzle this one was.",
					content:
						"Its amazing how complex some of this stuff can get!",
					created_on: "07/11/2023 - 10:50",
					updated_on: "07/11/2023 - 11:40",
					image: "https://res.cloudinary.com/dsmfunyxk/image/upload/v1/media/images/pexels-jiawei-cui-2310904_hwttpn",
					is_owner: false,
					profile_id: 7,
					profile_image:
						"https://res.cloudinary.com/dsmfunyxk/image/upload/v1/media/images/pexels-pixabay-220453_hizayp",
					profile_job: "Plumber",
					profile_location: "Caston, UK",
					like_id: null,
					comments_count: 0,
					likes_count: 1,
				},
				{
					id: 19,
					owner: "Crossy",
					title: "Exposed piping anyone??",
					content:
						"As a plumber the only time your work gets noticed is if someone asks for exposed piping, then we can be creative.",
					created_on: "07/11/2023 - 07:40",
					updated_on: "07/11/2023 - 11:44",
					image: "https://res.cloudinary.com/dsmfunyxk/image/upload/v1/media/images/pexels-max-rahubovskiy-8089256_uovsbm",
					is_owner: false,
					profile_id: 7,
					profile_image:
						"https://res.cloudinary.com/dsmfunyxk/image/upload/v1/media/images/pexels-pixabay-220453_hizayp",
					profile_job: "Plumber",
					profile_location: "Caston, UK",
					like_id: null,
					comments_count: 0,
					likes_count: 0,
				},
			])
		);
	}),
	rest.post(`${baseURL}likes/`, (req, res, ctx) => {
		return res(
			ctx.json({
				id: 15,
				owner: "admin1",
				post: 10,
				created_on: "29/10/2023 - 10:50",
			})
		);
	}),
];
