import MealItem from "./meal-item";
import classes from "./meals-grid.module.css";

export default function MealsGrid({ meals }) {
  return (
    <ul className={classes.meals}>
      {meals.map((meal) => (
        <li key={meal.id}>
          <MealItem {...meal} />
          {/* we forward all props from the meal we have on line 7 to the MealItem component,
          by pulling out {...meal} all the props of the meal object on line 7 and spreading them 
          as key-value pairs (as props in the end) to the MealItem component */}
        </li>
      ))}
    </ul>
  );
}
