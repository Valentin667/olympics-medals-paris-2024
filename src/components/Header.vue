<script>
import Graph from './Graph.vue'; // Ou le bon chemin vers ton composant Graph
import "../styles/index.css";

export default {
  name: 'Header',
  components: {
    Graph,
  },
};
</script>

<template>
    <div class="card">
        <h1 style="--index: 1">Olympic medals per continents* in Paris 2024</h1>
        <Graph style="--index: 2"/>
        <aside style="--index: 3">
            <p class="methodology">
                * The composition of nations by continent and their subregions is
                based on UN's macro geographical (continental) regions, which can be
                found in:
                <a href="https://unstats.un.org/unsd/methodology/m49" target="_blank">unstats.un.org</a>
            </p>
            <p class="source">
                Source :
                <a href="https://www.olympiandatabase.com/index.php?id=180770&amp;L=1" target="_blank">olympiandatabase.com</a>
            </p>
        </aside>
    </div>
</template>

<style scoped>
/* Styles pour le header */
</style>