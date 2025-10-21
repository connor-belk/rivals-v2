import fs from "fs";

const input = fs
  .readFileSync("./public/data-cleanup/vehicles/vehicle-details1.txt", "utf8")
  .split("\n");

const csv = input
  .filter((line) => line.trim())
  .map((line) => {
    return line
      .replace(/{{|}}/g, "") // remove {{ }}
      .split("|") // split on |
      .map((v) => v.replace(/\[\[|\]\]/g, "")) // remove [[ ]]
      .map((v) => v.replace(/^div\s*=\s*/, "")) // strip "div ="
      .join(","); // join with commas
  })
  .join("\n");

fs.writeFileSync("output.csv", csv);
console.log("✅ CSV created: output.csv");
