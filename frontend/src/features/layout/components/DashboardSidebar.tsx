import SidebarButton from './SidebarButton';
import type { Section } from '../config/dashboard.config';
import { useLocation, useNavigate } from 'react-router-dom';
import { dashboardSections } from '../config/dashboard.config';

export default function DashboardSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const activePath = location.pathname;
  const sections = dashboardSections;

  return (
    <>
      <aside className="p-4 flex flex-col gap-2 bg-primary text-white">
        {sections.map((section: Section) => (
          <SidebarButton
            key={section.id}
            active={activePath === section.path}
            icon={section.icon}
            onClick={() => navigate(section.path)}
          >
            {section.label}
          </SidebarButton>
        ))}
      </aside>
    </>
  );
}
