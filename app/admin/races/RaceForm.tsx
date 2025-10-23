import prisma from "@/lib/prisma";

export default function RaceForm() {
  return (
    <form>
      <p>Create a New Event</p>
      <label htmlFor="title">Title:</label>
      <input name="title" type="text" placeholder="Event Title" />
    </form>
  );
}
