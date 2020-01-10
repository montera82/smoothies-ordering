<template>
  <div class="add-smoothie container">
    <h2 class="center-align indigo-text">Add New Smoothie Recipe</h2>
    <form @submit.prevent="addSmoothie">
      <div class="field title">
        <label for="title">Smoothie Title</label>
        <input type="text" name="title" v-model="title" />
      </div>

      <div
        v-for="(ingredient, index) in ingredients"
        :key="index"
        class="field"
      >
        <label for="ingredient">Ingredient:</label>
        <input type="text" name="ingredient" v-model="ingredients[index]" />
        <i class="material-icons delete" @click="deleteIngredient(index)"
          >delete</i
        >
      </div>

      <div class="field add-ingredient">
        <label for="add-ingredient">Add an ingredient</label>
        <input
          type="text"
          name="add-ingredient"
          v-model="another"
          @keydown.tab.prevent="addIngredient"
        />
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">Add Smoothies</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";

export default {
  name: "AddSmoothie",
  data() {
    return {
      title: null,
      another: null,
      ingredients: [],
      feedback: null
    };
  },
  methods: {
    addSmoothie() {
      console.log(this.title);
      if (this.title) {
        db.collection("smoothies")
          .add({
            title: this.title,
            slug: slugify(this.title, {
              replacement: "-",
              remove: /[$*_+~.()'"!\-:@]/g,
              lower: true
            }),
            ingredients: this.ingredients
          })
          .then(() => {
            this.$router.push({ name: "Index" });
          })
          .catch(err => console.log(err));
      } else {
        this.feedback = "You must enter a smoothie title";
      }
    },
    addIngredient() {
      if (this.another) {
        this.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
        console.log(this.ingredients);
      } else {
        this.feedback = "Please enter an ingredient and press tab";
      }
    },
    deleteIngredient(index) {
      this.ingredients = this.ingredients.filter((ingredient, i) => i != index);
    }
  }
};
</script>

<style>
.add-smoothie {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}

.add-smoothie h2 {
  font-size: 2em;
  margin: 20px auto;
}

.add-smoothie .field {
  margin: 20px auto;
  position: relative;
}
.add-smoothie .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>
