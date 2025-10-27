"use client";

export default function CreateRace() {
  const handleRaceSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <form>
      <label htmlFor="track">Track:</label>
      <select name="track" id="track">
        <option value=""></option>
      </select>
    </form>
  );
}
