import CreatorAnalytics from "../components/creatorDashboard/CreatorAnalytics.jsx";
import CreatorHome from "../components/creatorDashboard/CreatorHome.jsx";
import CreatorSocialMedia from "../components/creatorDashboard/CreatorSocialMedia.jsx";
import CreatorVideos from "../components/creatorDashboard/CreatorVideos.jsx";
import UserHistory from "../components/userDashboard/UserHistory.jsx";
import UserHome from "../components/userDashboard/UserHome.jsx";
import UserMyAssessment from "../components/userDashboard/UserMyAssessment.jsx";
import UserMyLikes from "../components/userDashboard/UserMyLikes.jsx";
import UserPlaylist from "../components/userDashboard/UserPlaylist.jsx";
import PendingStatePopup from "../models/PendingStatePopup.jsx";
import AdminHome from "./adminDashboard/AdminHome.jsx";
import CollaboratorsData from "./adminDashboard/CollaboratorsData.jsx";
import UnifiedRecord from "./adminDashboard/UnifiedRecord.jsx";
import UsersData from "./adminDashboard/UsersData.jsx";
import SchoolDirectory from "./adminDashboard/SchoolDirectory.jsx";
import Profile from "./Profile.jsx";

const renderCurrentPage = (currentPage, userData) => {
  if (userData.activeDashboard === "admin") {
    switch (currentPage) {
      case "Dashboard":
        return <AdminHome />;
      case "Users":
        return <UsersData />;
      case "Creators":
        return <CollaboratorsData />;
      case "Records":
        return <UnifiedRecord />;
      case "School Directory":
        return <SchoolDirectory />;
      case "Profile":
        return <Profile />;
      default:
        return null;
    }
  }

  if (userData.activeDashboard === "creator") {
    if (userData.status === "pending") {
      return <PendingStatePopup />;
    }

    switch (currentPage) {
      case "Dashboard":
        return <CreatorHome />;
      case "My Content":
        return <CreatorVideos />;
      case "Analytics":
        return <CreatorAnalytics />;
      case "Social Media":
        return <CreatorSocialMedia />;
      case "Profile":
        return <Profile />;
      default:
        return null;
    }
  }

  if (userData.activeDashboard === "user") {
    switch (currentPage) {
      case "Dashboard":
        return <UserHome />;
      case "History":
        return <UserHistory />;
      case "My Likes":
        return <UserMyLikes />;
      case "My Playlist":
        return <UserPlaylist />;
      case "My Assessments":
        return <UserMyAssessment />;
      case "Profile":
        return <Profile />;
      default:
        return null;
    }
  }
};

export default renderCurrentPage;
