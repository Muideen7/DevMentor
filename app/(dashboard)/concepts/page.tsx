import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { connectDB } from "@/lib/db/mongoose"
import Concept from "@/lib/db/models/Concept"
import { seedIfNeeded } from "@/lib/db/seeds/concepts"
import Link from "next/link"
import ConceptList from "@/components/concepts/ConceptList"

export const metadata = {
  title: "Concept Library | DevMentor AI",
  description: "Master programming fundamentals with AI-crafted lessons and mental models.",
}

async function getConcepts() {
  await seedIfNeeded()
  const concepts = await Concept.find({}).sort({ category: 1, title: 1 }).lean()
  return JSON.parse(JSON.stringify(concepts))
}

export default async function ConceptsPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const concepts = await getConcepts()

  return (
    <div className="max-w-6xl mx-auto pt-4 pb-20 animate-in fade-in duration-700">
      {/* Header */}
      <header className="mb-12 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
          Concept Library
        </h1>
        <p className="text-slate-500 font-medium max-w-2xl leading-relaxed">
           Deep-dive into core programming mental models. Master the "Why" behind the "How" with interactive explanations and code comparisons.
        </p>
      </header>

      {/* Concept List Client Component (Searchable) */}
      <ConceptList initialConcepts={concepts} />
    </div>
  )
}
