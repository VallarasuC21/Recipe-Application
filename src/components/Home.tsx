import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { Recipe } from "../types/Recipe";

const Home: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      const querySnapshot = await getDocs(collection(db, "recipes"));
      const fetchedRecipes: Recipe[] = [];
      querySnapshot.forEach((doc) => {
        fetchedRecipes.push({ id: doc.id, ...doc.data() } as Recipe);
      });
      setRecipes(fetchedRecipes);
    };
    fetchRecipes();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "recipes", id));
    setRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(search.toLowerCase()) ||
    recipe.ingredients.some((ingredient) =>
      ingredient.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div>
      <h1>Recipe List</h1>
      <input
        type="text"
        placeholder="Search by title or ingredient"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Link to="/add">Add Recipe</Link>
      <ul>
        {filteredRecipes.map((recipe) => (
          <li key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>Ingredients: {recipe.ingredients.join(", ")}</p>
            <p>Steps: {recipe.steps.join(", ")}</p>
            <Link to={`/edit/${recipe.id}`}>Edit</Link>
            <button onClick={() => handleDelete(recipe.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
