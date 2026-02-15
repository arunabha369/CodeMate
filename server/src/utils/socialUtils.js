const axios = require("axios");

const getGitHubRepos = async (accessToken) => {
  try {
    const response = await axios.get("https://api.github.com/user/repos?sort=updated&per_page=10", {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    return [];
  }
};

const analyzeGitHubSkills = async (accessToken) => {
    try {
        const repos = await getGitHubRepos(accessToken);
        const languageMap = {};

        // Aggregate languages
        repos.forEach(repo => {
            if (repo.language) {
                languageMap[repo.language] = (languageMap[repo.language] || 0) + 1;
            }
        });

        // Convert to array and sort by frequency
        const sortedLanguages = Object.entries(languageMap)
            .sort(([, a], [, b]) => b - a)
            .map(([language]) => language);
        
        return sortedLanguages.slice(0, 10); // Return top 10 languages
    } catch (error) {
        console.error("Error analyzing GitHub skills:", error);
        return [];
    }
}

module.exports = { getGitHubRepos, analyzeGitHubSkills };
