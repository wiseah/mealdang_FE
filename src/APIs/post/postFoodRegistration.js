import axiosInstance from "../axiosInstance";

export default async function postFoodRegistration(main, side1, side2, side3, image) {
  try {
    const response = await axiosInstance.post(
      `/api/diets/mydiet/register/`,
      {
        main: {
          food_name: main.food_name,
          nutrients: {
            grain: main.nutrients.grain,
            fish_meat_low_fat: main.nutrients.fish_meat_low_fat,
            fish_meat_medium_fat: main.nutrients.fish_meat_medium_fat,
            vegetable: main.nutrients.vegetable,
            fat: main.nutrients.fat,
            dairy: main.nutrients.dairy,
            fruit: main.nutrients.fruit
          },
          recipe: main.recipe
        },
        side1: {
          food_name: side1.food_name,
          nutrients: {
            grain: side1.nutrients.grain,
            fish_meat_low_fat: side1.nutrients.fish_meat_low_fat,
            fish_meat_medium_fat: side1.nutrients.fish_meat_medium_fat,
            vegetable: side1.nutrients.vegetable,
            fat: side1.nutrients.fat,
            dairy: side1.nutrients.dairy,
            fruit: side1.nutrients.fruit
          },
          recipe: side1.recipe
        },
        side2: {
          food_name: side2.food_name,
          nutrients: {
            grain: side2.nutrients.grain,
            fish_meat_low_fat: side2.nutrients.fish_meat_low_fat,
            fish_meat_medium_fat: side2.nutrients.fish_meat_medium_fat,
            vegetable: side2.nutrients.vegetable,
            fat: side2.nutrients.fat,
            dairy: side2.nutrients.dairy,
            fruit: side2.nutrients.fruit
          },
          recipe: side2.recipe
        },
        side3: {
          food_name: side3.food_name,
          nutrients: {
            grain: side3.nutrients.grain,
            fish_meat_low_fat: side3.nutrients.fish_meat_low_fat,
            fish_meat_medium_fat: side3.nutrients.fish_meat_medium_fat,
            vegetable: side3.nutrients.vegetable,
            fat: side3.nutrients.fat,
            dairy: side3.nutrients.dairy,
            fruit: side3.nutrients.fruit
          },
          recipe: side3.recipe
        },
        image: image
      },
    );
    return response.data;
  } catch (error) {
    console.error('에러 발생:', error);
    throw error;
  }
}