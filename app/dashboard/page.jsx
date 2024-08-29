import Dashboard from "@/components/Dashboard";
import Main from "@/components/Main";

export const metadata = {
  title: "Broodl • Dashboard",
  description: "Track yoy daily mood, every day of the year",
};

function DashboardPage() {

  return (
    <Main>
      <Dashboard />
    </Main>);
}

export default DashboardPage;
