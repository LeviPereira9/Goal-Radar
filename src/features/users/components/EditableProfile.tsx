import { useState } from "react";
import type { UserProfile } from "../types/user";
import { ProfileDetailsView } from "./ProfileDetailsView";
import { ProfileEditForm } from "./ProfileEditForm";

interface EditableProfileProps {
    profile: UserProfile;
    isSelf: boolean;
}

export function EditableProfile({profile, isSelf}: EditableProfileProps){
    const [isEditing, setIsEditing] = useState(false);

    if(isEditing){
        return <ProfileEditForm
            profile={profile}
            onDone={() => setIsEditing(false)}
            isSelf={isSelf}
            />
    }

    return <ProfileDetailsView
        profile={profile}
        onEdit={()=> setIsEditing(true)}
        isSelf={isSelf}
        />
}