import React from "react";
import { Inbox, MailCheck, Clock, FileText, Mail } from "lucide-react";

const GradientCard = () => {
  return (
    <div className="rounded-3xl overflow-hidden bg-gradient-to-bl from-red-200 via-pink-400 to-purple-300 p-8 shadow-xl w-full max-w-md py-16">
      <div className="space-y-4">
        <div className="bg-black/90 text-white rounded-xl p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="text-white" size={24} />
              <div>
                <h3 className="font-medium text-lg">New inbox batch</h3>
                <p className="text-gray-400">369 messages</p>
              </div>
            </div>
            <button className="bg-black border border-gray-700 px-4 py-1 rounded-md text-white text-sm">
              Sort
            </button>
          </div>
        </div>

        <div className="bg-black/90 text-white rounded-xl p-5 shadow-lg">
          <div className="space-y-4">
            <MenuItem icon={<MailCheck size={20} />} label="To do" count={0} />
            <MenuItem icon={<Clock size={20} />} label="Reminders" count={0} />
            <MenuItem icon={<FileText size={20} />} label="Drafts" count={0} />
            <MenuItem icon={<Inbox size={20} />} label="Inbox" count={0} />
            <MenuItem icon={<Mail size={20} />} label="Newsletters" count={0} />
          </div>
        </div>
      </div>
    </div>
  );
};

const MenuItem = ({
  icon,
  label,
  count,
}: {
  icon: React.ReactNode;
  label: string;
  count: number;
}) => {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-gray-200">{label}</span>
      </div>
      <span className="text-gray-400">{count}</span>
    </div>
  );
};

export default GradientCard;
