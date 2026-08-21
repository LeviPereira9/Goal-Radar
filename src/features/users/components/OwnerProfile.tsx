import { useState } from "react";
import type { UserProfile } from "../types/user";
import { ProfileDetailsView } from "./ProfileDetailsView";
import { ProfileEditForm } from "./ProfileEditForm";

interface OwnerProfileProps {
    profile: UserProfile;
}

export function OwnerProfile({profile}: OwnerProfileProps){
    const [isEditing, setIsEditing] = useState(false);

    if(isEditing){
        return <ProfileEditForm profile={profile} onDone={() => setIsEditing(false)}/>
    }

    return <ProfileDetailsView profile={profile} onEdit={()=> setIsEditing(true)}/>
}