import matter from "gray-matter";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

export interface CityMetadata {
  slug: string;
  name: string;
  region: string;
  tagline: string;
  bestTimeToVisit: string;
  coverImage: string;
  highlights: string[];
}

export interface CityDetail extends CityMetadata {
  content: string;
}

const citiesDirectory = path.join(process.cwd(), "cities");

export function parseCityFile(fileName: string): CityDetail | null {
  const slug = fileName.replace(/\.md$/, "");
  const fullPath = path.join(citiesDirectory, fileName);
  try {
    const rawData = readFileSync(fullPath, "utf8");
    const { data, content } = matter(rawData);
    return {
      slug,
      name: String(data.name ?? ""),
      region: String(data.region ?? ""),
      tagline: String(data.tagline ?? ""),
      bestTimeToVisit: String(data.bestTimeToVisit ?? ""),
      coverImage: String(data.coverImage ?? ""),
      highlights: Array.isArray(data.highlights)
        ? data.highlights.map((highlight) => String(highlight ?? ""))
        : [],
      content,
    };
  } catch (err) {
    console.log("Error reading file: ", err);
    return null;
  }
}

export function getAllCities(): CityMetadata[] {
  if (!existsSync(citiesDirectory)) {
    return [];
  }
  const files = readdirSync(citiesDirectory);
  const cities = files
    .filter((file) => file.endsWith(".md"))
    .map((file) => parseCityFile(file))
    .filter((city): city is CityDetail => city !== null)
    .sort((a, b) => a.name.localeCompare(b.name));

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return cities.map(({ content: _content, ...metadata }) => metadata);
}

const SAFE_SLUG_REGEX = /^[a-z0-9-]+$/;

export function getCityBySlug(slug: string): CityDetail | null {
  if (!SAFE_SLUG_REGEX.test(slug)) {
    return null;
  }
  const resolvedDir = path.resolve(citiesDirectory);
  const fullPath = path.resolve(resolvedDir, `${slug}.md`);

  if (!fullPath.startsWith(`${resolvedDir}${path.sep}`)) {
    return null;
  }
  if (!existsSync(fullPath)) {
    return null;
  }
  return parseCityFile(`${slug}.md`);
}
