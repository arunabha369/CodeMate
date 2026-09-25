import { Github, Linkedin, Code2, Trophy, ChefHat, BookOpen, Brain } from "lucide-react";

// Coding/social profile fields on the user model, with display metadata.
export const PROFILE_LINKS = [
    { key: "githubProfileUrl", label: "GitHub", icon: Github, color: "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900", editable: false },
    { key: "linkedinProfileUrl", label: "LinkedIn", icon: Linkedin, color: "bg-[#0a66c2] text-white", editable: false },
    { key: "leetcodeProfileUrl", label: "LeetCode", icon: Code2, color: "bg-[#ffa116] text-white", placeholder: "https://leetcode.com/u/username" },
    { key: "codeforcesProfileUrl", label: "Codeforces", icon: Trophy, color: "bg-[#1f8dd6] text-white", placeholder: "https://codeforces.com/profile/username" },
    { key: "codechefProfileUrl", label: "CodeChef", icon: ChefHat, color: "bg-[#5b4638] text-white", placeholder: "https://www.codechef.com/users/username" },
    { key: "gfgProfileUrl", label: "GeeksforGeeks", icon: BookOpen, color: "bg-[#2f8d46] text-white", placeholder: "https://www.geeksforgeeks.org/user/username" },
    { key: "tufProfileUrl", label: "takeUforward", icon: Brain, color: "bg-[#e11d48] text-white", placeholder: "https://takeuforward.org/profile/username" },
];
