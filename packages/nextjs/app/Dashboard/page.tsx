"use client"

const CampaignCard=({title, number})=>{
    return (
        <div className="bg-gray-700 p-6 rounded-xl shadow-lg border-l-4 border-teal-500 transition hover:shadow-2xl min-w-64">
            <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">{title}</p>
            <h2 className="text-4xl font-bold text-white mt-1">{number}</h2>
        </div>
    );
}

export default function HomePage() {
    return(
        <main className="bg-gray-100 block min-h-screen justify-center">
            <h1 className="text-2xl font-bold text-gray-700 p-4">Dashboard Overview</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
               <CampaignCard title={"Total Campaign"} number={10}/> 
               <CampaignCard title={"Active Campaign"} number={0}/> 
            </div>
        </main>
    );
}