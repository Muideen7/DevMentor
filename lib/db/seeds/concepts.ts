import { connectDB } from "@/lib/db/mongoose"
import Concept from "@/lib/db/models/Concept"

const SEED_CONCEPTS = [
    {
        title: "Understanding Async/Await",
        slug: "async-await",
        category: "JavaScript",
        difficulty: "Intermediate",
        estimatedMinutes: 12,
        intro: "In JavaScript, operations like fetching data from an API or reading a file can take time. Async/Await is a powerful syntax that allows you to write this asynchronous code so it reads like standard, sequential instructions.",
        mentalModel: {
            text: "Think of a high-end restaurant kitchen. An async function is like a chef starting a pot of water to boil.",
            analogy: "I'm going to start this task (await), but I'm not going to stand here doing nothing. I'll prep the garnishes while the water heats up."
        },
        codeComparison: {
            oldWay: {
                label: "The Old Way (Promises)",
                code: `fetchData()\n  .then(response => response.json())\n  .then(data => console.log(data))\n  .catch(err => console.error(err));`
            },
            newWay: {
                label: "The Async/Await Way",
                code: `async function getData() {\n  try {\n    const res = await fetchData();\n    const data = await res.json();\n    console.log(data);\n  } catch (err) {\n    console.error(err);\n  }\n}`
            }
        },
        pitfalls: [
            { title: "Forgetting the 'await' keyword", description: "The function will return a Promise object instead of the resolved data." },
            { title: "Using 'await' in a non-async function", description: "This will throw a SyntaxError. Await can only be used inside async contexts." }
        ],
        quiz: {
            question: "What happens when the JavaScript engine encounters an 'await' keyword?",
            options: [
                "It stops the entire browser thread until the promise resolves.",
                "It pauses the execution of THAT function while the engine works on other tasks.",
                "It converts the asynchronous code into synchronous code permanently."
            ],
            correctIndex: 1
        },
        masteredCount: 1240
    },
    {
        title: "CSS Flexbox Layout",
        slug: "flexbox",
        category: "CSS",
        difficulty: "Beginner",
        estimatedMinutes: 8,
        intro: "Flexbox (Flexible Box Layout) is a 1-dimensional layout model for CSS that provides an efficient way to lay out, align, and distribute space among items in a container, even when their size is unknown.",
        mentalModel: {
            text: "Imagine your elements are passengers in a car. Flexbox is the set of rules that decides how they sit in the seats.",
            analogy: "Justify-content: center means 'Everyone, move to the middle seats!'"
        },
        codeComparison: {
            oldWay: {
                label: "The Old Way (Floats)",
                code: `.container { overflow: hidden; }\n.item { float: left; width: 33.3%; }\n/* ...clearfixes... */`
            },
            newWay: {
                label: "The Flexbox Way",
                code: `.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}`
            }
        },
        pitfalls: [
            { title: "Confusing flex-direction", description: "Switching from row to column flips what justify-content and align-items do." },
            { title: "Expecting 2D layout", description: "Flexbox is for rows OR columns. Use CSS Grid for complex 2D layouts." }
        ],
        quiz: {
            question: "Which property controls the alignment along the main axis?",
            options: ["align-items", "justify-content", "align-content", "flex-flow"],
            correctIndex: 1
        },
        masteredCount: 3200
    },
    {
        title: "The React Hook Lifecycle",
        slug: "react-hook-lifecycle",
        category: "React",
        difficulty: "Intermediate",
        estimatedMinutes: 15,
        intro: "Hooks like useEffect allow you to perform side effects in functional components. Understanding when they run is key to preventing bugs.",
        mentalModel: {
            text: "Think of useEffect as a specialized 'observer' that only wakes up when its assigned variables change.",
            analogy: "It's like an alarm clock set to only go off when the sun rises (variable A) OR the coffee is ready (variable B)."
        },
        codeComparison: {
            oldWay: {
                label: "Class Lifecycle",
                code: "componentDidMount() { ... }\ncomponentDidUpdate(prev) { ... }"
            },
            newWay: {
                label: "useEffect Hook",
                code: "useEffect(() => { ... }, [dependencies]);"
            }
        },
        pitfalls: [
            { title: "Infinite Loops", description: "Updating a dependency inside the same effect without careful state checks." },
            { title: "Stale Closures", description: "Using variables in an effect that aren't listed in the dependency array." }
        ],
        quiz: {
            question: "What happens if the second argument (dependency array) of useEffect is left empty []?",
            options: [
                "The effect runs on every single render.",
                "The effect runs only once after the initial mount.",
                "The effect never runs.",
                "The effect runs only when the component unmounts."
            ],
            correctIndex: 1
        },
        masteredCount: 5600
    }
];

export async function seedIfNeeded() {
    await connectDB()
    const count = await Concept.countDocuments()
    if (count === 0) {
        console.log("Seeding initial concepts...")
        await Concept.insertMany(SEED_CONCEPTS)
        console.log("Concepts seeded successfully!")
    }
}
