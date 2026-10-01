import DashboardSidebar from "./DashboardSidebar";
import DashboardContent from "./DashboardContent";
import DashboardHeader from "./DashboardHeader";

const DashboardLayout = () => {
  return (
    <div className="h-screen grid grid-rows-[auto_1fr]">
      {/* Header */}
      <DashboardHeader />

      {/* Main */}
      <div className="grid grid-cols-[250px_1fr] min-h-0 overflow-hidden">
        <DashboardSidebar />
        <div className="min-h-0 overflow-y-auto">
          <DashboardContent />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
