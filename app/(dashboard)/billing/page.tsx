import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { connectDB } from "@/lib/db/mongoose"
import User from "@/lib/db/models/User"

export const metadata = {
  title: "Billing | DevMentor AI",
  description: "Manage your subscription, invoices, and payment methods.",
}

export default async function BillingPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  await connectDB()
  const user = await User.findById(session.user.id).lean()

  const billingHistory = [
    { id: "inv_1", date: "Oct 24, 2023", description: "Mentor Pro - Monthly", amount: "$12.00", status: "Paid" },
    { id: "inv_2", date: "Sep 24, 2023", description: "Mentor Pro - Monthly", amount: "$12.00", status: "Paid" },
    { id: "inv_3", date: "Aug 24, 2023", description: "Mentor Pro - Monthly", amount: "$12.00", status: "Paid" },
  ]

  return (
    <div className="max-w-5xl mx-auto pt-4 pb-20 animate-in fade-in duration-700">
      <header className="mb-12 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
          Billing & Subscription
        </h1>
        <p className="text-slate-500 font-medium max-w-lg leading-relaxed">
          Manage your plan, track your invoices, and update your payment information.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Active Plan */}
          <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-soft flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 size-64 bg-accent-coral/5 rounded-full -translate-y-32 translate-x-32 blur-3xl group-hover:bg-accent-coral/10 transition-all duration-700 pointer-events-none" />
            
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-widest rounded-full border border-emerald-100 mb-4">
                Active Subscription
              </span>
              <h3 className="text-3xl font-black text-slate-900 mb-1">{(user as any).plan || "Free"} Membership</h3>
              <p className="text-slate-500 font-medium text-sm">
                {(user as any).plan === 'Pro' ? "$12/mo · Renews on Nov 24, 2023" : "Complimentary access to core features."}
              </p>
            </div>

            <div className="flex gap-3 relative z-10 shrink-0">
               <button className="px-6 py-3 bg-slate-50 border border-slate-100 rounded-full font-black text-[10px] uppercase tracking-widest text-slate-600 hover:bg-slate-100 transition-all">
                  Manage
               </button>
               {(user as any).plan !== 'Pro' && (
                 <button className="px-8 py-3 bg-primary text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-900/10">
                    Upgrade to Pro
                 </button>
               )}
            </div>
          </section>

          {/* Payment Method */}
          <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-soft">
            <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-accent-coral">credit_card</span>
              Payment Method
            </h3>
            <div className="flex items-center justify-between p-6 bg-slate-50 border border-slate-100 rounded-2xl group hover:border-slate-200 transition-all">
              <div className="flex items-center gap-4">
                <div className="size-12 bg-white rounded-xl border border-slate-100 flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-slate-400">payments</span>
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900">Visa ending in 4242</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Expires 12/26</p>
                </div>
              </div>
              <button className="text-xs font-black text-accent-coral hover:underline uppercase tracking-widest">Edit</button>
            </div>
          </section>

          {/* Billing History */}
          <section className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-soft">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
               <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                <span className="material-symbols-outlined text-accent-coral">history</span>
                Billing History
              </h3>
              <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">Download All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead className="bg-slate-50/50">
                    <tr>
                       <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                       <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                       <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                       <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Invoice</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                    {billingHistory.map(item => (
                      <tr key={item.id} className="group hover:bg-slate-50/30 transition-colors">
                        <td className="px-8 py-6">
                           <p className="text-sm font-black text-slate-900">{item.date}</p>
                           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{item.description}</p>
                        </td>
                        <td className="px-8 py-6">
                           <span className="text-sm font-black text-slate-900">{item.amount}</span>
                        </td>
                        <td className="px-8 py-6">
                           <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-[8px] font-black uppercase tracking-widest rounded-full border border-emerald-100">
                              {item.status}
                           </span>
                        </td>
                        <td className="px-8 py-6 text-right text-slate-300 group-hover:text-accent-coral transition-colors">
                           <button className="material-symbols-outlined">picture_as_pdf</button>
                        </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
            </div>
          </section>

        </div>

        {/* Sidebar */}
        <div className="space-y-8">
           <section className="bg-primary rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 size-48 bg-accent-coral/20 rounded-full -translate-y-24 translate-x-12 blur-3xl pointer-events-none" />
              <h4 className="text-lg font-black mb-6 relative z-10">Pro Benefits</h4>
              <ul className="space-y-4 relative z-10">
                 {[
                   "Unlimited AI Code Reviews",
                   "Priority Mentor Chat",
                   "Custom Learning Paths",
                   "Exclusive Beta Concepts"
                 ].map((benefit, i) => (
                   <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-300">
                      <span className="material-symbols-outlined text-accent-coral text-lg font-black">check_circle</span>
                      {benefit}
                   </li>
                 ))}
              </ul>
              <div className="mt-8 pt-8 border-t border-white/10 flex flex-col gap-4 relative z-10">
                 <p className="text-xs text-slate-400 italic">"Upgrading to Pro saved me over 15 hours of debugging last month."</p>
                 <button className="w-full py-3 bg-accent-coral text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-accent-coral/20">
                    Upgrade Plan
                 </button>
              </div>
           </section>
        </div>

      </div>
    </div>
  )
}
