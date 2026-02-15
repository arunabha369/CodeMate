import { X, Github, Linkedin, ExternalLink, Code, Brain } from "lucide-react";
import { Button } from "./ui/button";

const UserDetailModal = ({ user, onClose }) => {
    if (!user) return null;

    const { firstName, lastName, photoUrl, age, gender, about, skills, githubProfileUrl, linkedinProfileUrl, leetcodeProfileUrl, codeforcesProfileUrl, codechefProfileUrl, gfgProfileUrl, tufProfileUrl } = user;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-stone-950 border border-stone-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in zoom-in-95 duration-200 hide-scrollbar">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Cover / Image Section */}
                <div className="h-64 sm:h-80 w-full relative">
                    <img
                        src={photoUrl}
                        alt={firstName}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent"></div>

                    <div className="absolute bottom-6 left-6 right-6">
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">{firstName} {lastName}</h2>
                        {age && gender && (
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white text-sm font-medium uppercase tracking-wider">
                                {age} • {gender}
                            </div>
                        )}
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6 sm:p-8 space-y-8">

                    {/* Bio */}
                    <div>
                        <h3 className="text-lg font-semibold text-stone-200 mb-3">About</h3>
                        <p className="text-stone-400 leading-relaxed text-lg">
                            {about || "No bio available."}
                        </p>
                    </div>

                    {/* Skills */}
                    {skills && skills.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold text-stone-200 mb-3">Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-4 py-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 font-medium"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Social / Coding Profiles */}
                    <div>
                        <h3 className="text-lg font-semibold text-stone-200 mb-4">Profiles & Socials</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {githubProfileUrl && (
                                <a href={githubProfileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl bg-stone-900/50 border border-stone-800 hover:bg-stone-900 hover:border-stone-700 transition-all group">
                                    <div className="p-2 rounded-lg bg-[#24292e] text-white">
                                        <Github className="w-5 h-5" />
                                    </div>
                                    <span className="font-medium text-stone-300 group-hover:text-white">GitHub</span>
                                    <ExternalLink className="w-4 h-4 ml-auto text-stone-600 group-hover:text-stone-400" />
                                </a>
                            )}

                            {linkedinProfileUrl && (
                                <a href={linkedinProfileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl bg-stone-900/50 border border-stone-800 hover:bg-stone-900 hover:border-stone-700 transition-all group">
                                    <div className="p-2 rounded-lg bg-[#0077b5] text-white">
                                        <Linkedin className="w-5 h-5" />
                                    </div>
                                    <span className="font-medium text-stone-300 group-hover:text-white">LinkedIn</span>
                                    <ExternalLink className="w-4 h-4 ml-auto text-stone-600 group-hover:text-stone-400" />
                                </a>
                            )}

                            {leetcodeProfileUrl && (
                                <a href={leetcodeProfileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl bg-stone-900/50 border border-stone-800 hover:bg-stone-900 hover:border-stone-700 transition-all group">
                                    <div className="p-2 rounded-lg bg-[#ffa116] text-white">
                                        <Code className="w-5 h-5" />
                                    </div>
                                    <span className="font-medium text-stone-300 group-hover:text-white">LeetCode</span>
                                    <ExternalLink className="w-4 h-4 ml-auto text-stone-600 group-hover:text-stone-400" />
                                </a>
                            )}

                            {codeforcesProfileUrl && (
                                <a href={codeforcesProfileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl bg-stone-900/50 border border-stone-800 hover:bg-stone-900 hover:border-stone-700 transition-all group">
                                    <div className="p-2 rounded-lg bg-[#1f8dd6] text-white">
                                        <Code className="w-5 h-5" />
                                    </div>
                                    <span className="font-medium text-stone-300 group-hover:text-white">CodeForces</span>
                                    <ExternalLink className="w-4 h-4 ml-auto text-stone-600 group-hover:text-stone-400" />
                                </a>
                            )}

                            {codechefProfileUrl && (
                                <a href={codechefProfileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl bg-stone-900/50 border border-stone-800 hover:bg-stone-900 hover:border-stone-700 transition-all group">
                                    <div className="p-2 rounded-lg bg-[#5b4638] text-white">
                                        <Code className="w-5 h-5" />
                                    </div>
                                    <span className="font-medium text-stone-300 group-hover:text-white">CodeChef</span>
                                    <ExternalLink className="w-4 h-4 ml-auto text-stone-600 group-hover:text-stone-400" />
                                </a>
                            )}

                            {gfgProfileUrl && (
                                <a href={gfgProfileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl bg-stone-900/50 border border-stone-800 hover:bg-stone-900 hover:border-stone-700 transition-all group">
                                    <div className="p-2 rounded-lg bg-[#2f8d46] text-white">
                                        <Code className="w-5 h-5" />
                                    </div>
                                    <span className="font-medium text-stone-300 group-hover:text-white">GeeksForGeeks</span>
                                    <ExternalLink className="w-4 h-4 ml-auto text-stone-600 group-hover:text-stone-400" />
                                </a>
                            )}

                            {tufProfileUrl && (
                                <a href={tufProfileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl bg-stone-900/50 border border-stone-800 hover:bg-stone-900 hover:border-stone-700 transition-all group">
                                    <div className="p-2 rounded-lg bg-[#e11d48] text-white">
                                        <Brain className="w-5 h-5" />
                                    </div>
                                    <span className="font-medium text-stone-300 group-hover:text-white">takeUforward</span>
                                    <ExternalLink className="w-4 h-4 ml-auto text-stone-600 group-hover:text-stone-400" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetailModal;
