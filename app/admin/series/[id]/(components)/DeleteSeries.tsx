"use client";

export default function DeleteSeries({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let { id } = await params;
    console.log(id);

    const res = await fetch("/api/series", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const response = await res.json();
    console.log(response);
  };

  return (
    <form onSubmit={handleDelete}>
      <button
        type="submit"
        className="px-5 py-1 border border-red-600 text-red-900 hover:bg-red-500 hover:text-white hover:cursor-pointer transition-all duration-200 ease-in-out rounded-xl"
      >
        Delete
      </button>
    </form>
  );
}
