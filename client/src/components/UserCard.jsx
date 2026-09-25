import { useState } from "react";
import { BadgeCheck, UserRound } from "lucide-react";
import { cn, fullName, capitalize } from "../lib/utils";

const SkillChips = ({ skills = [], max = 4, className }) => {
    if (!skills.length) return null;
    const shown = skills.slice(0, max);
    const rest = skills.length - shown.length;
    return (
        <div className={cn("flex flex-wrap gap-1.5", className)}>
            {shown.map((s) => (
                <span key={s} className="rounded-md bg-white/15 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-md ring-1 ring-white/20">
                    {s}
                </span>
            ))}
            {rest > 0 && (
                <span className="rounded-md bg-white/10 px-2 py-0.5 text-xs font-medium text-white/80 backdrop-blur-md">+{rest}</span>
            )}
        </div>
    );
};

const UserCard = ({ user, className, children }) => {
    const { photoUrl, age, gender, about, skills, isLinkedInVerified } = user;
    const [imgFailed, setImgFailed] = useState(false);
    const meta = [age, capitalize(gender)].filter(Boolean).join(" · ");

    return (
        <div className={cn("relative h-full w-full select-none overflow-hidden rounded-3xl border bg-muted shadow-xl", className)}>
            {photoUrl && !imgFailed ? (
                <img
                    src={photoUrl}
                    alt={fullName(user)}
                    draggable={false}
                    onError={() => setImgFailed(true)}
                    className="absolute inset-0 h-full w-full object-cover"
                />
            ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-rose-500 to-violet-600">
                    <UserRound className="h-24 w-24 text-white/40" />
                </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 space-y-3 p-5 text-white">
                <div>
                    <h2 className="flex items-center gap-2 text-2xl font-bold leading-tight drop-shadow">
                        <span className="truncate">{fullName(user)}</span>
                        {isLinkedInVerified && <BadgeCheck className="h-5 w-5 shrink-0 text-sky-400" aria-label="Verified" />}
                    </h2>
                    {meta && <p className="mt-0.5 text-sm text-white/75">{meta}</p>}
                </div>
                {about && <p className="line-clamp-2 text-sm leading-relaxed text-white/85">{about}</p>}
                <SkillChips skills={skills} />
            </div>
            {children}
        </div>
    );
};

export default UserCard;
