"use client";

import { useEffect, useState } from "react";

// --- GLOBAL REFRESH MECHANISM SETUP ---
// Define the type for the setter function (the state dispatch function)
type SetRefreshKey = React.Dispatch<React.SetStateAction<number>>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const setGlobalRefreshKey: SetRefreshKey | null = null;

// NOTE: triggerDashboardRefresh is now defined LOCALLY inside useEffect and exported via window

// --- DATE UTILITY FUNCTION (Exported via window) ---
const getFutureDate = (days: number): string => {
  const future = new Date();
  future.setDate(future.getDate() + days);
  return future.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).replace(/ /g, "-");
};

// --- MOCK CONFIGURATION (Restored to simple export) ---
// Removing 'export' keyword from mockCampaignData to resolve TS2344 error,
// and defining it purely as a global internal variable.
interface Campaign {
  id: number;
  title: string;
  current: string;
  amount: string;
  goal: string;
  deadline: string;
}

const mockCampaignData: Campaign[] = [];

// --- WEB3 DATA FETCHING HOOK (SIMULATED) ---
const useCampaigns = (refreshKey: number) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOnChainData = async () => {
      setLoading(true);
      console.log(`Simulating fetching campaign list (Refresh Key: ${refreshKey})...`);

      await new Promise(resolve => setTimeout(resolve, 1000));

      // Data is retrieved from the mock storage
      setCampaigns([...mockCampaignData]);
      setLoading(false);
      console.log("Data fetched and ready.");
    };

    fetchOnChainData();
  }, [refreshKey]);

  return { campaigns, loading };
};

