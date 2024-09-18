<script lang="tsx">
import { defineComponent, h } from "vue";
import "../styles/index.css";
import continents from "../utils/continents.json";
import { useIncrementalNumber } from "../hooks/useIncrementalNumber";  // Importe le hook

type ItemOf<T> = T extends (infer U)[] ? U : never;
type Continent = ItemOf<typeof continents>;

/**
 * Composant principal Graph
 */
export default defineComponent({
  name: "Graph",
  setup() {
    const totals = continents.map((c) => c.total);  // Total des médailles par continent

    return () => (
      <div class="continents">
        {continents.map((continent, k) => (
          <Ring {...continent} index={k} key={continent.name} max={Math.max(...totals)} />
        ))}
      </div>
    );
  },
});

/**
 * Composant Ring pour afficher les données par continent
 */
const Ring = defineComponent({
  name: "Ring",
  props: {
    name: String,
    gold: Number,
    silver: Number,
    bronze: Number,
    total: Number,
    index: Number,
    max: Number,
  },
  setup(props) {
    // Utilise useIncrementalNumber pour animer la valeur de total
    const count = useIncrementalNumber(props.total!, 700, 1000);  // Durée de 700ms, délai de 1000ms

    const ratio = props.total! / props.max!;
    const style = {
      "--index": props.index,
      "--ratio": ratio,
      "--color": `var(--ring${props.index! + 1})`,
    };

    return () => (
      <article class="continent" style={style}>
        <header>
          <h2>
            {props.name}: <strong>{count.value}</strong>  {/* Affiche la valeur animée */}
          </h2>
          <ul class="continent__medals">
            <Medal type="Gold" count={props.gold!} />
            <Medal type="Silver" count={props.silver!} />
            <Medal type="Bronze" count={props.bronze!} />
          </ul>
        </header>
        <div class="ring"></div>
      </article>
    );
  },
});

/**
 * Composant Medal pour afficher chaque médaille
 */
const Medal = defineComponent({
  name: "Medal",
  props: {
    type: String,
    count: Number,
  },
  setup(props) {
    return () => (
      <li class={`continent__medal ${props.type!.toLowerCase()}`}>
        <span>{props.count}</span>
      </li>
    );
  },
});
</script>
