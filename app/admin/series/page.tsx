import SeriesForm from "./SeriesForm";

export default function SeriesPage() {
  const divisions = [
    { id: 1, name: "Division 1" },
    { id: 2, name: "Division 2" },
    { id: 3, name: "Division 3" },
  ];
  const series = [
    { id: 1, name: "Series 1" },
    { id: 2, name: "Series 2" },
    { id: 3, name: "Series 3" },
  ];

  return <SeriesForm series={series} divisions={divisions} />;
}
