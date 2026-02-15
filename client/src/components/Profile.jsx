import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../store/userSlice";

const Profile = () => {
    const user = useSelector((store) => store.user);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                photoUrl: user.photoUrl || "",
                age: user.age || "",
                gender: user.gender || "",
                about: user.about || "",
                skills: user.skills ? user.skills.join(", ") : "",
                leetcodeProfileUrl: user.leetcodeProfileUrl || "",
                codeforcesProfileUrl: user.codeforcesProfileUrl || "",
                codechefProfileUrl: user.codechefProfileUrl || "",
                gfgProfileUrl: user.gfgProfileUrl || "",
                tufProfileUrl: user.tufProfileUrl || "",
            });
        }
    }, [user]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSaveProfile = async () => {
        try {
            setError("");
            setSuccessMessage("");

            // Format skills array
            const formattedData = { ...formData };
            if (typeof formattedData.skills === "string") {
                formattedData.skills = formattedData.skills.split(",").map(skill => skill.trim()).filter(skill => skill !== "");
            }

            const res = await axios.patch(
                BASE_URL + "/profile/edit",
                formattedData,
                { withCredentials: true }
            );

            dispatch(addUser(res.data.data));
            setIsEditing(false);
            setSuccessMessage("Profile updated successfully!");
        } catch (err) {
            setError(err.response?.data || "Something went wrong");
        }
    };

    const handleLinkGitHub = () => {
        window.location.href = BASE_URL + "/auth/github";
    };

    const handleLinkLinkedIn = () => {
        window.location.href = BASE_URL + "/auth/linkedin";
    };

    if (!user) return <div className="text-white text-center mt-10">Loading Profile...</div>;

    return (
        <div className="flex justify-center my-10 px-4">
            <div className="bg-black w-full max-w-lg p-8 rounded-2xl border border-stone-800 shadow-2xl">
                <div className="flex justify-between items-start mb-6">
                    <h1 className="text-3xl font-bold text-white tracking-tight">Profile</h1>
                    {!isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-4 py-2 text-sm font-semibold text-black bg-white rounded-lg hover:bg-gray-200 transition-colors shadow-lg shadow-white/10"
                        >
                            Edit Profile
                        </button>
                    )}
                </div>

                <div className="flex flex-col items-center mb-8">
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                        <img
                            src={user.photoUrl}
                            alt="Profile"
                            className="relative w-32 h-32 rounded-full object-cover border-4 border-black"
                        />
                    </div>

                    {isEditing ? (
                        <div className="mt-8 w-full space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-stone-500 ml-1 mb-1 block">First Name</label>
                                    <input
                                        type="text" name="firstName" value={formData.firstName} onChange={handleInputChange}
                                        className="input input-sm w-full bg-stone-900/50 border-stone-800 focus:border-pink-500 focus:outline-none text-white rounded-lg transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-stone-500 ml-1 mb-1 block">Last Name</label>
                                    <input
                                        type="text" name="lastName" value={formData.lastName} onChange={handleInputChange}
                                        className="input input-sm w-full bg-stone-900/50 border-stone-800 focus:border-pink-500 focus:outline-none text-white rounded-lg transition-all"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs text-stone-500 ml-1 mb-1 block">Profile Photo URL</label>
                                <input
                                    type="text" name="photoUrl" value={formData.photoUrl} onChange={handleInputChange}
                                    className="input input-sm w-full bg-stone-900/50 border-stone-800 focus:border-pink-500 focus:outline-none text-white rounded-lg transition-all"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="text-center mt-4">
                            <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
                                {user.firstName} {user.lastName}
                                {user.isLinkedInVerified && (
                                    <span className="text-blue-500 text-lg" title="Verified Professional">
                                        <i className="fas fa-check-circle"></i>
                                    </span>
                                )}
                            </h2>
                            <p className="text-gray-400 text-sm mt-1">{user.email}</p>
                            {user.githubUsername && (
                                <a href={user.githubProfileUrl} target="_blank" rel="noreferrer" className="text-xs text-stone-500 hover:text-white mt-1 block transition-colors">
                                    @{user.githubUsername}
                                </a>
                            )}
                        </div>
                    )}
                </div>

                <div className="space-y-8">
                    {/* Integrations */}
                    <div>
                        <h3 className="text-sm font-bold text-stone-300 uppercase tracking-wider mb-4">Integrations</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {!user.githubId ? (
                                <button onClick={handleLinkGitHub} className="w-full py-3 px-4 rounded-xl bg-stone-900 hover:bg-black border border-stone-800 hover:border-stone-600 transition-all text-white flex items-center justify-center gap-3 font-medium group">
                                    <i className="fab fa-github text-xl group-hover:scale-110 transition-transform"></i>
                                    Link GitHub
                                </button>
                            ) : (
                                <div className="w-full py-3 px-4 rounded-xl bg-green-900/20 border border-green-500/30 text-green-400 flex items-center justify-center gap-3 font-medium cursor-default">
                                    <i className="fab fa-github text-xl"></i> GitHub Linked
                                </div>
                            )}

                            {!user.isLinkedInVerified ? (
                                <button onClick={handleLinkLinkedIn} className="w-full py-3 px-4 rounded-xl bg-[#0077b5] hover:bg-[#006097] border border-transparent transition-all text-white flex items-center justify-center gap-3 font-medium group shadow-lg shadow-blue-900/20">
                                    <i className="fab fa-linkedin text-xl group-hover:scale-110 transition-transform"></i>
                                    Verify with LinkedIn
                                </button>
                            ) : (
                                <div className="w-full py-3 px-4 rounded-xl bg-blue-900/20 border border-blue-500/30 text-blue-400 flex items-center justify-center gap-3 font-medium cursor-default">
                                    <i className="fab fa-linkedin text-xl"></i> Verified Professional
                                </div>
                            )}
                        </div>
                        <p className="text-xs text-stone-500 mt-4 leading-relaxed max-w-md mx-auto text-center">
                            Connect <span className="text-stone-300 font-medium">GitHub</span> to automatically analyze your skills from your repositories.
                            Verify with <span className="text-stone-300 font-medium">LinkedIn</span> to get a <span className="text-blue-400">Verified Badge</span> and <span className="text-stone-300">3x more visibility</span>.
                        </p>
                    </div>

                    {/* About */}
                    <div>
                        <h3 className="text-sm font-bold text-stone-300 uppercase tracking-wider mb-3">About</h3>
                        {isEditing ? (
                            <textarea
                                name="about" value={formData.about} onChange={handleInputChange}
                                className="textarea w-full bg-stone-900/50 border-stone-800 focus:border-pink-500 focus:outline-none text-white rounded-lg transition-all min-h-[100px]" placeholder="Tell us about yourself..."
                            ></textarea>
                        ) : (
                            <p className="text-stone-400 text-sm leading-relaxed">
                                {user.about || "No bio added yet."}
                            </p>
                        )}
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                        <div>
                            <h3 className="text-sm font-bold text-stone-300 uppercase tracking-wider mb-2">Age</h3>
                            {isEditing ? (
                                <input type="number" name="age" value={formData.age} onChange={handleInputChange} className="input input-sm w-full bg-stone-900/50 border-stone-800 focus:border-pink-500 focus:outline-none text-white rounded-lg transition-all" />
                            ) : (
                                <p className="text-stone-400 text-sm">{user.age || "N/A"}</p>
                            )}
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-stone-300 uppercase tracking-wider mb-2">Gender</h3>
                            {isEditing ? (
                                <select name="gender" value={formData.gender} onChange={handleInputChange} className="select select-sm w-full bg-stone-900/50 border-stone-800 focus:border-pink-500 focus:outline-none text-white rounded-lg transition-all">
                                    <option value="">Select</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            ) : (
                                <p className="text-stone-400 text-sm capitalize">{user.gender || "N/A"}</p>
                            )}
                        </div>
                    </div>

                    {/* Skills */}
                    <div>
                        <h3 className="text-sm font-bold text-stone-300 uppercase tracking-wider mb-3">Skills</h3>
                        {isEditing ? (
                            <input
                                type="text" name="skills" value={formData.skills} onChange={handleInputChange}
                                placeholder="Comma separated skills (e.g. React, Node.js)" className="input input-sm w-full bg-stone-900/50 border-stone-800 focus:border-pink-500 focus:outline-none text-white rounded-lg transition-all"
                            />
                        ) : (
                            user.skills && user.skills.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {user.skills.map((skill, index) => (
                                        <span key={index} className="px-3 py-1 bg-stone-900 text-stone-400 rounded-full text-xs border border-stone-800 hover:border-stone-600 transition-colors cursor-default">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-stone-500 text-xs italic">No skills added. Link GitHub to auto-fill!</p>
                            )
                        )}
                    </div>

                    {/* Coding Profiles */}
                    <div>
                        <h3 className="text-sm font-bold text-stone-300 uppercase tracking-wider mb-3">Coding Profiles</h3>
                        {isEditing ? (
                            <div className="space-y-3">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-stone-500 text-xs">LeetCode</span>
                                    </div>
                                    <input
                                        type="text" name="leetcodeProfileUrl" value={formData.leetcodeProfileUrl} onChange={handleInputChange}
                                        placeholder="https://leetcode.com/username"
                                        className="input input-sm w-full pl-20 bg-stone-900/50 border-stone-800 focus:border-pink-500 focus:outline-none text-white rounded-lg transition-all"
                                    />
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-stone-500 text-xs">CodeForces</span>
                                    </div>
                                    <input
                                        type="text" name="codeforcesProfileUrl" value={formData.codeforcesProfileUrl} onChange={handleInputChange}
                                        placeholder="https://codeforces.com/profile/username"
                                        className="input input-sm w-full pl-24 bg-stone-900/50 border-stone-800 focus:border-pink-500 focus:outline-none text-white rounded-lg transition-all"
                                    />
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-stone-500 text-xs">CodeChef</span>
                                    </div>
                                    <input
                                        type="text" name="codechefProfileUrl" value={formData.codechefProfileUrl} onChange={handleInputChange}
                                        placeholder="https://www.codechef.com/users/username"
                                        className="input input-sm w-full pl-20 bg-stone-900/50 border-stone-800 focus:border-pink-500 focus:outline-none text-white rounded-lg transition-all"
                                    />
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-stone-500 text-xs">GFG</span>
                                    </div>
                                    <input
                                        type="text" name="gfgProfileUrl" value={formData.gfgProfileUrl} onChange={handleInputChange}
                                        placeholder="https://auth.geeksforgeeks.org/user/username"
                                        className="input input-sm w-full pl-12 bg-stone-900/50 border-stone-800 focus:border-pink-500 focus:outline-none text-white rounded-lg transition-all"
                                    />
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-stone-500 text-xs">TUF</span>
                                    </div>
                                    <input
                                        type="text" name="tufProfileUrl" value={formData.tufProfileUrl} onChange={handleInputChange}
                                        placeholder="https://takeuforward.org/profile/username"
                                        className="input input-sm w-full pl-12 bg-stone-900/50 border-stone-800 focus:border-pink-500 focus:outline-none text-white rounded-lg transition-all"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2">
                                {user.leetcodeProfileUrl && (
                                    <a href={user.leetcodeProfileUrl} target="_blank" rel="noreferrer" className="text-sm text-stone-400 hover:text-[#ffa116] transition-colors flex items-center gap-2">
                                        <i className="fas fa-code"></i> LeetCode Profile
                                    </a>
                                )}
                                {user.codeforcesProfileUrl && (
                                    <a href={user.codeforcesProfileUrl} target="_blank" rel="noreferrer" className="text-sm text-stone-400 hover:text-[#1f8dd6] transition-colors flex items-center gap-2">
                                        <i className="fas fa-code"></i> CodeForces Profile
                                    </a>
                                )}
                                {user.codechefProfileUrl && (
                                    <a href={user.codechefProfileUrl} target="_blank" rel="noreferrer" className="text-sm text-stone-400 hover:text-[#5b4638] transition-colors flex items-center gap-2">
                                        <i className="fas fa-code"></i> CodeChef Profile
                                    </a>
                                )}
                                {user.gfgProfileUrl && (
                                    <a href={user.gfgProfileUrl} target="_blank" rel="noreferrer" className="text-sm text-stone-400 hover:text-[#2f8d46] transition-colors flex items-center gap-2">
                                        <i className="fas fa-code"></i> GeeksForGeeks Profile
                                    </a>
                                )}
                                {user.tufProfileUrl && (
                                    <a href={user.tufProfileUrl} target="_blank" rel="noreferrer" className="text-sm text-stone-400 hover:text-[#e11d48] transition-colors flex items-center gap-2">
                                        <i className="fas fa-brain"></i> takeUforward Profile
                                    </a>
                                )}
                                {!user.leetcodeProfileUrl && !user.codeforcesProfileUrl && !user.codechefProfileUrl && !user.gfgProfileUrl && !user.tufProfileUrl && (
                                    <p className="text-stone-500 text-xs italic">No coding profiles added yet.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Edit Actions */}
                {isEditing && (
                    <div className="flex gap-4 mt-8 justify-end border-t border-stone-800 pt-6">
                        <button onClick={() => setIsEditing(false)} className="px-6 py-2 rounded-lg text-stone-400 hover:text-white text-sm transition-colors hover:bg-stone-900">Cancel</button>
                        <button onClick={handleSaveProfile} className="px-6 py-2 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-pink-500/20">Save Changes</button>
                    </div>
                )}

                {error && <div className="text-red-500 text-xs mt-4 text-center">{error}</div>}
                {successMessage && <div className="text-green-500 text-xs mt-4 text-center">{successMessage}</div>}
            </div>
        </div>
    );
};

export default Profile;
