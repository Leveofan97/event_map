import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import MapView from "./pages/MapView";
import EventDetail from "./pages/EventDetail";
import CreateEvent from "./pages/CreateEvent";
import Profile from "./pages/Profile";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import { EventsProvider } from "./contexts/EventsContext";
import { MapProvider } from "./contexts/MapContext";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <EventsProvider>
                <MapProvider>
                    <TooltipProvider>
                        <Toaster />
                        <Sonner />
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<Layout />}>
                                    <Route index element={<MapView />} />
                                    <Route path="events/:id" element={<EventDetail />} />
                                    <Route path="create" element={<CreateEvent />} />
                                    <Route path="profile" element={<Profile />} />
                                    <Route path="about" element={<About />} />
                                </Route>
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </BrowserRouter>
                    </TooltipProvider>
                </MapProvider>
            </EventsProvider>
        </AuthProvider>
    </QueryClientProvider>
);

export default App;