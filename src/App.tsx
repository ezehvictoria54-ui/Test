import { Route, Routes } from "react-router-dom";
import PublicLayout from "./components/PublicLayout";
import RequireAgent from "./agent/RequireAgent";
import AgentLayout from "./agent/AgentLayout";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import PropertyPage from "./pages/PropertyPage";
import LandingProperty from "./pages/LandingProperty";
import LandingGuide from "./pages/LandingGuide";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import AgentLogin from "./agent/AgentLogin";
import Dashboard from "./agent/Dashboard";
import AgentProperties from "./agent/AgentProperties";
import PropertyNew from "./agent/PropertyNew";
import Leads from "./agent/Leads";
import Viewings from "./agent/Viewings";

export default function App() {
  return (
    <Routes>
      {/* Public site */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/property/:id" element={<PropertyPage />} />
        <Route path="/about" element={<About />} />
      </Route>

      {/* Ad landing pages — intentionally chrome-free (no shared nav) */}
      <Route path="/lp/guide" element={<LandingGuide />} />
      <Route path="/lp/:id" element={<LandingProperty />} />

      {/* Agent — cosmetic login gate */}
      <Route path="/agent" element={<AgentLogin />} />
      <Route
        element={
          <RequireAgent>
            <AgentLayout />
          </RequireAgent>
        }
      >
        <Route path="/agent/dashboard" element={<Dashboard />} />
        <Route path="/agent/properties" element={<AgentProperties />} />
        <Route path="/agent/properties/new" element={<PropertyNew />} />
        <Route path="/agent/leads" element={<Leads />} />
        <Route path="/agent/viewings" element={<Viewings />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
