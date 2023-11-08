import { rest } from "msw";

const baseURL = "https://craft-api-aeec93e46ff2.herokuapp.com/";

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
    rest.post(`${baseURL}dj-rest-auth/logout/`, (req,res,ctx) => {
        return res(ctx.status(200));
    })
];
