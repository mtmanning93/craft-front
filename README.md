# Craft Social

## Problem ID

"As a tradesman there isnt a place for us to share our work. Instagram and Facebook are catered more to 'free-time' social activities. It would be good to have platform to share my work with other like minded people who can appreciate it. Tradesman and manual workers are often very skilled individuals whos work is often taken for granted as we have knowhere to share it."

## Problem Statement

"As a *skilled tradesman*, I would like to have *a place to share work I am proud of* or updates on a particular project, but I dont know where to share work related content. Instagram is too social, and LinkedIn seems too corporate. This makes me feel *my work is not getting seen or appreciated* like other industries. Where can I share content, to *showcase my skills* for others to appreciate it?

## Site Goals

**User Goals** - The user wants the ability to share work and work related updates via a post, to a site ith like minded individuals, showcasing their craft and abilities.

**Owner Goals** - To create an environment for people in highly skilled manual jobs to share their work, showcase their skills and have their work appreciated.

### Libraries

react bootstrap4

npm install react-router-dom@5.3.0

npm install axios

npm install react-select

### Bugs

Not accepting populated image data:

	const handleSubmit = async (event) => {
		event.preventDefault();

		const formData = new FormData();
		if (imageSelection?.current?.files[0]) {
			formData.append("image", imageSelection.current.files[0]);
		}
		formData.append("title", title);
		formData.append("content", content);

		// formData.append(
		// 	"image",
		// 	imageSelection.current.files[0] || postData.image
		// );

		// console.log(postData);

axios defaults base URL was original set for the frontend url not the API

Not returning an image file:

    // Correct
    formData.append("image", imageSelection?.current?.files[0] || "");

    // INCORRECT ORIGNAL wasnt returnign an image instance.
    // formData.append("image", imageSelection.current.files[0] || profileData.image);

### undefined ids on initial mount how to debug:


	useEffect(() => {
		if (id !== undefined) {
			console.log("Before API request - id:", id);

			const getProfileCompanies = async () => {
				try {
					console.log("API request initiated");
					// simulateError();

					const { data: profileCompanies } = await axiosReq.get(
						`/companies/?owner__profile=${id}`
					);
					console.log("API request successful");
					setProfileCompanies(profileCompanies.results);
				} catch (err) {
					console.log("API request error:", err);
				}
			};

			getProfileCompanies();
			console.log("After API request");
		}
	}, [id]);


## WARNINGS

### Assignments to the 'filter' variable from inside React Hook useEffect will be lost after each render. 

src/pages/Feeds.js
Line 24:15:  Assignments to the 'filter' variable from inside React Hook useEffect will be lost after each render. To preserve the value over time, store it in a useRef Hook and keep the mutable value in the '.current' property. Otherwise, you can move this variable directly inside useEffect  react-hooks/exhaustive-deps

CORRECT

    useEffect(() => {
        
        let filter = ""
        
		const getPosts = async () => {

    

INCORRECT

	useEffect(() => {

		const getPosts = async () => {
			try {
				if (currentUrl === "/feed") {
					filter = `owner__followed__owner__profile=${user_id}&`;
				} else if (currentUrl === "/liked") {
					filter = `like__owner__profile=${user_id}&ordering=-like__created_on&`;
				}

				const { data } = await axiosReq.get(`/posts/?${filter}`);
				setPosts(data);
				setLoaded(true);
			} catch (error) {
				console.error(error);
			}
		};
		setLoaded(false);
		getPosts();

	}, [filter, currentUrl]);

### Warning: Can't perform a React state update on an unmounted component. 

[isMounted](https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component)

### React Hook useEffect has a missing dependency: 'handleMount'. Either include it or remove the dependency array

The warning you're seeing is a linting warning provided by the react-hooks/exhaustive-deps rule. It's suggesting that you have a missing dependency in the dependency array of the useEffect hook.

In your code, the handleMount function is defined inside the useEffect, and you're calling it directly inside the useEffect. Since it's defined within the scope of the useEffect, it doesn't need to be listed as a dependency. However, to satisfy the linting rule and make your code more explicit, you can define handleMount outside the useEffect and include it as a dependency if you use any external variables or props within the function.

CORRECT
UseEffect() dependency array warning:

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: obj }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
        ]);
        setObj({ results: [obj] });
        console.log(obj);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

INCORRECT (WARNINGS)
  const handleMount = async () => {
    try {
      const [{data: obj}] = await Promise.all([
        axiosReq.get(`/posts/${id}`),
      ])
      setObj({results: [obj]})
      console.log(obj)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleMount();
  }, [id]);

### Custom user context hook

### axios interceptors and access tokens

### Infinite Scroll

[Npm react infinite scroll docs](https://www.npmjs.com/package/react-infinite-scroll-component)
[NPM react infinite scroll github repo](https://github.com/ankeetmaini/react-infinite-scroll-component)
[Implementing Infinite sroll (log rocket)](https://blog.logrocket.com/3-ways-implement-infinite-scroll-react/#call-fetchdata-component-mount)

## Manual Testing

### simulating errors in try catch:

	// const simulateError = () => {
	// 	throw new Error("Simulated error message");
	// };

	// simulateError();