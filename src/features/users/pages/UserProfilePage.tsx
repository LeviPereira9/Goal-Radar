import { useParams } from "react-router-dom"
import { useMe } from "@/features/auth/hooks/useMe"
import { useUserDetails, useUserShortProfile } from "../hooks/useUserProfile"
import { isSelf as checkIsSelf, isSelfOrElevated } from "@/shared/lib/rbac"
import { ProfileReadOnly } from "../components/ProfileDetailsView/ProfileReadOnly"
import { EditableProfile } from "../components/EditableProfile"

export function UserProfilePage() {
  const { username } = useParams<{username: string}>();
  const { data: currentUser } = useMe();
  
  const isSelf = !!currentUser && !!username && checkIsSelf(currentUser.username, username);
  const canViewFullDetails = !!currentUser && !!username  && isSelfOrElevated(currentUser.username, username, currentUser.role);
  
  const shortQuery = useUserShortProfile(canViewFullDetails ? "" : username!);
  const detailsQuery = useUserDetails(canViewFullDetails ? username! : "");
  
  if(canViewFullDetails){
    const { data: profile, isLoading, isError } = detailsQuery;

    if(isLoading) return <div>Carregando perfil...</div>;
  

    if(isError || !profile) return <div>Não foi possível carregar esse perfil.</div>
    

    return <EditableProfile profile={profile} isSelf={isSelf} />;
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
