import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";

function App() {
  const [session, setSession] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get current session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/auth");
      setSession(session);
    });

    // Listen for session changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/auth");
      }
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    navigate("/auth");
  };

  // While session is being checked
  if (session === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="flex justify-between items-center px-6 py-4 bg-blue-100 border-b">
        <h1 className="text-xl font-bold text-blue-700">🛍️ Suraj Store</h1>
        {session && (
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">{session.user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      <HomePage />
    </div>
  );
}

export default App;
