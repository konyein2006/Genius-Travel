import { getAllCities } from "@/lib/cities";
import CityCard from "../components/CityCard";
import BlogTitle from "../components/BlogTitle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Genius Travel",
};
export default function Page() {
  const cities = getAllCities();
  return (
    <div className="px-10 md:px-20 ">
      <BlogTitle />
      {cities.length === 0 ? (
        <p>
          No cities found. Add <code>.md</code> files inside the{" "}
          <code>cities/</code> folder to get started.
        </p>
      ) : (
        <section className="max-w-4xl mx-auto font-jakarta">
          {cities.map((city, index) => (
            <CityCard key={index} city={city} index={index} />
          ))}
        </section>
      )}
    </div>
  );
}
