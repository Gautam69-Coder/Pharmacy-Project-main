import React, { useState } from "react";
import { FaSearch, FaPills, FaHeartbeat, FaRobot, FaShieldAlt, FaClock } from "react-icons/fa";
import axios from "axios";

function App() {
  const [usertext, setusertext] = useState("");
  const [boxopen, setboxopen] = useState("");
  const [loading, setLoading] = useState(false);

  const ai = async () => {
    try {
      setLoading(true);
      setboxopen("");

      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=AIzaSyBSxbmun-ct8PuwvG4DclobIoi29k9-on4",
        method: "post",
        data: {
          contents: [
            {
              parts: [
                {
                  text: `You are a medicine information assistant.
If the user asks about a medicine, even if the spelling is slightly incorrect or has small typos, try to identify the correct medicine and provide clear, concise information in around Four to Five lines.
If the input is not related to any medicine, reply strictly with: "I can only provide information about medicines."
User query: ${usertext}`,
                },
              ],
              role: "user",
            },
          ],
        },
      });

      const aireply = response.data.candidates[0].content.parts[0].text;
      setboxopen(aireply);
    } catch (err) {
      console.error(err);
      setboxopen("⚠️ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#001F3F] to-[#012B4C] overflow-hidden  flex flex-col items-center justify-start pt-10 px-4">
      {/* Header */}
      <div className="flex flex-col items-center mb-8 mt-10">
        <h1 className="text-4xl font-extrabold text-cyan-400 flex items-center gap-2 drop-shadow-lg">
          <FaPills className="text-yellow-400" /> Medicines{" "}
          <span className="text-white">AI</span>
        </h1>
        <p className="text-gray-300 text-sm mt-2 tracking-wide">
          Smart medicine information assistant powered by{" "}
          <span className="font-semibold text-cyan-400">TonicHub</span>
        </p>
      </div>

      {/* Hero Section */}
      <div className="max-w-2xl text-center mb-10">
        <h2 className="text-2xl font-bold text-white mb-3">
          Get Instant Medicine Info
        </h2>
        <p className="text-gray-300">
          Type the name of any medicine (even with typos) and get concise
          details on usage, dosage, side effects, and more.
        </p>
      </div>

      {/* Search Box */}
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md shadow-lg rounded-2xl p-6 border border-white/20">
        <div className="flex items-center gap-3">
          <FaSearch className="text-gray-300 text-xl" />
          <input
            value={usertext}
            onChange={(e) => setusertext(e.target.value)}
            onClick={() => setboxopen("")}
            className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 text-lg"
            placeholder="Search for Medicines..."
          />
          <button
            onClick={ai}
            disabled={loading}
            className="ml-2 px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg shadow hover:scale-105 hover:shadow-cyan-400/50 transition-all disabled:opacity-50"
          >
            {loading ? "Loading..." : "Search"}
          </button>
        </div>
      </div>

      {/* AI Response */}
      {loading && (
        <div className="mt-6 text-cyan-300 animate-pulse font-medium">
          Thinking<span className="animate-bounce">...</span>
        </div>
      )}
      {boxopen && !loading && (
        <div className="mt-8 w-full max-w-2xl bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg p-6 animate-fadeIn">
          <h2 className="text-lg font-bold text-yellow-300 flex items-center gap-2 mb-3">
            <FaHeartbeat className="text-red-400" /> Result
          </h2>
          <p className="text-gray-100 leading-relaxed whitespace-pre-line">
            {boxopen}
          </p>
        </div>
      )}

      {/* Features Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
        <FeatureBox
          icon={<FaRobot className="text-cyan-400" />}
          text="AI Powered"
          sub="Get accurate & fast answers"
        />
        <FeatureBox
          icon={<FaShieldAlt className="text-green-400" />}
          text="Reliable Info"
          sub="Verified medicine knowledge"
        />
        <FeatureBox
          icon={<FaClock className="text-yellow-400" />}
          text="24/7 Support"
          sub="Ask anytime, anywhere"
        />
      </div>

      {/* Footer */}
      <footer className="mt-14 py-5 text-gray-400 text-sm text-center">
        <p>
          © {new Date().getFullYear()} TonicHub | Built with ❤️ for Health
          Awareness
        </p>
      </footer>
    </div>
  );
}

// Feature Box Component
function FeatureBox({ icon, text, sub }) {
  return (
    <div className="flex flex-col items-center bg-white/10 backdrop-blur-md  border border-white/20 rounded-xl p-6 shadow-lg hover:scale-105 transition-all">
      <span className="text-3xl mb-3">{icon}</span>
      <div className="text-white font-semibold text-lg">{text}</div>
      <div className="text-gray-300 text-sm">{sub}</div>
    </div>
  );
}

export default App;
