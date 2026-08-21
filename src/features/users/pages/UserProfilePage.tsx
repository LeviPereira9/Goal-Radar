import { useParams } from "react-router-dom"
import { useMe } from "@/features/auth/hooks/useMe"
import { useUserDetails, useUserShortProfile } from "../hooks/useUserProfile"
import { isSelf } from "@/shared/lib/rbac"
import { ProfileReadOnly } from "../components/ProfileReadOnly"
import { OwnerProfile } from "../components/OwnerProfile"

export function UserProfilePage() {
  const { username } = useParams<{username: string}>();
  const { data: currentUser } = useMe();
  

  const isOwner = !!currentUser && !!username  && isSelf(currentUser.username, username);
  
  const shortQuery = useUserShortProfile(isOwner ? "" : username!);
  const detailsQuery = useUserDetails(isOwner ? username! : "");
  
  if(isOwner){
    const { data: profile, isLoading, isError } = detailsQuery;

    if(isLoading) return <div>Carregando perfil...</div>;
  

    if(isError || !profile) return <div>Não foi possível carregar esse perfil.</div>
    

    return <OwnerProfile profile={profile}/>;
  }
  
  const { data: profile, isLoading, isError } = shortQuery;

  if(isLoading){
    return <div>Carregando perfil...</div>;
  }

  if(isError || !profile){
    return <div>Não foi possível carregar esse perfil.</div>
  }
  
  return <ProfileReadOnly profile={profile}/>;
}
