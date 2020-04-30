import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import * as types from '../types';

const GithubState = props => {
   const initialState = {
      users: [],
      user: {},
      repos: [],
      loading: false,
   };

   const [state, dispatch] = useReducer(GithubReducer, initialState);

   // Search users
   const searchUsers = async text => {
      loading();
      const res = await axios.get(
         `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      dispatch({
         type: types.SEARCH_USERS,
         payload: res.data.items,
      });
   };

   // Get Users
   const getUser = async username => {
      loading();
      const res = await axios.get(
         `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      dispatch({
         type: types.GET_USER,
         payload: res.data,
      });
   };

   // Get Repos
   const getUserRepos = async username => {
      loading();
      const res = await axios.get(
         `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      dispatch({
         type: types.GET_REPOS,
         payload: res.data,
      });
   };

   // Clear Users
   const clearUsers = () => dispatch({ type: types.CLEAR_USERS });

   // Set Loading to TRUE
   const loading = () => dispatch({ type: types.SET_LOADING });

   return (
      <GithubContext.Provider
         value={{
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            searchUsers,
            getUser,
            getUserRepos,
            clearUsers,
         }}
      >
         {props.children}
      </GithubContext.Provider>
   );
};

export default GithubState;
