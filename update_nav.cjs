const fs = require('fs');
let code = fs.readFileSync('src/components/Header.tsx', 'utf8');

const bottomNavStart = code.indexOf('{/* Mobile Navigation (Bottom) - MD3 Style */}{""}');
const bottomNavEnd = code.indexOf('</nav>', bottomNavStart) + 6;

if (bottomNavStart !== -1 && bottomNavEnd !== -1) {
  const newBottomNav = `{/* Mobile Navigation (Bottom) - Advanced Glassmorphism */}{""}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/70 supports-[backdrop-filter]:bg-white/50 backdrop-blur-3xl border-t border-slate-200/50 shadow-[0_-8px_30px_rgba(0,0,0,0.06)] z-40 pb-safe-bottom">
        {""}
        <div className="flex justify-evenly items-center h-[68px] px-2 relative">
          {""}
          {[
            { id: "home", path: "/", label: "Home", icon: Home },
            {
              id: "directory",
              path: "/directory",
              label: "Directory",
              icon: Store,
            },
            {
              id: "marketplace",
              path: "/marketplace",
              label: "Market",
              icon: Briefcase,
            },
            {
              id: "menu",
              path: "#",
              label: "Menu",
              icon: Menu,
              action: () => setIsMobileMenuOpen(true),
            },
          ].map((item, index) => {
            const isActive = item.id !== "menu" && activeSection === item.id;
            return item.id === "menu" ? (
              <button
                key={item.id}
                onClick={item.action}
                className="flex flex-col items-center justify-center gap-1 w-16 h-full group border-none bg-transparent cursor-pointer relative active:scale-90 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
              >
                {""}
                <div
                  className={\`w-12 h-8 flex items-center justify-center rounded-full transition-all duration-300 bg-transparent group-hover:bg-slate-100/50\`}
                >
                  {""}
                  <item.icon
                    size={22}
                    className={\`transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] text-slate-500 group-hover:scale-110 group-hover:text-slate-800\`}
                    strokeWidth={1.5}
                  />{""}
                </div>{""}
                <span
                  className={\`text-[10px] font-medium tracking-wide transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] text-slate-500 group-hover:text-slate-800\`}
                >
                  {""}
                  {item.label}{""}
                </span>{""}
                {/* Advanced visual indicator for active state - hidden for menu but keeps structure */}
              </button>
            ) : (
              <Link
                key={item.id}
                to={item.path}
                className="flex flex-col items-center justify-center gap-1 w-16 h-full no-underline group active:scale-90 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] relative"
              >
                {""}
                <div
                  className={\`w-12 h-8 flex items-center justify-center rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] \${isActive ? "bg-indigo-100 shadow-inner" : "bg-transparent group-hover:bg-slate-100/50"}\`}
                >
                  {""}
                  <item.icon
                    size={22}
                    className={\`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] \${isActive ? "text-indigo-600 scale-110" : "text-slate-500 group-hover:text-slate-800"}\`}
                    fill={isActive ? "currentColor" : "none"}
                    strokeWidth={isActive ? 2 : 1.5}
                  />{""}
                </div>{""}
                <span
                  className={\`text-[10px] tracking-wide transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] \${isActive ? "text-indigo-700 font-bold translate-y-0" : "text-slate-500 font-medium translate-y-0 group-hover:text-slate-800"}\`}
                >
                  {""}
                  {item.label}{""}
                </span>{""}
                
                {/* Bottom Active Indicator Dot */}
                <div className={\`absolute bottom-1 w-1 h-1 rounded-full bg-indigo-600 transition-all duration-300 \${isActive ? "opacity-100 scale-100" : "opacity-0 scale-0"}\`} />
              </Link>
            );
          })}{""}
        </div>{""}
      </nav>`;
  
  code = code.slice(0, bottomNavStart) + newBottomNav + code.slice(bottomNavEnd);
}

// Mobile side drawer advanced styles
const mobileDrawerStart = code.indexOf('{/* Mobile Side Drawer */}{""}');
const mobileDrawerEnd = code.indexOf('{/* Mobile Navigation (Bottom)');

if (mobileDrawerStart !== -1 && mobileDrawerEnd !== -1) {
  const newMobileDrawer = `{/* Mobile Side Drawer - Advanced Features */}{""}
      <div
        className={\`lg:hidden fixed right-0 top-[64px] md:top-[76px] bottom-0 w-[85vw] sm:w-[320px] bg-white/70 supports-[backdrop-filter]:bg-white/40 backdrop-blur-3xl border-l border-white/60 shadow-[-30px_0_60px_rgba(0,0,0,0.12)] z-40 flex flex-col p-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pb-24 overflow-y-auto \${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}\`}
      >
        {""}
        {/* User Profile Mini Section */}
        <div className="flex items-center gap-3 mb-6 p-4 rounded-2xl bg-white/60 shadow-inner border border-white/80">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md">
            G
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-800">Guest User</span>
            <span className="text-[10px] text-slate-500 font-medium">calicutapp.com</span>
          </div>
        </div>
        
        <div className="flex flex-col gap-2 mb-6">
          {""}
          <InstallAppBtn variant="mobile" />{""}
          <div className="text-[10px] sm:text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-2 mt-4 pt-4 border-t border-slate-200/50">
            Explore Menu
          </div>{""}
          {allNavItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={\`flex items-center justify-between p-3 rounded-2xl no-underline transition-all duration-300 active:scale-95 group \${activeSection === item.id ? "bg-white shadow-[0_4px_20px_rgba(79,70,229,0.12)] border border-indigo-100/50" : "hover:bg-white/60 border border-transparent"}\`}
            >
              {""}
              <div className="flex items-center gap-3">
                <div
                  className={\`p-2 rounded-xl transition-colors duration-300 \${activeSection === item.id ? "bg-indigo-50" : "bg-slate-100 group-hover:bg-white"}\`}
                >
                  {""}
                  <item.icon
                    size={20}
                    className={\`transition-colors duration-300 \${activeSection === item.id ? "text-indigo-600" : "text-slate-500 group-hover:text-indigo-500"}\`}
                    strokeWidth={activeSection === item.id ? 2 : 1.5}
                  />{""}
                </div>{""}
                <span className={\`text-[15px] transition-colors duration-300 \${activeSection === item.id ? "font-bold text-indigo-950" : "font-medium text-slate-600 group-hover:text-slate-900"}\`}>{item.label}</span>{""}
              </div>
              {activeSection === item.id && (
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-2 shadow-[0_0_8px_rgba(79,70,229,0.6)]" />
              )}
            </Link>
          ))}{""}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200/80 to-transparent my-4" />{""}
          <button
            onClick={() => {
              setIsAboutModalOpen(true);
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center justify-between p-3 rounded-2xl no-underline transition-all duration-300 active:scale-95 group hover:bg-white/60 border border-transparent text-left"
          >
            {""}
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-slate-100 transition-colors duration-300 group-hover:bg-white">
                {""}
                <Info
                  size={20}
                  className="text-slate-500 transition-colors duration-300 group-hover:text-indigo-500"
                  strokeWidth={1.5}
                />{""}
              </div>{""}
              <span className="text-[15px] font-medium text-slate-600 transition-colors duration-300 group-hover:text-slate-900">About App</span>{""}
            </div>{""}
          </button>{""}
        </div>{""}
      </div>{""}
      `;
  code = code.slice(0, mobileDrawerStart) + newMobileDrawer + "\n" + code.slice(mobileDrawerEnd);
}

fs.writeFileSync('src/components/Header.tsx', code);
console.log("Navs updated");
