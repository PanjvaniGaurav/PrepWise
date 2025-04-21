import { interviewCovers, mappings } from "@/constants";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const techIconBaseURL = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

const normalizeTechName = (tech: string) => {
  const key = tech.toLowerCase().replace(/\.js$/, "").replace(/\s+/g, "");
  return mappings[key as keyof typeof mappings];
};

const checkIconExists = async (url: string) => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok; // Returns true if the icon exists
  } catch {
    return false;
  }
};

export const getTechLogos = async (techArray: string[]) => {
  const logoURLs = techArray.map((tech) => {
    const normalized = normalizeTechName(tech);
    return {
      tech,
      url: `${techIconBaseURL}/${normalized}/${normalized}-original.svg`,
    };
  });

  const results = await Promise.all(
    logoURLs.map(async ({ tech, url }) => ({
      tech,
      url: (await checkIconExists(url)) ? url : "/tech.svg",
    }))
  );

  return results;
};

export const getCompanyLogo = async (companyName: string): Promise<string> => {
  if (!companyName) return getRandomInterviewCover();

  // Format company name for API usage (remove spaces, convert to lowercase)
  const formattedName = companyName.toLowerCase().trim();

  // Check if we have the logo in our local collection first
  const localLogo = interviewCovers.find((cover) =>
    cover.toLowerCase().includes(formattedName)
  );

  if (localLogo) {
    return `/covers${localLogo}`;
  }

  // Try to fetch from Clearbit Logo API
  const clearbitUrl = `https://logo.clearbit.com/${formattedName.replace(
    /\s+/g,
    ""
  )}.com`;

  try {
    // Check if the logo exists
    const exists = await checkIconExists(clearbitUrl);
    if (exists) {
      return clearbitUrl;
    }

    // Try with domain variant
    const altUrl = `https://logo.clearbit.com/${formattedName.replace(
      /\s+/g,
      "."
    )}.com`;
    const altExists = await checkIconExists(altUrl);
    if (altExists) {
      return altUrl;
    }

    // Fallback to random cover if no logo found
    return getRandomInterviewCover();
  } catch (error) {
    console.error("Error fetching company logo:", error);
    return getRandomInterviewCover();
  }
};

export const getRandomInterviewCover = () => {
  const randomIndex = Math.floor(Math.random() * interviewCovers.length);
  return `/covers${interviewCovers[randomIndex]}`;
};
