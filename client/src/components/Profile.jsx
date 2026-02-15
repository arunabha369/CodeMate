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
            <div className="bg-base-300 w-full max-w-2xl p-8 rounded-lg shadow-xl border border-white/10">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-white">Profile</h1>
                    {!isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="btn btn-primary btn-sm"
                        >
                            Edit Profile
                        </button>
                    )}
                </div>

                {/* Profile Header */}
                <div className="flex flex-col md:flex-row gap-6 mb-8">
                    <div className="shrink-0">
                        <img
                            src={user.photoUrl}
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover border-4 border-primary"
                        />
                    </div>
                    <div className="flex-grow">
                        {isEditing ? (
                            <div className="space-y-3">
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="text" name="firstName" value={formData.firstName} onChange={handleInputChange}
                                        placeholder="First Name" className="input input-bordered w-full"
                                    />
                                    <input
                                        type="text" name="lastName" value={formData.lastName} onChange={handleInputChange}
                                        placeholder="Last Name" className="input input-bordered w-full"
                                    />
                                </div>
                                <input
                                    type="text" name="photoUrl" value={formData.photoUrl} onChange={handleInputChange}
                                    placeholder="Photo URL" className="input input-bordered w-full"
                                />
                            </div>
                        ) : (
                            <div>
                                <h2 className="text-2xl font-bold text-white mt-2">
                                    {user.firstName} {user.lastName}
                                    {user.isLinkedInVerified && (
                                        <span className="ml-2 text-blue-400 tooltip" data-tip="Verified Professional">
                                            ✓
                                        </span>
                                    )}
                                </h2>
                                <p className="text-gray-400 mt-1">{user.email}</p>
                                {user.githubUsername && (
                                    <a href={user.githubProfileUrl} target="_blank" rel="noreferrer" className="text-sm link link-primary block mt-1">
                                        @{user.githubUsername} (GitHub)
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Social Integrations */}
                <div className="bg-base-200 p-4 rounded-lg mb-6">
                    <h3 className="text-lg font-semibold text-white mb-3">Integrations & Verification</h3>
                    <div className="flex flex-wrap gap-4">
                        {!user.githubId ? (
                            <button onClick={handleLinkGitHub} className="btn btn-outline gap-2 normal-case">
                                <i className="fab fa-github text-xl"></i> Link GitHub for Skill Analysis
                            </button>
                        ) : (
                            <div className="badge badge-success gap-2 p-3">
                                <i className="fab fa-github"></i> GitHub Linked
                            </div>
                        )}

                        {!user.isLinkedInVerified ? (
                            <button onClick={handleLinkLinkedIn} className="btn btn-outline btn-info gap-2 normal-case">
                                <i className="fab fa-linkedin text-xl"></i> Verify with LinkedIn
                            </button>
                        ) : (
                            <div className="badge badge-info gap-2 p-3 text-white">
                                <i className="fab fa-linkedin"></i> Verified Professional
                            </div>
                        )}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        Linking GitHub will analyze your public repositories to add skills to your profile.
                        Linking LinkedIn verifies your professional identity.
                    </p>
                </div>

                {/* About & Details */}
                <div className="space-y-4">
                    <div className="form-control">
                        <label className="label"><span className="label-text">About</span></label>
                        {isEditing ? (
                            <textarea
                                name="about" value={formData.about} onChange={handleInputChange}
                                className="textarea textarea-bordered h-24" placeholder="Tell us about yourself"
                            ></textarea>
                        ) : (
                            <p className="text-gray-300 bg-base-100 p-3 rounded-md min-h-[3rem]">{user.about || "No bio added yet."}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label"><span className="label-text">Age</span></label>
                            {isEditing ? (
                                <input type="number" name="age" value={formData.age} onChange={handleInputChange} className="input input-bordered" />
                            ) : (
                                <p className="text-gray-300 px-1">{user.age || "N/A"}</p>
                            )}
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Gender</span></label>
                            {isEditing ? (
                                <select name="gender" value={formData.gender} onChange={handleInputChange} className="select select-bordered">
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            ) : (
                                <p className="text-gray-300 px-1 capitalize">{user.gender || "N/A"}</p>
                            )}
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label"><span className="label-text">Skills</span></label>
                        {isEditing ? (
                            <input
                                type="text" name="skills" value={formData.skills} onChange={handleInputChange}
                                placeholder="Comma separated skills (e.g. React, Node.js)" className="input input-bordered"
                            />
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {user.skills && user.skills.length > 0 ? (
                                    user.skills.map((skill, index) => (
                                        <div key={index} className="badge badge-secondary p-3">{skill}</div>
                                    ))
                                ) : (
                                    <span className="text-gray-500 italic">No skills added. Link GitHub to auto-fill!</span>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Actions */}
                {isEditing && (
                    <div className="flex gap-4 mt-8 justify-end">
                        <button onClick={() => setIsEditing(false)} className="btn btn-ghost">Cancel</button>
                        <button onClick={handleSaveProfile} className="btn btn-primary">Save Changes</button>
                    </div>
                )}

                {error && <div className="toast toast-end"><div className="alert alert-error"><span>{error}</span></div></div>}
                {successMessage && <div className="toast toast-end"><div className="alert alert-success"><span>{successMessage}</span></div></div>}
            </div>
        </div>
    );
};

export default Profile;
