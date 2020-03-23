import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import axios from 'axios';
import './App.css';

const App = () => {
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState({});  
	const [repos, setRepos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState(null);

	// Search Github Users
	const searchUsers = async text => {
		setLoading(true);

		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CIENT_ID}&client_search=${process.env.REACT_APP_GITHUB_CIENT_SECRET}`
		);

		setUsers(res.data.items);
		setLoading(false);
	};

	// Get Single Github user
	const getUser = async username => {
		setLoading(true);

		const res = await axios.get(
			`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CIENT_ID}&client_search=${process.env.REACT_APP_GITHUB_CIENT_SECRET}`
		);

		setUser(res.data);
		setLoading(false);
	};

	// Get users repos
	const getUserRepos = async username => {
		setLoading(true);

		const res = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CIENT_ID}&client_search=${process.env.REACT_APP_GITHUB_CIENT_SECRET}`
		);

		setRepos(res.data);
		setLoading(false);
	};

	// Clear users from state
	const clearUsers = () => {
		setUsers([]);
		setLoading(false);
	};

	// Set Alert
	const showAlert = (msg, type) => {
		setAlert({ msg, type });
		setTimeout(() => setAlert(null), 5000);
	};

	return (
		<Router>
			<div className='App'>
				<Navbar />
				<div className='container'>
					<Alert alert={alert} />
					<Switch>
						<Route
							exact
							path='/'
							render={props => (
								<Fragment>
									<Search
										searchUsers={searchUsers}
										clearUsers={clearUsers}
										showClear={
											users.length > 0 ? true : false
										}
										setAlert={showAlert}
									/>
									<Users loading={loading} users={users} />
								</Fragment>
							)}
						/>
						<Route exact path='/about' component={About} />
						<Route
							exact
							path='/user/:login'
							render={props => (
								<User
									{...props}
									getUser={getUser}
									getUserRepos={getUserRepos}
									user={user}
									repos={repos}
									loading={loading}
								/>
							)}
						/>
					</Switch>
				</div>
			</div>
		</Router>
	);
};

export default App;

// import React, { Fragment, Component } from 'react';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import Navbar from './components/layout/Navbar';
// import Users from './components/users/Users';
// import User from './components/users/User';
// import Search from './components/users/Search';
// import Alert from './components/layout/Alert';
// import About from './components/pages/About';
// import axios from 'axios';
// import './App.css';

// class App extends Component {
// 	state = {
// 		users: [], 
// 		user: {},
// 		repos: [],
// 		loading: false,
// 		alert: null
// 	};

// 	// Search Github Users
// 	searchUsers = async text => {
// 		this.setState({ loading: true });

// 		const res = await axios.get(
// 			`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CIENT_ID}&client_search=${process.env.REACT_APP_GITHUB_CIENT_SECRET}`
// 		);

// 		this.setState({ users: res.data.items, loading: false });
// 	};

// 	// Get Single Github user
// 	getUser = async username => {
// 		this.setState({ loading: true });

// 		const res = await axios.get(
// 			`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CIENT_ID}&client_search=${process.env.REACT_APP_GITHUB_CIENT_SECRET}`
// 		);

// 		this.setState({ user: res.data, loading: false });
// 	};

// 	// Get users repos
// 	getUserRepos = async username => {
// 		this.setState({ loading: true });

// 		const res = await axios.get(
// 			`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CIENT_ID}&client_search=${process.env.REACT_APP_GITHUB_CIENT_SECRET}`
// 		);

// 		this.setState({ repos: res.data, loading: false });
// 	};

// 	// Clear users from state
// 	clearUsers = () => this.setState({ users: [], loading: false });

// 	// Set Alert
// 	setAlert = (msg, type) => {
// 		this.setState({ alert: { msg, type } });

// 		setTimeout(() => this.setState({ alert: null }), 5000);
// 	};

// 	render() {
// 		const { users, user, repos, loading } = this.state;

// 		return (
// 			<Router>
// 				<div className='App'>
// 					<Navbar />
// 					<div className='container'>
// 						<Alert alert={this.state.alert} />
// 						<Switch>
// 							<Route
// 								exact
// 								path='/'
// 								render={props => (
// 									<Fragment>
// 										<Search
// 											searchUsers={this.searchUsers}
// 											clearUsers={this.clearUsers}
// 											showClear={
// 												users.length > 0 ? true : false
// 											}
// 											setAlert={this.setAlert}
// 										/>
// 										<Users
// 											loading={loading}
// 											users={users}
// 										/>
// 									</Fragment>
// 								)}
// 							/>
// 							<Route exact path='/about' component={About} />
// 							<Route
// 								exact
// 								path='/user/:login'
// 								render={props => (
// 									<User
// 										{...props}
// 										getUser={this.getUser}
// 										getUserRepos={this.getUserRepos}
// 										user={user}
// 										repos={repos}
// 										loading={loading}
// 									/>
// 								)}
// 							/>
// 						</Switch>
// 					</div>
// 				</div>
// 			</Router>
// 		);
// 	}
// }

// export default App;

