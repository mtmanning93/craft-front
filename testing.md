# Testing

[⏪ Main README](README.md)

## Contents

- [JavaScript/ JSX Testing](#javascript-jsx-testing)
    - [ESLint](#eslint)
        - [Install/ Run](#install-run-eslint)
    - [React Testing Library]()
        - [MSW]()
- [Html Validation](#html-validation)
- [CSS Validation](#css-validation)
    - [Stylelint](#stylelint)
        - [Install/ Run](#install-run-stylint)
- [Manual Testing](#manual-testing)
    - [More...]()
    - [Simulating Errors](#simulating-errors)
- [Screen Testing]()
- [Browser Testing]()
- [Lighthouse]()

## JavaScript/ JSX Testing

### ESLint
---
I tested the majority of the codebase using ESLint. After running the linter initially there were 3 errors, all of which were found in the `App.test.js`, and were due to there being an empty test. This was fixed by writing some simple tests within the file.

#### Install/ Run Eslint

As 'create-react-app' automatically installs ESLint it was already configured, however the configuration needed can be seen below. Lastly I added a line to the 'scripts' section in my package.json to define "lint" before running the linter

To install ESLint in the terminal:

    npm install eslint --save-dev

The `package.json` file extra configuration:

    "eslintConfig": {
        "extends": [
        "react-app",
        "react-app/jest"
        ]
    },

Extra line in 'scripts' section:

    "lint": "eslint ."

Finally to run the linter:

    npm run lint

[ESLint Docs](https://eslint.org/docs)

[⏫ contents](#contents)

### React Testing Library
---

#### Mock Service Worker

## Html Validation

In this particular application there is only one Html file, public/index.html. However it still needs to be validated, for this [W3C Validator](https://validator.w3.org/) was used. The file returned no warnings or errors just some 'info' regarding the trailing '/' as the JSX syntax was used.

![Html Validation](./README_images/testing/html_validation.png)

## CSS Validation

### Stylelint
---
All the CSS style files were validated using [Stylelint](https://stylelint.io/). It makes the validating of many style sheets quick and easy. After installing and setting the dependencies I was able to run the linter across all stylesheets with one simple command.

After runnning the linter for the first time I had 1 error, which was easily fixable in the `Buttons.module.css` file. The screenshot below shows the output from Stylelint.

![Stylelint Error](./README_images/testing/stylelint_error.png)

#### Install/ Run Stylint

To install Stylint I used the following command. To avoid setting up unecessary configurations I used the 'stylelint-config-recommended' extension on the command:

    npm install stylelint stylelint-config-recommended --save-dev

As the docs say the next step was to create a `.stylelintrc.json` file in the root directory, inside I added the following:

    {
        "extends": "stylelint-config-recommended"
    }

Next I added yet another new line to the 'scripts' section of the package.json file:

    "lint:css": "stylelint 'src/**/*.css'"

*(the src/**/*.css basically means the linter will check any files ending in .css in the src directory)*

Finally to run the linter I could use the custom script command:

    npm run lint:css

[For more on getting started with Stylelint](https://stylelint.io/user-guide/get-started)

## Manual Testing

Manual tests were created to test the functionality of the final deployed version of the site, the outcomes were documented and displayed in the table below. Duzring the testing phase, occassionally tests would fail. If a test did fail, the issue would be addressed accordingly and the outcome of the additional testing is also provided 

tested on desktop size
*** More

| **Test** | **User Story** | **Expected Outcome** | **Initial Result** | **Action Taken To Pass *(if fail)*** |
| ---- | ------ | ------ | ------ | ------ |
| **[Craft Front Iteration 1 (Navbar/ Registration)](https://github.com/mtmanning93/craft-front/milestone/3)** |
| Click logo in navbar | [Navigation #2](https://github.com/mtmanning93/craft-front/issues/2) | The main Navbar should include a logo to identify the site easily and quickly. It should be clickable as the main home link. | Pass | - |
| Click 'Home' link | [Navigation #2](https://github.com/mtmanning93/craft-front/issues/2) | Clicking the 'Home' link in the logged out navbar should return a user to the home page. | Pass | - |
| Navigate to the 'Signup' button | [Navigation #2](https://github.com/mtmanning93/craft-front/issues/2) | The signup button should be bright and easily findable to attract new users. | Pass | - |
| Click 'Login' link | [Login #8](https://github.com/mtmanning93/craft-front/issues/8) | Clicking the 'Login' link should direct a user to the login form. | Pass | - |
| Click the 'Dont have an account yet?' link | [Login #8](https://github.com/mtmanning93/craft-front/issues/8) | The user is redirected to the 'Signup' from. | Pass | - |
| Enter invalid login data and submit form | [Login #8](https://github.com/mtmanning93/craft-front/issues/8) | The form validation errors should appear displaying necessary information. | Pass | - |
| Enter valid login data and submit form | [Login #8](https://github.com/mtmanning93/craft-front/issues/8) | The user is directed to the 'discover' feed, a success notification tells the user they have logged in. | Pass | - |
| After logging in click the avatar in the navbar | [Navigation #2](https://github.com/mtmanning93/craft-front/issues/2) | Once login is uccessful the navbar switches to the logged in nav, displaying the create post button and an avatar dropdown, with links to 'Profile', 'Settings' and 'Logout' | Pass | - |
| Click 'Signup' button | [Signup #3](https://github.com/mtmanning93/craft-front/issues/3) | Clicking the 'Signup' button should direct a user to the signup form | Pass | - |
| Click the 'Already have an account?' link | [Signup #3](https://github.com/mtmanning93/craft-front/issues/3) | The user is redirected to the 'Login' from. | Pass | - |
| Enter invalid signup data and submit form | [Signup #3](https://github.com/mtmanning93/craft-front/issues/3) | The form validation errors should appear displaying necessary information. | Pass | - |
| Enter valid login data and submit form | [Signup #3](https://github.com/mtmanning93/craft-front/issues/3) | The user is directed to the 'Login' form, logging in with new credentials logs user in as expected. | Pass | - |
| As a logged in user navigate to and click the logout link | [Logout #12](https://github.com/mtmanning93/craft-front/issues/12) | The user is logged out, redirected to the 'Home' page, and a success message appears, additionally the navbar reverts to the logged out navbar. | Pass | - |
| As a logged in user, select between the 4 different feeds by clicking the navigation tabs | [Feed Navigation #27](https://github.com/mtmanning93/craft-front/issues/27) | On selection, the active tab is visible and the content represents the current tab features. | Pass | - |
| **[Craft Front Iteration 2 (Create Post/ Post Details)](https://github.com/mtmanning93/craft-front/milestone/4)** |
| Navigate to and click the '+' create button in the navbar | [Create Posts #9](https://github.com/mtmanning93/craft-front/issues/9) | The user is directed to the create post form. | Pass | - |
| In the form do not enter any information, and submit form | [Create Posts #9](https://github.com/mtmanning93/craft-front/issues/9) | Form validation error displayed on image file fields | Pass | - |
| Add an image to the form, do not fill in the text fields, submit form | [Create Posts #9](https://github.com/mtmanning93/craft-front/issues/9) | Title validation error is displayed, 'This field may not be blank'. | Pass | - |
| After selecting an image file, click the 'change image file' text | [Create Posts #9](https://github.com/mtmanning93/craft-front/issues/9) | Users should be able to select and image file within the form and reselect if they wanted a different image. | Pass | - |
| Fill in the title field with the image selected, submit form | [Create Posts #9](https://github.com/mtmanning93/craft-front/issues/9) | The post is saved and the user is directed to the 'Post Details' page of the newly created post. | Pass | - |
| Click on a post instance | [Post Details #5](https://github.com/mtmanning93/craft-front/issues/5) | The user is redirected to the post detials page or the selected post. | Pass | - |
| Navigate back to the previous page, by clicking the 'return' button | [Post Details #5](https://github.com/mtmanning93/craft-front/issues/5) | A user is returned to the previous page. | Pass | - |
| Navigate to the authr detials of the post | [Post Details #5](https://github.com/mtmanning93/craft-front/issues/5) | A user should be able to easily identify the author and the profile details | Pass | - |
| Find the comments count, and check it corresponds to number of comments | [Post Details #5](https://github.com/mtmanning93/craft-front/issues/5) | Comment count should convey the correct number of comments | Pass | - |
| Navigate to the likes count | [Post Details #5](https://github.com/mtmanning93/craft-front/issues/5) | A visual representation of the number of likes per post is easily visible. | Pass | - |
| Hover over the comment icon | [Post Details #5](https://github.com/mtmanning93/craft-front/issues/5) | A tooltip should appear prompting the user to 'join the discussion below'. | Pass | - |
| As a logged out user hover over the like icon | [Like/ Unlike #21](https://github.com/mtmanning93/craft-front/issues/21) | A tooltip should display prompting users to 'login or signup to llike posts'. | Pass | - |
| As a logged in user hover over the like icon | [Like/ Unlike #21](https://github.com/mtmanning93/craft-front/issues/21) | A tooltip should display prompting a user to 'like this post'. | Fail - No tooltip shown | Pass - No tooltip was originally set, after setting  a tooltip test passed. |
| As a logged in user hovers over the unlike icon | [Like/ Unlike #21](https://github.com/mtmanning93/craft-front/issues/21) | A tooltip should display prompting a user to 'unlike this post'. | Fail | Pass - No tooltip was originally set, after setting a tooltip the test passed. |
| As a logged in user click the like icon | [Like/ Unlike #21](https://github.com/mtmanning93/craft-front/issues/21) | The like button switches appearance to give the user a response and the like count increases by 1 | Pass | - |
| As a logged in user click the unlike icon | [Like/ Unlike #21](https://github.com/mtmanning93/craft-front/issues/21) | The unlike button switches appearance to give the user a response and the like count decrease by 1 | Pass | - |
| Navigate to the comments section | [View Comments #6](https://github.com/mtmanning93/craft-front/issues/6) | A comments section should be clearly visible underneath the post detials for all users to read. | Pass | - |
| Comment shows necessary information | [View Comments #6](https://github.com/mtmanning93/craft-front/issues/6) | Each comment displays the author details, avatar, date of comment and the comment itself. | Pass | - |
| Submit invalid comment form by entering no information | [Comment #19](https://github.com/mtmanning93/craft-front/issues/19) | No comment is posted and validation error is displayed | Pass | - |
| Submit invalid data by adding just '    ' *(4 spaces)* into the form | [Comment #19](https://github.com/mtmanning93/craft-front/issues/19) | No comment is posted and validation error is displayed | Pass | - |
| Submit a valid form by leaving a comment | [Comment #19](https://github.com/mtmanning93/craft-front/issues/19) | The latest comment should appear at the top of the comments. No rerendering rquired. | Fail - Entire page rerenders | Pass - To prevent the rerendering the success message was removed as it didnt add to the user experience. |
| Navigate to the spanner icon and select delete from the dropdown | [Comment #19](https://github.com/mtmanning93/craft-front/issues/19) | On confirmation the users comment should be removed from the comment list. | Pass | - |
| Locate a post owned by the current user, navigate to the spanner dropdown and select 'delete' | [Delete Post #11](https://github.com/mtmanning93/craft-front/issues/11) | A delete confirmation modal should appear. | Pass | - |
| Confirm the post deletion. | [Delete Post #11](https://github.com/mtmanning93/craft-front/issues/11) | The post is removed from the site, and the user is redirected to the previous page. | Pass | - |
| **[Craft Social Front Iteration 3 (Post Feeds)](https://github.com/mtmanning93/craft-front/milestone/5)** |
| Navigate to the 'Home' feed | [Post List #4](https://github.com/mtmanning93/craft-front/issues/4) | As an unregistered user cou can see a full list of all site posts on the landing page. | Pass | - |
| As a logged in user navigate to the 'Discover' feed | [Post List #4](https://github.com/mtmanning93/craft-front/issues/4) | A full list of all site posts can be scrolled through ordered by most recent first. | Pass | - |
| Click on the author details section with the avatar | [Post List #4](https://github.com/mtmanning93/craft-front/issues/4) | Users are redirected to the profile of the author | Pass | - |
| Click on the post image | [Post List #4](https://github.com/mtmanning93/craft-front/issues/4) | Users are directed to the post detials page of the selected post. | Pass | - |
| As a logged in user navigate to the 'Feed' tab. | [Followed Feed/ Feed #33](https://github.com/mtmanning93/craft-front/issues/33) | The selected tab is visible and a message is displayed "No posts yet! You do not follow anybody.". | Pass | - |
| Follow another users profile, navigate back to the 'Feed' tab | [Followed Feed/ Feed #33](https://github.com/mtmanning93/craft-front/issues/33) | The followed profiles posts can be seen in the feed | Pass | - |
| Unfollow a profile then navigate to the 'Feed' tab. | [Followed Feed/ Feed #33](https://github.com/mtmanning93/craft-front/issues/33) | The unfollowed profile posts should not be found in the feed and the "No posts yet!" message is displayed. | Pass | - |
| Click the 'get started here' text link | [Followed Feed/ Feed #33](https://github.com/mtmanning93/craft-front/issues/33) | The user should be redirected to the 'Discover' feed. | Pass | - |
| As a logged in user navigate to the 'Liked' tab. | [Liked Feed #32](https://github.com/mtmanning93/craft-front/issues/32) | The selected tab is visible and a message is displayed "No posts yet! You have not liked any posts". | Pass | - |
| Like a post, then navigate back to the 'Liked' tab | [Liked Feed #32](https://github.com/mtmanning93/craft-front/issues/32) | The liked post can be seen in the feed. | Pass | - |
| Unlike a post you have previously liked, then navigate to the 'Liked' tab. | [Liked Feed #32](https://github.com/mtmanning93/craft-front/issues/32) | The unliked post should not be found in the feed and the "No posts yet!" message is displayed. | Pass | - |
| Click the 'get started here' text link | [Liked Feed #32](https://github.com/mtmanning93/craft-front/issues/32) | The user should be redirected to the 'Discover' feed. | Pass | - |
| Scroll to the bottom of the feed | [Infinite Scroll #30](https://github.com/mtmanning93/craft-front/issues/30) | A spinner is displayed as more posts data loads, when the user has loaded all posts a message is displayed stating "no more posts to load" | Pass | - |
| Navigate to the 'Work of the Week' component | [Top Posts 'WOTW' #13](https://github.com/mtmanning93/craft-front/issues/13) | Users should be easily able to find the 'Work of the Week' from any page of the site. | Pass | - |
| Click on a post inside the 'Work of the Week' component. | [Top Posts 'WOTW' #13](https://github.com/mtmanning93/craft-front/issues/13) | A user is directed to the relevant post detials page. | Pass | - |
| Like a post from the WOTW list | [Top Posts 'WOTW' #13](https://github.com/mtmanning93/craft-front/issues/13) | The likes count should have incremented by one within the WOTW post. | Pass | - |
| Unlike a post from the WOTW list | [Top Posts 'WOTW' #13](https://github.com/mtmanning93/craft-front/issues/13) | The likes count should have decremented by one within the WOTW post. | Pass | - |
| Posts change depending like count | [Top Posts 'WOTW' #13](https://github.com/mtmanning93/craft-front/issues/13) | When a post is liked more than one of the posts in the WOTW component it swaps places ensuring the most liked posts are always ordered correctly. | Pass | - |
| **[Craft Social Front Iteration 4 (Profile View)](https://github.com/mtmanning93/craft-front/milestone/6)** |
| Click a profile avatar | [Profile Pages #15](https://github.com/mtmanning93/craft-front/issues/15) | The avatars site wide should be a clickable link to the relevant profile details page. | Fail - In create post form | Pass - In post create form it isnt necessary for the Avatar to be a link as its a reference to the posts author. |
| On a profile page scroll down to a profile specific post list | [Profile Pages #15](https://github.com/mtmanning93/craft-front/issues/15) | Every profile should have a posts feed filled with posts the profile has created. | Pass | - |
| Check message for new profile | [Profile Pages #15](https://github.com/mtmanning93/craft-front/issues/15) | If a new profile has no posts yet the post list will display a "No posts yet!" message. | Pass | - |
| Click the 'get started here' link | [Profile Pages #15](https://github.com/mtmanning93/craft-front/issues/15) | The user is directed to the create post form. | Pass | - |
| Navigate to logged in profile, check post list title | [Profile Pages #15](https://github.com/mtmanning93/craft-front/issues/15) | If the current user owns the profile the post list title will display 'Your Posts:' | Pass | - |
| Navigate to another users profile, check post list title | [Profile Pages #15](https://github.com/mtmanning93/craft-front/issues/15) | The title should display the profiles username like: '<username>'s Posts:' | Pass | - |
| Navigate to 'magic' users profile. Check all relevant personal details are visible | [Profile Pages #15](https://github.com/mtmanning93/craft-front/issues/15) | The user should see all additional personal information displayed for 'magic', including: avatar, name, craft, employer, bio, joined date, owned companies. | Pass | - |
| Navigate to new user profile, check details. | [Profile Pages #15](https://github.com/mtmanning93/craft-front/issues/15) | only username is visible from personal information | Fail - Personal detials heading displays | Pass - Needed to update the conditional on the card footer to only display if the personal info fields had a value or if the profile companies array length was more than 0. |
| Navigate to 'magic's' profile, check the profile counters display | [Profile Pages #15](https://github.com/mtmanning93/craft-front/issues/15) | Under the profile username 4 counter fields should display, posts count, approval count, follower, and following counts. | Pass | - |
| Click the return button inside a profile page | [Profile Pages #15](https://github.com/mtmanning93/craft-front/issues/15) | The user is returned to the previous page. | Pass | - |
| Click Follow button on a profile | [Follow/ Unfollow #16](https://github.com/mtmanning93/craft-front/issues/16) | The 'follow' button should switch to an 'unfollow' button with new appearance, the profiles follower count should increase by 1. | Pass | - |
| Check following count on user profile | [Follow/ Unfollow #16](https://github.com/mtmanning93/craft-front/issues/16) | When a user follows a profile their following count should increase by 1 | Pass | - |
| Click Unfollow button on a profile | [Follow/ Unfollow #16](https://github.com/mtmanning93/craft-front/issues/16) | The 'unfollow' button should switch to the 'follow' button with new appearance, the profiles follower count should decrease by 1. | Pass | - |
| Check following count on user profile | [Follow/ Unfollow #16](https://github.com/mtmanning93/craft-front/issues/16) | When a user unfollows a profile their following count should decrease by 1 | Pass | - |
| Click Approve button on a profile | [Profile Approval #23](https://github.com/mtmanning93/craft-front/issues/23) | The 'approve' button should switch to an 'approved' button with new appearance, the profile approval count should increase by 1 | Pass | - |
| Click Approved button on a profile | [Profile Approval #23](https://github.com/mtmanning93/craft-front/issues/23) | The 'approved' button should switch to an 'approve' button with new appearance, the profile approval count should decrease by 1 | Pass | - |
| Click the Profile link in the navbars avatar dropdown menu | [User Profile #18](https://github.com/mtmanning93/craft-front/issues/18) | The user is directed to their profile page. | Pass | - |
| Access profile settings via the spanner dopdown menu | [User Profile #18](https://github.com/mtmanning93/craft-front/issues/18) | Users can access the update profile form via the spanner dropdown menu on their profile, clicking the 'edit' option. | Pass | - |
| Test form validation | [Update Profile #22](https://github.com/mtmanning93/craft-front/issues/22) | A user should be able to submit an empty form, meaning they can remove data they dont wish to share anymore. | Pass | - |
| Update profile image, select a new image for the avatar field | [Update Profile #22](https://github.com/mtmanning93/craft-front/issues/22) | On form submission the users profile image and avatar should change to the new image. | Pass | - |
| Update name field | [Update Profile #22](https://github.com/mtmanning93/craft-front/issues/22) | The users profile card should now show personal details section with the updated name. | Pass | - |
| Update craft field | [Update Profile #22](https://github.com/mtmanning93/craft-front/issues/22) | The users profile card should now show personal details section with the updated craft. | Pass | - |
| Update employer field | [Update Profile #22](https://github.com/mtmanning93/craft-front/issues/22) | The users profile card should now show personal details section with the updated employer (and location if available). | Pass | - |
| Update bio field | [Update Profile #22](https://github.com/mtmanning93/craft-front/issues/22) | The users profile card should now show personal details section with the updated bio. | Pass | - |
| Remove personal information field | [Update Profile #22](https://github.com/mtmanning93/craft-front/issues/22) | The users profile card should no longer show the relevant field | Pass | - |

| Click the add company button | [Employment Details #14](https://github.com/mtmanning93/craft-front/issues/14) | The user is redirected to the add company form. | Pass | - |
| Submit invalid add company form | [Employment Details #14](https://github.com/mtmanning93/craft-front/issues/14) | Validation errors are raised as the minimum required data for a Company is a title. | Pass | - |
| Submit minimal details | [Employment Details #14](https://github.com/mtmanning93/craft-front/issues/14) | The user can add a company title and submit the form, redirected back to the update profile form with the new company visible in the 'Owned Companies' section. | Pass | - |
| Submit all company field details | [Employment Details #14](https://github.com/mtmanning93/craft-front/issues/14) | The user can add a company title and submit the form, redirected back to the update profile form with the new company visible in the 'Owned Companies' section. It shows all company detials applied. | Pass | - |
| Check Owned Companies section displays correct information | [Employment Details #14](https://github.com/mtmanning93/craft-front/issues/14) | The company details provided are shown in each company instance within the 'Owned Companies' seciton | Fail - Unused field icons are displayed with no data | Pass - Updated conditional statements to only show icons if related company detilas are provided. |
| Click the edit option in company settings dropdown, within the update profile form | [Employment Details #14](https://github.com/mtmanning93/craft-front/issues/14) | The user is directed to the edit company form where they can update the company information. | Pass | - |
| Click the delete option in company settings dropdown, within the update profile form | [Employment Details #14](https://github.com/mtmanning93/craft-front/issues/14) | A confirmation modal is triggered to confirm the user wishes to delete the company, if confirmed the company instance is deleted, including from any user's employer field within their personal details. | Pass | - |
| Add company and select it as profiles employer instance | [Employment Details #14](https://github.com/mtmanning93/craft-front/issues/14) | Adding a new company adds it to the employer select dropdown menu. | Pass | - |
| Delete a company, find it is the employer select dropdown | [Employment Details #14](https://github.com/mtmanning93/craft-front/issues/14) | The company is removed from the dropdown. | Fail - The company can still be found in dropdown until refresh | Pass - |

Most approved test when approving a profile
|  |  |  | Pass | - |

### Simulating Errors
---
When creating alerts to show the user incase of an error, I sometimes needed to trigger the catch block. To do so I created a simple function to mock an error. This way I was able to see the alerts play out in the case of an actual error. Below is the simple function and function call I used throughout testing the errors and the alerts.
    
    // outside useEffect()

	const simulateError = () => {
	    throw new Error("Simulated error message");
	};

    // inside try block

	simulateError();


[⏪ Main README](README.md)

[⏫ contents](#contents)