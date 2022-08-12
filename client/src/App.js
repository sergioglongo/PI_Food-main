import './App.css';
import {Route} from 'react-router-dom'
import Nav from './components/Nav'
import Recipes from './components/Recipes'
import RecipeDetail from './components/RecipeDetail'
import Filters from './components/Filters';
import Welcome from './components/Welcome';
import RecipeCreate from './components/RecipeCreate'
import SearchBar from './components/SearchBar';


function App() {
   


  return (
    <div className="App">
     <Route exact path='/' render={() => <Welcome /> } />
     <Route path='/FoodHome' render={() => <Nav /> } />
     <Route path='/FoodHome/Recipes' render={() => <SearchBar /> } />
     <Route exact path='/FoodHome/RecipeCreate' render={() => <RecipeCreate /> } />
     <Route exact path='/FoodHome/Recipes' render={() => <Filters /> } />
     <Route exact path='/FoodHome/Recipes' render={() => <Recipes /> } />
     <Route path='/FoodHome/RecipeDetail/:recipeId' component={RecipeDetail} />
    </div>
  );
}

export default App;
