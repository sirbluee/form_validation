const session = null;

export default function Dashboard() {
  if (!session) {
    throw new Error("You must be logged in to view this page");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Dashboard Page</h1>
    </div>
  );
}
