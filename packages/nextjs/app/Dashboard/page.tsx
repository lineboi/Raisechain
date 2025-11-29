"use client";

const cards = [
  { id: 1, title: "Total cambaign", number: 10 },
  { id: 2, title: "Active campign", number: 2 },
  { id: 3, title: "Failed campaign", number: 1 },
  { id: 3, title: "Refunds", number: 100 },
];

interface CampaignCardProps {
  title: string;
  number: number;
}
const CampaignCard = ({ title, number }: CampaignCardProps) => {
  return (
    <div className="bg-gray-700 p-6 rounded-xl shadow-lg border-l-4 border-teal-500 transition hover:shadow-2xl min-w-64 ">
      <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">{title}</p>
      <h2 className="text-4xl font-bold text-white mt-1">{number}</h2>
    </div>
  );
};
const TableTitle = [
  { id: 0, title: "No" },
  { id: 1, title: "Title" },
  { id: 2, title: "Current" },
  { id: 3, title: "Amount" },
  { id: 4, title: "Goal" },
  { id: 5, title: "Deadline" },
];

const TableData = [
  {
    id: 0,
    title: "Africa Water Charity",
    current: "Ongoing",
    amount: "1.0 ETH",
    goal: "2.0 ETH",
    deadline: "01-Dec-2025",
  },
  {
    id: 1,
    title: "Web3Mates Graduation Fund",
    current: "Successful",
    amount: "3.6 ETH",
    goal: "3.5 ETH",
    deadline: "15-Nov-2025",
  },
  {
    id: 2,
    title: "Local Community Events",
    current: "Failed",
    amount: "0.1 ETH",
    goal: "5.0 ETH",
    deadline: "01-Oct-2025",
  },
];

interface TitleTableProps {
  title: string;
}

const TitleTable = ({ title }: TitleTableProps) => {
  return (
    <div className="text-sm font-semibold text-gray-800 border-r border-gray-600 p-3 flex items-center justify-center last:border-r-0">
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
  return (
    <div className="grid grid-cols-6 hover:bg-gray-300 transition duration-150 border-t border-gray-700/50">
      <div className="p-3 text-gray-600 text-sm truncate">{no}</div>
      <div className="p-3 text-gray-600 text-sm truncate">{title}</div>
      <div className="p-3 text-gray-600 text-sm flex items-center justify-center">{current}</div>
      <div className="p-3 text-gray-600  text-sm flex items-center justify-center font-mono">{amount}</div>
      <div className="p-3 text-gray-600 text-sm flex items-center justify-center font-mono">{goal}</div>
      <div className="p-3 text-gray-600 text-sm flex items-center justify-center">{deadline}</div>
    </div>
  );
};
export default function HomePage() {
  return (
    <main className="bg-gray-100 block min-h-screen justify-center md:block ">
      <div>
        <h1 className="text-2xl font-bold text-gray-700 p-4">Dashboard Overview</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4 md:gap-6">
          {cards.map(card => (
            <CampaignCard key={card.id} title={card.title} number={card.number} />
          ))}
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-gray-700 p-4">Details</h1>
        <div>
          <div className="grid grid-cols-6  gap-1 bg-gray-300 m-1 ">
            {TableTitle.map(ttable => (
              <TitleTable key={ttable.id} title={ttable.title} />
            ))}
          </div>
          <div className="divide-y divide-gray-700/50">
            {TableData.map(dtable => (
              <DataTabale
                key={dtable.id}
                no={dtable.id + 1}
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
    </main>
  );
}
