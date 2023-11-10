# Craft Social

![Craft Social](./README_images/responsive.png)

## Intro

Craft Social is a social platform where tradesmen and skilled workers can share work related content. Showcasing their skills and abilities. It is designed to highlight good skills through the approval of people within the industry.

This repository is for the Craft Social frontend. The application also utilizes a backend API using Django Rest Framework, the repository for this can be found at [Craft-API](https://github.com/mtmanning93/craft-api).

### Live Site

[Hosted on Heroku](https://craftltd-6c672c6a814e.herokuapp.com/)

### Repository

[Github Repository](https://github.com/mtmanning93/craft-front)

### Project Stack

React, React-Bootstrap, CSS, HTML

### Get Started

To get started follow these steps to clone the github repository locally, and setup other dependencies: 

[Deployment](#deployment)

## Contents

- [Craft Social](#craft-social)
    - [Intro](#intro)
        - [Live Site](#live-site)
        - [Repository](#repository)
        - [Project Stack](#project-stack)
        - [Getting Started](#get-started)
    - [Design Thinking](#design-thinking)
        - [Problem ID](#problem-id)
        - [Problem Statement](#problem-statement)
        - [Design Thinking](#design-thinking)
    - [UX](#ux-user-experience-design)
        - [User Stories]()
            - [Site Admin]()
            - [User]()
            - [Registered User]()
        - [Wireframe]()
        - [Information Architecture]()
        - [Visual Design]()
            - [Color Scheme]()
            - [Fonts]()
            - [Icons]()
            - [Logo]()
    - [Database ERD]()
    - [Development]()
        - [Agile Design]()
            - [Github Issues]()
                - [Templates]()
                    - [User Story]()
                    - [Bug Report]()
                    - [Feature Request]()
                - [Labels]()
            - [Product Backlog]()
            - [Milestones]()
                - [Backend Iteration]()
                - [Frontend Iteration 1]()
                - [Frontend Iteration 2]()
                - [Frontend Iteration 3]()
                - [Frontend Iteration 4]()
            - [Project Board]()
    - [Features]()
        - [Current Features]()
        - [Future Features]()
        - [Defensive Design]()
    - [Technologies]()
        - [React]()
        - [React-Bootstrap]()
        - [Javascript]()
    - [Testing](testing.md)
    - [Bugs]()
        - [Resolved Bugs]()
        - [Unresolved Bugs]()
    - [Deployment]()
        - [Github Cloning]()
        - [Heroku Deployment]()
    - [Credits]()
        - [Tools]()
        - [Resources]()
        - [Tutorials]()

## Design Thinking

### Problem ID
---
For a tradesman there isnt a place for to share work. Instagram and Facebook are catered more to 'free-time' social activities. It would be beneficial to have platform to share work and related information with other like minded people who can appreciate it. Tradesman and manual workers are often very skilled individuals, their work is often taken for granted as they have knowhere to share it.

### Problem Statement
---
"As a *skilled tradesman*, I would like to have *a place to share work I am proud of* or updates on a particular project, but I dont know where to share work related content. Instagram is too social, and LinkedIn seems too corporate. This makes me feel *my work is not getting seen or appreciated* like other industries. Where can I share content, to *showcase my skills* for others to appreciate it."

### Site Goals
---
**User Goals** - The user wants the ability to share work and work related updates via a post, to a site with like minded individuals, showcasing their craft and abilities.

**Owner Goals** - To create an environment for people in highly skilled manual jobs to share their work, showcase their skills and have their work appreciated.

## UX/ User Experience Design
# ------------------------------------------------------------

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


[⏩ Testing README](README.md)

[⏫ contents](#contents)