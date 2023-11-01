import styles from "./App.module.css";
import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/forms/SignUpForm";
import Header from "./components/Header";
import LogInForm from "./pages/forms/LogInForm";
import CreatePostForm from "./pages/forms/CreatePostForm";
import mainStyles from "./App.module.css";
import NavBar from "./components/NavBar";
import PostDetails from "./pages/PostDetails";
import Feed from "./pages/Feeds";
import EditPostForm from "./pages/forms/EditPostFrom";
import ProfilePage from "./pages/ProfilePage";
import UpdateProfileForm from "./pages/forms/UpdateProfileForm";
import CompanyForm from "./pages/forms/CompanyForm";

function App() {
	return (
		<div className={styles.App}>
			<NavBar />
			<Header />
			<Container fluid className={mainStyles.MainContainer}>
				<Switch>
					<Route exact path="/" render={() => <Feed/>} />
					<Route exact path="/feed" render={() => <Feed />} />
					<Route exact path="/liked" render={() => <Feed />} />
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
					<Route exact path="/profiles/:id" render={() => <ProfilePage />} />
					<Route exact path="/profiles/:id/edit" render={() => <UpdateProfileForm />} />
					<Route exact path="/companies/create/" render={() => <CompanyForm />} />
					<Route render={() => <h1>Page not found!</h1>} />
				</Switch>
			</Container>
		</div>
	);
}

export default App;
