import { Route } from 'react-router-dom'
import Nav from './components/Nav'
import RecipesContainer from './components/RecipesContainer'
import RecipeDetail from './components/RecipeDetail'
import Welcome from './components/Welcome';
import RecipeCreate from './components/RecipeCreate'
import Error404 from './components/Error404'
import './App.css'

function App() {



  return (
    <div className="App">
      <Route exact path='/' render={() => <Welcome />} />
      <Route path='/FoodHome' render={() => <Nav />} />
      <Route path='/FoodHome/Recipes' render={() => <RecipesContainer />} />
      <Route exact path='/FoodHome/RecipeCreate' render={() => <RecipeCreate />} />
      <Route path='/FoodHome/RecipeDetail/:recipeId' component={RecipeDetail} />
      <Route exact path="/error404" component={Error404} />
      {/* <Route path="*" component={Error404} /> */}
    </div>
  );
}

export default App;
