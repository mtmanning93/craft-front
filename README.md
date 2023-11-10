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
    - [Database ERD](#database-erd)
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
    - [Deployment](#deployment)
        - [Github Cloning](#github-cloning)
        - [Heroku Deployment](#heroku-deployment)
    - [Credits](#credits)
        - [Tools](#tools)
        - [Resources](#resources)
        - [Tutorials](#tutorials)

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

[⏫ contents](#contents)

## UX/ User Experience Design

[⏫ contents](#contents)

## Database ERD

An entity relationship diagram was created to assist in the visualisation of the database structure. This visualisation was important to clarify what data would be needed in order to provide the functionality desired within the application. Below is an image of the Created ERD with the raltionships between models. A full rundown of the ERD and the databade models within can be found in the [Craft-API README/Database ERD](https://github.com/mtmanning93/craft-api/blob/main/README.md#database-erd)

<details>
<summary>Click to see Craft-API ERD image</summary>

![Craft Social API ERD](./README_images/api-erd.png)
</details>

## Development

[⏫ contents](#contents)

## Deployment

### Github Cloning
---

If you have also cloned and deployed your own version of the TribeHub Django Rest Framework API, you will need to ensure the value of axios.defaults.baseURL in src/api/axiosDefaults.js is set to the base URL for your API. Pull to your local development environment and push back to GitHub if necessary; otherwise, leave as is to use the original TribeHub API.

Fork or clone this project from its [GitHub repository](https://github.com/mtmanning93/craft-front), follow the steps below:

**1. Navigate to the craft-front repository, and click the green 'code' button.**

![Clone button in repo](./README_images/deployment/code_button.png)

**2. Once clicked, within the dropdown, fork or clone this project, here we will clone using the url.**

![Clone url](./README_images/deployment/clone_url.png)

**3. In your local IDE open your Git terminal**

**4. Change your working directory to your preferred location.**

**5. Next type the following command, the 'copied URL' is the URL taken form the Github repo.**

    git clone https://github.com/mtmanning93/craft-front

**6. Hit Enter to create the cloned repository.**

**7. Either use the original Craft Social API by making no changes. If you have cloned and deployed your own version of the [Craft-API](https://github.com/mtmanning93/craft-api/) using DRF, you must update the `axios.defaults.baseURL` found in `src/api/axiosDefaults.js` to the url of your deployed API**

    axios.defaults.baseURL = "<API URL>";

[⏫ contents](#contents)

### Heroku Deployment
---

The application was deployed using Heroku. Heroku simplifies the deployment process. With a few commands, you can deploy your application without the need to configure servers, networking, or infrastructure.

In order to deploy Craft Social to Heroku I followed these 8 steps:

**1. Navigate to the Heroku dashboard. Click "New" and select "Create new app".**

![Create new app](./README_images/deployment/heroku_new.png)

**2. Create an app name and select a region closest to you.**

![Giving the app a name](./README_images/deployment/app_name.png)

**3. Navigate to the 'Deploy' tab.**

![Deploy tab](./README_images/deployment/deploy.png)

**4. Scroll to the 'Deployment Methods' section and select 'Connect to GitHub'.**

![Step one connect to GitHub](./README_images/deployment/github_connect.png)

**5. Once connected to GitHub, search for the repository in the 'Connect to GitHub' section, and click 'Connect'.**

![Step two connect to Github](./README_images/deployment/repo_connect.png)

**6. I chose to enable 'Automatic Deploys'. In order to do so click the 'Enable Automatic Deploys' button.**

![Enable automatic deploys](./README_images/deployment/auto_deploy.png)

**7. For manual deployment use the 'Manual Deploy' section by clicking 'Deploy Branch'.**

![Manual deploys](./README_images/deployment/manual_deploys.png)

**8. Click 'View' at the bottom of the 'Manual Deploy' section to view the deployed project.**

![View deployed site button](./README_images/deployment/view_site.png)

[⏫ contents](#contents)

## Credits

### Tools
---
* To create the ERD diagram and Wireframes - [Lucid Chart](https://lucid.app/)

* To create the logo, siteicon, and default post image - [Looka](https://looka.com/)

* Default profile icon - [Iconfinder](https://www.iconfinder.com/search?q=construction)

* Favicon creator - [Favicon.io](https://favicon.io/)

* To check responsivity across multiple devices - [Am I Responsive](https://ui.dev/amiresponsive?url=https://craftltd-6c672c6a814e.herokuapp.com/)

* Post and profile images for mock data:
    - [Unsplash](https://unsplash.com/)
    - [Pexels](https://www.pexels.com/)

* Icons used throughout the site - [Font Awesome](https://fontawesome.com/)

* Font styles - [Google Fonts](https://fonts.google.com/)

### Resources
---
* [Code Institute](http://www.codeinstitute.net/) 'Moments' Walkthrough was used throughout the build as a reference and for specific use cases, which are documented below:
    * Current user context hook (`src/contexts/CurrentUserContext.js`)
    * The use of axios interceptors to refresh tokens (`src/api/axiosDefaults.js`)
    * Click outside toggle functionality (`src/hooks/useClickOutsideToggle.js`)
    * Redirect users based on authentication (`src/hooks/useRedirectUser.js`)
    * Form validation alerts (*site wide, example:* `src/pages/forms/LoginForm.js`)

* Infinite Scroll - [Npm react-infinite-scroll Docs](https://www.npmjs.com/package/react-infinite-scroll-component)

* React Select - [React Select Search Docs](https://react-select.com/home)

* To fix click outside custom dropdown (`src/components/NavBar.js`) - [Close Dropdown Link](https://stackoverflow.com/questions/32452695/react-bootstrap-how-to-collapse-menu-when-item-is-selected)

* Using 'isMounted' to avoid the 'can't perform a React state update on an unmounted component' warning (`src/components/WorkOfTheWeek.js`, `src/pages/forms/EditCompanyForm.js`) - [isMounted Thread](https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component)

* Using ref to store a reference to the current timeout (`src/components/tools/ErrorAlert.js`) - [Timeout Updating State](https://stackoverflow.com/questions/68886839/how-do-i-avoid-cant-perform-a-react-state-update-on-an-unmounted-component-er?rq=3)

**The below Docs were used extensively throughout the project build:**

* [React Docs](https://react.dev/reference/react)
* [React Router Docs](https://v5.reactrouter.com/web/api/Hooks/usehistory)
    - For assistance thoughout the project with built in hooks and router elements (For example: `useHistory()`, `<Link />`, `useLocation()`, `<NavLink />`)
* [React Router Bootstrap Docs](https://www.npmjs.com/package/react-router-bootstrap)
* [React Bootstrap 4 Docs](https://react-bootstrap-v4.netlify.app/)

### Tutorials
---

* Infinite Scroll - [Implementing Infinite Scroll](https://blog.logrocket.com/3-ways-implement-infinite-scroll-react/#call-fetchdata-component-mount)

* Setting up error alert system:
    * [Make An Alert Notification System](https://jujuontheweb.medium.com/react-usecontext-hook-to-make-an-alert-notification-system-for-your-entire-application-721b4c6b7d0f)
    * [Global Notifications](https://www.yld.io/blog/global-notifications-with-reacts-context-api/)


[⏩ Testing README](README.md)

[⏫ contents](#contents)


# ------------------------------------------------------------

### Libraries

react bootstrap4

npm install react-router-dom@5.3.0

npm install axios

npm install react-select

npm install jwt-decode

npm install react-router-bootstrap

npm install react-router

npm install infinite-scroll

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