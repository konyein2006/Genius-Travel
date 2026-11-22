import { getCityBySlug } from "@/lib/cities";
import Link from "next/link";
import { notFound } from "next/navigation";
import { remark } from "remark";
import html from "remark-html";
import { GoArrowLeft } from "react-icons/go";
import Image from "next/image";
import { Metadata } from "next";

interface CityPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: CityPageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) {
    return { title: "City Not Found" };
  }

  return {
    title: `${city.name} | Genius Travel`,
    description: city.tagline,
  };
}

export default async function Page({ params }: CityPageProps) {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) {
    notFound();
  }

  const processedContent = await remark().use(html).process(city.content);
  const contentHtml = processedContent.toString();

  return (
    <div className="my-20 max-w-5xl mx-auto py-10">
      <Link
        href={"/blog"}
        className="inline-flex gap-3 items-center transition-all duration-200 group w-fit font-light hover:underline text-black "
      >
        <GoArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 " />{" "}
        Back to all citites
      </Link>

      <header className=" my-10">
        <p className="text-4xl font-bebas font-bold">{city.tagline}</p>
        <p className="my-5 italic">
          <strong>Best time to visit: </strong>
          {city.bestTimeToVisit}
        </p>
      </header>

      <div className="w-full h-auto object-cover">
        <Image
          src={city.coverImage}
          width={1000}
          height={600}
          alt={city.name}
          className="rounded-xl"
        />
      </div>
      <div>
        <p className="text-4xl font-bold mt-10 mb-3">{city.name}</p>
        <p className="text-sm mb-10">{city.region}</p>
        {city.highlights.length > 0 && (
          <div className="mt-4">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
              Highlights
            </h2>
            <ul className="mt-2 flex flex-wrap gap-2">
              {city.highlights.map((item) => (
                <li
                  key={item}
                  className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-900"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div
          className="prose prose-neutral mt-8 max-w-none space-y-5"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </div>
    </div>
  );
}
