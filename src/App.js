import styles from "./App.module.css";
import { Container } from "react-bootstrap";
import { Redirect, Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/forms/SignUpForm";
import Header from "./components/Header";
import LogInForm from "./pages/forms/LogInForm";
import CreatePostForm from "./pages/forms/CreatePostForm";
import mainStyles from "./App.module.css";
import NavBar from "./components/NavBar";
import PostDetails from "./pages/PostDetails";
import EditPostForm from "./pages/forms/EditPostFrom";
import ProfilePage from "./pages/ProfilePage";
import UpdateProfileForm from "./pages/forms/UpdateProfileForm";
import CompanyForm from "./pages/forms/CompanyForm";
import EditCompanyForm from "./pages/forms/EditCompanyForm";
import TopFeed from "./pages/TopFeed";
import DefaultFeed from "./pages/DefaultFeed";
import OtherFeeds from "./pages/OtherFeeds";
import ErrorAlert from "./components/tools/ErrorAlert";

function App() {
	return (
		<div className={styles.App}>
            <ErrorAlert />
			<NavBar />
			<Header />
			<Container fluid className={mainStyles.MainContainer}>
				<Switch>
					<Route exact path="/" render={() => <DefaultFeed />} />
					<Route exact path="/feed" render={() => <OtherFeeds />} />
					<Route exact path="/liked" render={() => <OtherFeeds />} />
					<Route exact path="/top" render={() => <TopFeed />} />
					<Route exact path="/login" render={() => <LogInForm />} />
					<Route exact path="/signup" render={() => <SignUpForm />} />
					<Route
						exact
						path="/posts/create/"
						render={() => <CreatePostForm />}
					/>
					<Route
						exact
						path="/posts/:id/edit"
						render={() => <EditPostForm />}
					/>
					<Route
						exact
						path="/posts/:id"
						render={() => <PostDetails />}
					/>
					<Route
						exact
						path="/profiles/:id"
						render={() => <ProfilePage />}
					/>
					<Route
						exact
						path="/profiles/:id/edit"
						render={() => <UpdateProfileForm />}
					/>
					<Route
						exact
						path="/companies/create/"
						render={() => <CompanyForm />}
					/>
					<Route
						exact
						path="/companies/:id/edit"
						render={() => <EditCompanyForm />}
					/>
					<Route path="/page-not-found" render={() => <h1>Resource not found!</h1>} />
                    <Redirect to="/page-not-found" />
				</Switch>
			</Container>
		</div>
	);
}

export default App;
