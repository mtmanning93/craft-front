import { axiosReq } from "../../api/axiosDefaults";

/**
 * Fetches more objects for a paginated list resource.
 * @param {object} resource - resource state containing results and pagination information.
 * @param {function} setResource - function to set the state for updating the resource.
 * @param {function} setError - function for updating an error message.
 */
const fetchMoreData = async (resource, setResource, setError) => {
	try {
		const { data } = await axiosReq.get(resource.next);

		const newResults = [];

		for (const newResult of data.results) {
			let isDuplicate = resource.results.some(
				(existingResult) => newResult.id === existingResult.id
			);
			if (!isDuplicate) {
				newResults.push(newResult);
			}
		}

		setResource((prevResource) => ({
			...prevResource,
			next: data.next,
			results: [...prevResource.results, ...newResults],
		}));
	} catch (err) {
		setError(
			"An error occured whilst getting more data. Try again soon..."
		);
	}
};

export default fetchMoreData;