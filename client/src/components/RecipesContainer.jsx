import React from 'react';
import SearchBar from './SearchBar';
import Recipes from './Recipes'
import Pagination from './Pagination.jsx';
import Loading from './Loading';

export default function RecipesContainer(props) {
    return (
        <div>
            <SearchBar />
            {/* <Loading /> */}
            <Pagination />
            <Recipes />
        </div>
    );

}
