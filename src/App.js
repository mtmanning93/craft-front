import styles from "./App.module.css";
// import NavBar from "./components/NavBar";
import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import Header from "./components/Header";
import LogInForm from "./pages/auth/LogInForm";
import CreatePostForm from "./pages/posts/CreatePostForm";
import mainStyles from "./App.module.css";
import NewNav from "./components/NewNav";

function App() {
  return (
    <div className={styles.App}>
      <NewNav />
      {/* <NavBar /> */}
      <Header />
      <Container fluid className={mainStyles.MainContainer}>
        <Switch>
          <Route exact path="/" render={() => <h1>Home</h1>} />
          <Route exact path="/login" render={() => <LogInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/posts/create/" render={() => <CreatePostForm />} />
          <Route render={() => <h1>Page not found!</h1>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
