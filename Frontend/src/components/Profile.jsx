import { useAuth } from "../context/AuthProvider";

export default function ProfilePage() {
  const [authUser] = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      {/* Sidebar */}
      <aside className="w-72 bg-white dark:bg-gray-800 p-5 shadow-sm border-r border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3 mb-6">
          <img
            src={authUser?.profile || "https://i.pravatar.cc/100"}
            alt="Profile"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="text-gray-500 dark:text-gray-300 text-sm">Hello,</p>
            <h2 className="text-lg font-semibold text-[#347DFA] dark:text-blue-400">
              {authUser?.name || "User"}
            </h2>
          </div>
        </div>

        <nav className="space-y-3 text-sm">
          <Section title="My Orders">
            <NavLink text="Orders" />
          </Section>

          <Section title="Account Settings">
            <NavLink text="Profile Information" active />
            <NavLink text="Manage Addresses" />
            <NavLink text="PAN Card Information" />
          </Section>

          <Section title="Payments">
            <NavLink text="Gift Cards" extra={<span className="text-emerald-500 font-bold">₹0</span>} />
            <NavLink text="Saved UPI" />
            <NavLink text="Saved Cards" />
          </Section>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
          <Header title="Personal Information" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <Input value={authUser?.fullname} placeholder="First Name" />
            <Input value={authUser?.lastName} placeholder="Last Name" />
          </div>

          <div className="mb-6">
            <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">Your Gender</label>
            <div className="flex space-x-4">
              {["Male", "Female", "Other"].map((gender) => (
                <label key={gender} className="flex items-center space-x-1 text-gray-800 dark:text-white">
                  <input
                    type="radio"
                    name="gender"
                    checked={authUser?.gender === gender}
                    readOnly
                  />
                  <span>{gender}</span>
                </label>
              ))}
            </div>
          </div>

          <InfoField label="Email Address" value={authUser?.email} />
          <InfoField label="Mobile Number" value={authUser?.phone} />

          <div className="mt-10">
            <h3 className="text-lg font-semibold text-[#347DFA] dark:text-blue-400 mb-2">FAQs</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Coming soon...</p>
          </div>
        </div>
      </main>
    </div>
  );
}

// Components for better readability
function Section({ title, children }) {
  return (
    <>
      <div className="text-gray-400 dark:text-gray-500 uppercase font-semibold tracking-wider mb-1 mt-5">
        {title}
      </div>
      {children}
    </>
  );
}

function NavLink({ text, active = false, extra }) {
  const baseStyle = "block hover:text-[#347DFA] dark:hover:text-blue-400";
  const activeStyle = active
    ? "text-[#347DFA] dark:text-blue-400 font-semibold"
    : "text-gray-700 dark:text-gray-200";
  return (
    <a href="#" className={`${baseStyle} ${activeStyle}`}>
      {text} {extra}
    </a>
  );
}

function Header({ title }) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold text-[#347DFA] dark:text-blue-400">{title}</h2>
      <button className="text-[#347DFA] dark:text-blue-400 hover:underline text-sm">Edit</button>
    </div>
  );
}

function Input({ value, placeholder }) {
  return (
    <input
      type="text"
      value={value || ""}
      placeholder={placeholder}
      disabled
      className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white p-2 rounded border border-gray-300 dark:border-gray-600 w-full"
    />
  );
}

function InfoField({ label, value }) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center">
        <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">{label}</label>
        <button className="text-[#347DFA] dark:text-blue-400 hover:underline text-sm">Edit</button>
      </div>
      <input
        type="text"
        value={value || ""}
        disabled
        className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white p-2 rounded border border-gray-300 dark:border-gray-600 w-full"
      />
    </div>
  );
}
