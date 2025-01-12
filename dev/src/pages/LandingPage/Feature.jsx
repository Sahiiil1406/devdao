import { cn } from "@/lib/utils";
import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconRouteAltLeft,
  IconTerminal2,
} from "@tabler/icons-react";

export function FeaturesSectionDemo() {
  const features = [
    {
      title: "Interactive React Coding",
      description:
        "Live preview of React code as you write and real-time test validation.",
      icon: <IconTerminal2 />,
    },
    {
      title: "System Design Practice",
      description:
        "Drag-and-drop tools for designing high-level architectures with instant feedback.",
      icon: <IconEaseInOut />,
    },
    {
      title: "Backend Testing Environment",
      description:
        "Containerized testing with automated test execution and coverage reports.",
      icon: <IconCurrencyDollar />,
    },
    {
      title: "NFT-Based Achievement System",
      description:
        "Mint NFTs as proof of skill for completing challenges with plagiarism detection.",
      icon: <IconCloud />,
    },
    {
      title: "DevOps and CI/CD Practice",
      description:
        "Hands-on Dockerfile writing and real-world CI/CD pipeline setup.",
      icon: <IconRouteAltLeft />,
    },
    {
      title: "Decentralized Storage Integration",
      description:
        "Pinata integration for decentralized storage and multi-chain NFT minting.",
      icon: <IconHelp />,
    },
    {
      title: "CLI Tool for Power Users",
      description:
        "Terminal-based problem solving with direct code submission and progress tracking.",
      icon: <IconAdjustmentsBolt />,
    },
    {
      title: "AI-Powered Code Review",
      description:
        "Get instant feedback with AI-powered code review and recommendations.",
      icon: <IconHeart />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({ title, description, icon, index }) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l border-neutral-800",
        index < 4 && "lg:border-b border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-200">{icon}</div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
