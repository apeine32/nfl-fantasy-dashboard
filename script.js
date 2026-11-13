// This is the JavaScript file. It controls the interactive logic and data of the website.

// We define a React component called 'App' which represents our dashboard
function App() {
    // localStorage feature: We check if the user previously saved a position (like 'RB' or 'WR').
    // If not, we default to 'WR'. 'useState' is a React feature that remembers this choice.
    const savedPosition = localStorage.getItem('fantasyPosition') || 'WR';
    const [position, setPosition] = React.useState(savedPosition);

    // This function handles what happens when a user clicks a position button
    const handlePositionChange = (newPosition) => {
        setPosition(newPosition); // Updates the screen with the new position
        // Saves the new choice to the browser's localStorage so it survives page refreshes
        localStorage.setItem('fantasyPosition', newPosition);
    };

    // This object holds our mock data for the players
    const data = {
        WR: [
            { name: 'Justin Jefferson', targets: 10.5, airYards: 145, proj: 22.4 },
            { name: 'Amon-Ra St. Brown', targets: 9.8, airYards: 85, proj: 19.1 }
        ],
        RB: [
            { name: 'Christian McCaffrey', snapShare: '85%', touches: 22, proj: 24.5 },
            { name: 'Breece Hall', snapShare: '72%', touches: 18, proj: 18.2 }
        ]
    };

    // We look up the specific players based on the currently selected position
    const players = data[position];

    // The 'return' statement outputs the HTML-like syntax (JSX) that will be drawn on the screen
    return (
        <div className="max-w-4xl mx-auto bg-slate-900 rounded-xl p-6 shadow-2xl border border-slate-800">
            <h1 className="text-3xl font-bold mb-6 text-center text-slate-100">Fantasy Start/Sit Analyzer</h1>
            
            <div className="flex justify-center gap-4 mb-8">
                {/* We create a button for each position ('RB' and 'WR') */}
                {['RB', 'WR'].map(pos => (
                    <button 
                        key={pos}
                        onClick={() => handlePositionChange(pos)} // When clicked, run our function
                        className={`px-6 py-2 rounded-full font-semibold ${position === pos ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                    >
                        {pos}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-8">
                {/* Player 1 Card */}
                <div className="bg-slate-800 p-6 rounded-lg text-center border-t-4 border-blue-500">
                    <h2 className="text-2xl font-bold mb-4">{players[0].name}</h2>
                    <p className="text-4xl font-black text-blue-400 mb-2">{players[0].proj}</p>
                    <p className="text-sm text-slate-400 uppercase tracking-wide">Projected Points</p>
                </div>
                {/* Player 2 Card */}
                <div className="bg-slate-800 p-6 rounded-lg text-center border-t-4 border-purple-500">
                    <h2 className="text-2xl font-bold mb-4">{players[1].name}</h2>
                    <p className="text-4xl font-black text-purple-400 mb-2">{players[1].proj}</p>
                    <p className="text-sm text-slate-400 uppercase tracking-wide">Projected Points</p>
                </div>
            </div>

            {/* Verdict Box */}
            <div className="mt-8 bg-blue-900/30 border border-blue-800 rounded-lg p-4 text-center">
                <p className="text-lg">
                    <span className="font-bold text-blue-400">Verdict:</span> Start <strong>{players[0].proj > players[1].proj ? players[0].name : players[1].name}</strong> based on higher projected volume and scoring potential.
                </p>
            </div>
        </div>
    );
}

// This final step finds the empty <div id="root"> in our HTML and injects our React app into it
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
