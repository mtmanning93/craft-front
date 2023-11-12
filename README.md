# Craft Social

![Craft Social](README_images/responsive.png)

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
        - [User Stories](#user-stories)
            - [Site Admin](#site-admin)
            - [User](#user)
            - [Registered User](#registered-user)
        - [Wireframe](#wireframe)
        - [Information Architecture](#information-architecture)
        - [Visual Design](#visual-design)
            - [Color Scheme](#color-scheme)
            - [Fonts](#fonts)
            - [Icons](#icons)
            - [Logo](#logo)
    - [Database ERD](#database-erd)
    - [Development](#deployment)
        - [Agile Design](#agile-design)
            - [Github Issues](#github-issues)
                - [Templates](#templates)
                    - [User Story Template](#user-story-template)
                    - [Bug Report](#bug-report)
                    - [Feature Request](#feature-request)
                - [Labels](#labels)
            - [Product Backlog](#product-backlog)
            - [Iterations](#iterations)
                - [Backend Iteration]()
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

### Brainstorm
---
After establishing the site goals, A brainstorming session was carried out. Many ideas were written down and the final brainstorm sheet took the best ideas discussed together, for better clarity during the build. Below is the final sheet.

![Brainstorm sheet](README_images/ux/brainstorm.jpg)

[⏫ contents](#contents)

## UX/ User Experience Design

### User Stories
---
Once the main site functions and goals were decided on, user stories were created to clarify which tasks must be completed to reach the MVP (minimum viable product) of the site. Below are a few example user stories. To see all the user stories completed during the apllications build, and those left within the product backlog, visit this link [Craft Project Board](https://github.com/users/mtmanning93/projects/8).

#### Site Admin

> "As a site admin I can control all site content so that I can keep site content safe for all users."

#### User

> "As a user I can move through the site easily so that my experience when moving through the site is without frustration."
>
> "As a user I can view a list of all posts so that I have an overview of the entire site, and can easily select one to view more closely."
>
> "As an unregistered user I can sign up to an account so that I can enjoy the benefits of a registered user."
>
> "As a non-registered user I can view the comments left on each post so that I can read the conversation."
>
> "As a user I can select a post and read its content so that I can read more information about it."

#### Registered User

> "As a registered user I can login to my account so that i can use the registered user functions of the site."
>
> "As a registered user I can navigate to the feed which shows all posts from users i follow so that I can see what these users are up to easier."
>
> "As a registered user I can view a list of all posts I have liked so that I can see my favourite posts."
>
> "As a registered user I can edit a published post so that its contents is how I would like."
>
> "As a registered user I can login to my account so that i can use the registered user functions of the site."

[⏫ contents](#contents)

### Wireframe
---
To aid in the design of the UI a wireframe was created. The preference was to create a large wireframe incorporating all pages, to visualise the flow of the website as well as the design. I provided wireframes for, desktop/ laptop and mobile devices, along with the deletion confirmation modals.

Line Key:\
**Green** - Creation or Addition\
**Orange** - Action\

![Full wireframe and flow of Reach website](README_images/ux/wireframe.png)

[⏫ contents](#contents)

### Information Architecture
---
When building the project's wireframe it was important to take into consideration the positioning of elements. Across the entire application, the user will find the consistent layout of a navbar and header above the main content, and an extra 'Work of the Week' app on the right hand side of the main feed or object details. Key aspects of the information architecture, found throughout the site are:

- **Site Wide Navbar:**\
The navbar offers the user links to various pages of the site. For non-registered users simple 'home', 'login' and 'signup' links. Once logged in the naviation shows user related links, such as the main 'Create Report (+)' button and the user avatar dropdown. The dropdown for each registered user contains links to profile, settings and logout. The consistency of this navigations position aids the user in moving easily between user specific parts of the site, contributing to a better user experience.

- **Branding:**\
Within the navbar is a large site logo, this allows users to quickly identify the website and helps establish a visual identity. Its also a 'home' link when clicked, offering a return-to-home option wherever the user is in the site.

- **Header:**\
The header contains a simple welcome message and extra link to signup for unregistered users. For logged in users the header contains links, in the form of tabs, to the different feeds of the site, it is consisitently positioned througout the application again to enable the user to navigate easily through the feed pages.

- **Work of the Week:**\
The extra 'Work of the Week' (WotW) component is consistently positioned to the right of the main page details on desktops and at the top under the header for mobile devices. As one of the site goals is to hsowcase work this component had to be positioned in a clear, easy to locate place throughout the site.

[⏫ contents](#contents)

### Visual Design
---

#### Color Scheme

The main colors used throughout the site were:

![Color Palette](README_images/ux/color-palette.png)

* **#000000**
    - Used for fonts and borders. Provides high contrast against the backgrounds used throughout the site, creating better readability for the user.
* **#2a2a2a**
    - The main content container background color, chosen for its high contrast when rendering other components on top. The 'concrete gey' color also represents a sense of stability. Which is relatable to the target audience.
* **#4682B4**
    - The 'steel blue' color was used througout the site as an accent color to highlight varios items, mainly the user Avatar and 'add company' button, representing trust and professionalism.
* **#f0ad4e**
    - 'Warning yellow' catches the eye against the more plain background colors. It was used in the aplicaiton to draw attention to important elements, such as, the main action button component. Warning yellow is again relatable to the target audience as it often used in their industrys to gain attention.
* **#f5f5f5**
    - A light background color was needed for 'white space' in the site, to contrast against the main content background, and dark fonts.

#### Fonts

The fonts chosen were imported from [Google Fonts](https://fonts.google.com/). The main font used throughout the site was 'Titillium Web'. Titillium Web is a versatile font that was easily adaptable to different font elements. Whether it's used in headings, subheadings, or body text, the font remains easy to read. As a sans serif font it is simple and clear.

![An example of Titillium Web in different font sizes](README_images/ux/fonts.png)

#### Icons

Icons were used throughout the site to assist the user in clarifying different actions and elements. They are a simple yet very efficient way to convey a message to the user. I used the [Font Awesome](https://fontawesome.com/) library.

![Example FA icons](README_images/ux/icon-use.png)

#### Logo

A site logo was created using the [Looka](https://looka.com/explore) site. A site logo is an effective way for a user to immediately recognise the sites identity. Two logos were created for the site, a large named logo and a simple icon style logo, both were used in different situations, but mainly in the navigation bar as a link to home.

![Large named logo](README_images/ux/logo-large.png)
![Smaller icon logo](README_images/ux/logo-small.png)

[⏫ contents](#contents)

## Database ERD

An entity relationship diagram was created to assist in the visualisation of the database structure. This visualisation was important to clarify what data would be needed in order to provide the functionality desired within the application. Below is an image of the Created ERD with the raltionships between models. A full rundown of the ERD and the databade models within can be found in the [Craft-API README/Database ERD](https://github.com/mtmanning93/craft-api/blob/main/README.md#database-erd)

![Craft Social API ERD](README_images/api-erd.png)

[⏫ contents](#contents)

## Development

### Agile Design
---
Due to the size, and the many different parts of the Craft Social project, it was crucial to adopt an Agile methodology. The project was split into two with a backend to compliment the frontend, adding to the complexity. In a project of this size, it can be easy to move between the tasks, skipping parts or even leaving them unfinished. With an Agile approach, it was possible to identify the key components and sturcure needed to build the MVP, and seperate them into more manageable tasks. Manual testing was carried out on each component to ensure it was working as expected before moving onto the next task. This method enforces regular reflection on the projects progress.

#### Github Issues
---

#### Templates

Prior to the build process, three issue templates were created *(more information can be found below)*:

- [User Story](https://github.com/mtmanning93/craft-front/blob/main/.github/ISSUE_TEMPLATE/craft-user-story.md)
- [Bug Report](https://github.com/mtmanning93/craft-front/blob/main/.github/ISSUE_TEMPLATE/craft-bug-report.md)
- [Feature Request](https://github.com/mtmanning93/craft-front/blob/main/.github/ISSUE_TEMPLATE/craft-feature-request-form.md)

#### Labels

In the beginning of the build after creating the templates, labels also needed to be created. The first labels created were to assign each template with a front or backend label, this helped to clearly seperate tasks between the two project repositories. The repository labels:
- frontend
- backend

Nect prioritising labels were created to define the importance using the 'MoSCoW' principle, and seperate the templates into groups. The labels were used when assessing each iteration, meaning they were not static from the beginning, they were reassigned when necessary to adjust the level of importance of the user story, throughout each iteration in the overall project. The 4 prioritising labels were:
- Must Have
- Should Have
- Could Have
- Wont have

To compliment the build process and reach the project MVP within the timeframe, other labels were created. All bug reports were naturally labelled with 'bug' and feature requests with the corresponding label. The labels were:
- Bug
- Feature Request

[Project labels](https://github.com/mtmanning93/craft-front/labels)

[⏫ contents](#contents)

#### User Story Template

The first template created was the user story template. Every user story includes **Acceptance Criteria** and **Tasks**. The purpose of the user story was to begin the building process and help decide what features would be potentially included.

* **Acceptance Criteria**:
The acceptance criteria for a user story gives a clear indication of what the expected outcome for the user is, it contains no technical information with regards to completing the user story. However is clearly states what a user would expect in response.

* **Tasks**:
Once the user story was created and the acceptance criteria was assigned, the next step was to break it down into smaller tasks, all of which achievable in a day or less. I created the tasks as a checkable list, making it visually clear, whilst developing the project, what the next step was.

[Closed Issues list](https://github.com/mtmanning93/craft-front/issues?q=is%3Aissue+is%3Aclosed) | [Example user story](https://github.com/mtmanning93/craft-front/issues/2)

#### Bug Report

The next template created was the bug report. Whilst building the application and carrying out manual testing to check each components acceptance criteria was met, occassionally, I would notice a 'Bug'. In order to keep the development flow I would create bug reports and add them to the list of issues, preventing being side tracked. The bug reports were then addressed when the priority to do so was high, for example, when labeled a 'Must Have' within the current iteration.

If it was a bug within the current user story task I would assign the label 'Bug' to it.

[Assigned 'Bug' label](https://github.com/mtmanning93/craft-front/issues/20) | [Bug Report](https://github.com/mtmanning93/craft-front/issues/46)

#### Feature Request

The last template created was the feature request template. Whilst building such an application, or whilst demonstrating functionality to otheers ideas for new features would arise. Some of these ideas would clearly be a great addition to the application, however, applying them at that exact moment would slow down the overall production. Therefore adding feature requests to the product backlog meant they could be addressed once the MVP had been produced, or in future versions of the application.

[Example Feature Request](https://github.com/mtmanning93/craft-front/issues/47)

[⏫ contents](#contents)

#### Product Backlog
---
When creating new issues, bug reports, or feature request they were added directly to the [Craft Product Backlog](https://github.com/mtmanning93/craft-front/milestone/1). Once added to the product backlog it would be assigned the above mentioned labels. Throughout the build as iterations were created, issues would be would be taken from the product backlog and into the relevant iteration, reassigning the labels according to the specific iterations priorities.

[Craft Product Backlog](https://github.com/mtmanning93/craft-front/milestone/1)

#### Iterations
---
In order to manage the complexity of the project I implemented the use of iterations using the issue milestones in GitHub. The use of iterations meant I could breakdown the project and provide incremental delivery. This would help to provide clear feeback on progress throughout.

Each iteration was created with a due date. This was to allow for adaptations throughout. An example would be that if a user story was not complete before the iterations due date it was returned to the product backlog for review of its importance, then reprioritized accordingly.

A great effect that working in iterations has is it maintains a steady pace of work, keeps momentum, and keeps the development team motivated. This is due to the constant assessment of progress.

[Project iterations](https://github.com/mtmanning93/Reach_reports/milestones?state=closed)

#### Kanban Board
---
To help with the visualization of tasks in the project I implemented a Kanban board, using GitHub projects. The board was seperated into 3 columns; To Do, In Progress, and Done. All issues in the backlog were automatically added to the Kanban 'To Do' column. Throughout the build, I would take all issues from the current iteration into the 'In Progress' column. Once all tasks were completed in the issue I would move the issue over to the 'Done' column. 

When possible I would close an issue from the terminal using the `close #10` command from inside a commit message. This would automatically move the issue into the 'Done' column.

[Reach Kanban Board](https://github.com/users/mtmanning93/projects/7)

[⏫ contents](#contents)

## Deployment

### Github Cloning
---

If you have also cloned and deployed your own version of the TribeHub Django Rest Framework API, you will need to ensure the value of axios.defaults.baseURL in src/api/axiosDefaults.js is set to the base URL for your API. Pull to your local development environment and push back to GitHub if necessary; otherwise, leave as is to use the original TribeHub API.

Fork or clone this project from its [GitHub repository](https://github.com/mtmanning93/craft-front), follow the steps below:

**1. Navigate to the craft-front repository, and click the green 'code' button.**

![Clone button in repo](README_images/deployment/code_button.png)

**2. Once clicked, within the dropdown, fork or clone this project, here we will clone using the url.**

![Clone url](README_images/deployment/clone_url.png)

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

![Create new app](README_images/deployment/heroku_new.png)

**2. Create an app name and select a region closest to you.**

![Giving the app a name](README_images/deployment/app_name.png)

**3. Navigate to the 'Deploy' tab.**

![Deploy tab](README_images/deployment/deploy.png)

**4. Scroll to the 'Deployment Methods' section and select 'Connect to GitHub'.**

![Step one connect to GitHub](README_images/deployment/github_connect.png)

**5. Once connected to GitHub, search for the repository in the 'Connect to GitHub' section, and click 'Connect'.**

![Step two connect to Github](README_images/deployment/repo_connect.png)

**6. I chose to enable 'Automatic Deploys'. In order to do so click the 'Enable Automatic Deploys' button.**

![Enable automatic deploys](README_images/deployment/auto_deploy.png)

**7. For manual deployment use the 'Manual Deploy' section by clicking 'Deploy Branch'.**

![Manual deploys](README_images/deployment/manual_deploys.png)

**8. Click 'View' at the bottom of the 'Manual Deploy' section to view the deployed project.**

![View deployed site button](README_images/deployment/view_site.png)

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

  <details>
<summary>Click to see Craft-API ERD image</summary>

![Craft Social API ERD](README_images/api-erd.png)
</details>