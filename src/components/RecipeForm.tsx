import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { Recipe } from "../types/Recipe";

const RecipeForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [steps, setSteps] = useState<string[]>([]);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      if (id) {
        const docRef = doc(db, "recipes", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const recipe = docSnap.data() as Recipe;
          setTitle(recipe.title);
          setIngredients(recipe.ingredients);
          setSteps(recipe.steps);
        }
      }
    };
    fetchRecipe();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newRecipe: Recipe = {
      id: id || uuidv4(),
      title,
      ingredients,
      steps,
    };

    await setDoc(doc(db, "recipes", newRecipe.id), newRecipe);
    navigate("/");
  };

  return (
    <div>
      <h1>{id ? "Edit Recipe" : "Add Recipe"}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Recipe Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Ingredients (comma-separated)"
          value={ingredients.join(", ")}
          onChange={(e) =>
            setIngredients(e.target.value.split(",").map((ing) => ing.trim()))
          }
          required
        />
        <textarea
          placeholder="Steps (comma-separated)"
          value={steps.join(", ")}
          onChange={(e) =>
            setSteps(e.target.value.split(",").map((step) => step.trim()))
          }
          required
        />
        <button type="submit">{id ? "Update" : "Add"} Recipe</button>
      </form>
    </div>
  );
};

export default RecipeForm;