// --- METRIC CARDS DATA ---
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CONTRACT_ABI = [
  { name: "nextCampaignId", type: "function", outputs: [{ type: "uint256" }], stateMutability: "view" },
  {
    name: "getCampaign",
    type: "function",
    stateMutability: "view",
    inputs: [{ type: "uint256", name: "_campaignId" }],
    outputs: [
      { type: "string", name: "title" },
      { type: "string", name: "description" },
      { type: "uint256", name: "goal" },
      { type: "uint256", name: "raised" },
      { type: "uint256", name: "deadline" },
      { type: "address payable[]", name: "beneficiaries" },
      { type: "bool", name: "withdrawn" },
    ],
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const cards = [
  { id: 1, title: "Total Campaigns", number: 10 },
  { id: 2, title: "Active Campaigns", number: 2 },
  { id: 3, title: "Failed Campaigns", number: 1 },
  { id: 4, title: "Refunds Available", number: 100 },
];

const TableTitleData = [
  { id: 0, title: "No." },
  { id: 1, title: "Title" },
  { id: 2, title: "Status" },
  { id: 3, title: "Raised" },
  { id: 4, title: "Goal" },
  { id: 5, title: "Deadline" },
];

// --- COMPONENTS ---

interface CampaignCardProps {
  title: string;
  number: number;
}
const CampaignCard = ({ title, number }: CampaignCardProps) => {
  return (
    <div
      className="bg-gray-700 p-6 rounded-xl shadow-xl border-l-4 border-teal-500 w-full 
                    transform hover:scale-[1.02] transition duration-300 cursor-pointer"
    >
      <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">{title}</p>
      <h2 className="text-4xl font-bold text-white mt-1">{number}</h2>
    </div>
  );
};

interface TitleTableProps {
  title: string;
}

const TitleTable = ({ title }: TitleTableProps) => {
  return (
    <div className="text-sm font-semibold text-gray-700 border-r border-gray-400 p-3 flex items-center justify-center last:border-r-0">
      {title}
    </div>
  );
};

interface DataTabaleProps {
  no: number;
  title: string;
  current: string;
  amount: string;
  goal: string;
  deadline: string;
}

const DataTabale = ({ no, title, current, amount, goal, deadline }: DataTabaleProps) => {
  const statusColor = current === "Successful" ? "bg-green-600" : current === "Failed" ? "bg-red-600" : "bg-yellow-600";

  return (
    <div className="grid grid-cols-6 py-2 hover:bg-gray-200 transition duration-150 border-t border-gray-300 cursor-pointer">
      <div className="p-3 text-gray-600 text-sm flex items-center justify-center">{no}</div>
      <div className="p-3 text-gray-800 text-sm truncate">{title}</div>

      <div className="p-3 flex items-center justify-center">
        <span className={`px-2 py-0.5 text-xs font-medium text-white rounded-full ${statusColor}`}>{current}</span>
      </div>

      <div className="p-3 text-gray-800 text-sm flex items-center justify-center font-mono">{amount}</div>
      <div className="p-3 text-gray-600 text-sm flex items-center justify-center font-mono">{goal}</div>
      <div className="p-3 text-gray-600 text-sm flex items-center justify-center">{deadline}</div>
    </div>
  );
};

const DonationForm = () => {
  const [donationAmount, setDonationAmount] = useState("");
  const [campaignId, setCampaignId] = useState("");

  const handleDonation = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Attempting to donate ${donationAmount} ETH to campaign ${campaignId}`);
    alert(`Simulated: Sent ${donationAmount} ETH to Campaign ID ${campaignId}`);
    setDonationAmount("");
    setCampaignId("");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-2xl space-y-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">Quick Donation</h2>

      <form onSubmit={handleDonation} className="space-y-4">
        <div className="space-y-1">
          <label htmlFor="campaignId" className="text-sm font-semibold text-gray-700 block">
            Campaign ID / Title
          </label>
          <input
            type="text"
            id="campaignId"
            value={campaignId}
            onChange={e => setCampaignId(e.target.value)}
            placeholder="e.g., Water Relief Fund or ID 105"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition placeholder-gray-500 bg-white text-gray-700"
            required
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="amount" className="text-sm font-semibold text-gray-700 block">
            Amount (ETH)
          </label>
          <input
            type="number"
            name="amount"
            id="amount"
            placeholder="e.g., 0.5"
            min="0.0001"
            step="0.0001"
            value={donationAmount}
            onChange={e => setDonationAmount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition placeholder-gray-500 bg-white text-gray-700"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 font-bold rounded-lg shadow-md transition duration-150 bg-green-600 text-white hover:bg-green-700"
        >
          ✅ Donate ETH Now
        </button>
      </form>
    </div>
  );
};

export default function HomePage() {
  // 2. State to trigger fetching and manage metrics
  const [refreshKey, setRefreshKey] = useState(0);

  // 3. Register the setter function globally on mount
  useEffect(() => {
    // Define the local trigger function here
    const localTriggerRefresh = () => {
      setRefreshKey(prev => prev + 1);
      console.log("Dashboard refresh triggered locally.");
    };

    // Register utilities globally on the window object
    (window as any).setGlobalRefreshKey = setRefreshKey;
    (window as any).mockCampaignData = mockCampaignData;
    (window as any).getFutureDate = getFutureDate;
    (window as any).triggerDashboardRefresh = localTriggerRefresh; // Use local definition

    // Cleanup function (important for unmounting)
    return () => {
      (window as any).setGlobalRefreshKey = null;
    };
  }, []);

  const { campaigns, loading } = useCampaigns(refreshKey);

  // 4. Dynamic metric calculation
  const totalCampaigns = campaigns.length;
  const activeCampaigns = campaigns.filter(c => c.current === "Ongoing").length;
  const failedCampaigns = campaigns.filter(c => c.current === "Failed").length;

  // Dynamic cards using calculated metrics
  const dynamicCards = [
    { id: 1, title: "Total Campaigns", number: totalCampaigns },
    { id: 2, title: "Active Campaigns", number: activeCampaigns },
    { id: 3, title: "Failed Campaigns", number: failedCampaigns },
    { id: 4, title: "Refunds Available", number: 100 },
  ];

  return (
    <main className="bg-gray-100 block min-h-screen p-4 md:p-8 text-gray-800">
      {/* 1. Dashboard Metrics Section */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {dynamicCards.map(card => (
            <CampaignCard key={card.id} title={card.title} number={card.number} />
          ))}
        </div>
      </div>

      {/* SECTION 2: DETAILS AND ACTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 2b. Donation Form */}
        <div className="lg:col-span-1">
          <DonationForm />
        </div>

        {/* 2a. Campaign Details Table */}
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Active Campaigns</h1>

          <div className="bg-white rounded-lg shadow-xl overflow-x-auto">
            <div className="min-w-[700px]">
              {/* Table Header Row */}
              <div className="grid grid-cols-6 bg-gray-200 border-b border-gray-300">
                {TableTitleData.map(ttable => (
                  <TitleTable key={ttable.id} title={ttable.title} />
                ))}
              </div>

              {/* Data Rows Rendering */}
              <div className="divide-y divide-gray-300">
                {/* LOADING STATE / EMPTY STATE */}
                {loading && <div className="p-4 text-center text-gray-500">Loading on-chain data...</div>}

                {!loading && campaigns.length === 0 && (
                  <div className="p-4 text-center text-gray-500">No active campaigns found. Create one now!</div>
                )}

                {/* MAPPING LIVE CAMPAIGNS */}
                {!loading &&
                  campaigns.map((dtable, index) => (
                    <DataTabale
                      key={dtable.id}
                      no={index + 1} // Use index + 1 for row number
                      title={dtable.title}
                      amount={dtable.amount}
                      current={dtable.current}
                      goal={dtable.goal}
                      deadline={dtable.deadline}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
